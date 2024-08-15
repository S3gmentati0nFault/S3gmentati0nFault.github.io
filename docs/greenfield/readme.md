<h1>Greenfield</h1>
The project can be found on <a href="https://github.com/S3gmentati0nFault/Greenfield">Github (Greenfield project)</a>

This project was written mainly in **Java**.

<h2>Introduction</h2>
In the repository linked above is contained all of the code for the project of Distributed and Pervasive Systems held by professors Claudio Bettini and Luca Arrota at <a href="https://s3gmentati0nfault.github.io/me/unimi/">Università degli Studi di Milano</a>, the project was presented in September 2023.

Before beginning the explanation I would like to point out that throughout this file I will generally talk about robots, processes and threads really freely, considering the scope of the project they are the same thing.

In the project we were required to simulate a smart city's cleaning system, we had a set of processes roaming around and collecting pollution data that were autonomously sent to a server, each of the robots had a 10 percent probability of having problems and needing to go to a mechanic for repairs. The mechanic was able to handle one repair process at a time thus it was necessary to handle different requests arriving at the mechanic in parallel. The full project description can be found in the `./project_assignement` folder.

<h2>Structure of the solution</h2>
The following is the list of all the classes that I chose to implement for this project

- Main
  - Admin Client
  - Admin Server
    - Server Rest Interface
    - MQTT Subscriber
    - Bot Positions
    - Average List
  - Cleaning Bot
    - Bot Services
    - Service Comparator
    - Waiting Thread
    - Bot Thread
    - Eliminator Thread
    - Fix Helper Thread
    - GRPC Services Thread (GRPC server)
    - Input Thread
    - Maintenance Thread
    - Measurement Gathering Thread
    - Mutual Exclusion Thread
    - Pollution Sensor Thread
    - Quit Helper Thread
    - Bot Identity Comparator
    - Bot Utilities
    - Comm Pair
    - Measurement Buffer
    - Position
  - Extra
    - Atomic Counter
    - Atomic Flag
    - Logger
    - Thread Safe data structure wrapper
  - Simulator Code
  - Variables

My implementation is quite thread heavy, but I wanted to really experiment as much as possible with it, to get to know and understand how threads work and how to control them while accessing information together.

<h2>Operations</h2>
In the following I will discuss my implementation of the different operations.

<h3>Join</h3>
When a new process is created it starts the initiator thread, which is simply a thread that instanciates and starts all of the necessary services (e.g. the GRPC Services Thread). in the meanwhile it requests the server to join the network, the join operation currently consists of two parts:

- Addition of the new robot to the Admin Server's local structure
- Communication of personal data (i.e. an instance of the `BotIdentity` class) to all of the robots in the network

The GRPC communication is asynchronous, and I decided to do two different HTTP requests (check ID availability, communicate my existence to the network) to highlight the difference between the two tasks.

The position in the city is chosen by the Admin Server simply by checking which district has the lowest current density. Originally it was supposed to pick a random district uniformly, while the solution would tend to a stable distribution (if enough processes were initialized), it would not be stable for the majority of the low density cases.

The flow diagram for the operation is shown below

<figure>
  <img src="../assets/join_flow.png" alt="Could not load the image">
  <figcaption>Join operation flow diagram</figcaption>
</figure>

<h4>Comm Pair</h4>
The `Comm Pair` class is a simple toy I came up with, it's nothing more than a pair containing a `ManagedChannel` and a `GRPCStub`. The idea behind it is simply to keep on recycling open stubs and channels; thus saving the resources necessary to open a new one each and every time communication has to take place. Since the project is required to rely heavily on GRPC communication.

Comm Pairs are clustered into `ThreadSafeHashMaps`, each of the pairs is associated to the hash of the `BotIdentity` the `ManagedChannel` connects to.

<h3>Maintenance process</h3>
The maintenance process is handled by two different threads, one deals with checking whether the robot should go under maintenance or not, the other is built and initialized when the robot undergoes maintenance and handles communication and the maintenance procedure; therefore the maintenance process is handled by a new thread.

Any operation involving the network is done by taking a snapshot of the current robot distribution. The GRPC is asynchronous and carried out in parallel, any removals necessary are postponed until the maintenance process is over, thus the removal and stabilization (which do not come cheap) are done at most once per process.

<figure>
  <img src="../assets/maintenance.png" alt="Could not load the image">
  <figcaption>Maintenance operation flow diagram</figcaption>
</figure>

<h4>Pollution measurements</h4>
Pollution measurements (more about this later) stop during maintenance, originally they would still be sent, but I decided against it becasue since the robot is under maintenance it would be sending to the server data that make no sense.

<h3>Removal</h3>
The solution I implemented to handle removals is overengineered and overkill for the job and the setup of the project.

The reason behind it is that it was originally thought to straighten even the worst distributions (e.g. 1-6, 2-0, 3-0, 4-0), keep in mind that I originally placed robots in the city randomly

The elimination works this way:

- I remove mentions of the dead robot from the local machine.
- I contact the Admin Server to let him know that there are dead robots in the city.
- Contact the other robots in the network to remove the references to dead robots from their systems.
- Stabilize the data structure.

The flow diagram for the operation is the following

<figure>
  <img src="../assets/removal1.jpg" alt="Could not load the image">
  <img src="../assets/removal2.jpg" alt="Could not load the image">
  <figcaption>The first part of the removal operation</figcaption>
</figure>

The eventual positional change required to stabilize the robot distribution (we want the distribution of the robots in the network to be uniform after a removal).

<figure>
  <img src="../assets/position_change.jpg" alt="Could not load the image">
  <figcaption>Position update procedure</figcaption>
</figure>

It's important to mention a couple of details

<h4>GRPC calls</h4>
For the elimination procedure, two different GRPC procedures have been called:

- `moveRequest`: which is used by the robot dealing with the elimination process to tell another robot to move away from a district.
- `positionModificationRequest`: which is more like a notification, when a robot moves to another district it computes a random position inside that district and lets every robot in the network know that its position is changed.

Whenever a robot receives a `moveRequest` the thread waits until the position is changed and the robots in the network have been notified to perform the `onComplete` and `onNext` operations.

<h4>How robots are chosen</h4>
During the elimination procedure it's important to make sure that everyone is on the same page, to be sure about that I created a setup phase before stabilization where an auxiliary data structure is built.

I decided to use a list of Priority Queues with a specific Comparator that allows me to do sorting on the robots by `ID`. The stabilization is later carried out just by moving around the top of the queues.

<h2>Pollution sensor</h2>
The pollution sensor is composed by four different entities:

- Simulator.
- Measurement Buffer.
- Measurement Gathering Thread.
- Pollution Sensor Thread.

The Measurement Buffer implements a read/write cycle depending on the available size of the buffer. The cycle works unless the robot is on maintenance.

The Measurement Gathering Thread keeps averages in memory until the Pollution Sensor Thread comes and takes them from him. This Thread, the same way the other did, stays on hold until the maintenance process is done.

The Pollution Sensor Thread is the timer of the pipeline and handles MQTT broadcasting. Each MQTT broadcast will be at most 25 seconds apart from the one before, that is because I wanted to simulate the fact that a robot might be undergoing maintenance, normally the measurement timer pings the server every 15 seconds.

<h2>FIX and QUIT commands</h2>
Both FIX and QUIT commands are being handled through dedicated threads, created once the commands are typed. To be fair the existence of a specialized thread just to send a process to the mechanic is really useless and could be avoided altogether. The QUIT command is a bit more complicated and having a thread in that case is a bit more useful, because if it has to wait doesn't lock the entirety of the input pipeline, but could still be removed in favour of a synchronized function.

I wrote a small document that goes through everything that I mention here plus some more details and charts, it can be downloaded from here.

<a href="https://github.com/S3gmentati0nFault/Greenfield/releases/download/final-release/Project_Presentation.pdf">Download the project presentation</a>
