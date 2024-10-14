The repository for this project can be found on <a href="https://github.com/S3gmentati0nFaultUni/cct-paper">Github (CCT-project)</a>

This project was written mainly in **C, C++, Cuda-C**.

<h2> Introduction </h2>
This project was required for the course of GPU computing held by professor Giuliano Grossi at <a href="https://s3gmentati0nfault.github.io/me/unimi/">Università degli studi di Milano</a>, the original idea was to implement some sort of coloring algorithm on graphs but, unfortunately, due to some technical problems and challenges (this course is supposed to be an introduction to the world of single-GPU software acceleration without libraries like Open GL) I opted to review the Minimum Spanning Tree problem, that I had encountered a while back in the exam of <a href="https://s3gmentati0nfault.github.io/pl/readme/">Programming languages</a> but view it under a different light.

As inspirational paper I considered <a href="https://ieeexplore.ieee.org/document/7092783">A generic
and highly efficient parallel varian of Boruvka's algorithm</a>, the article, like many others
covering the same topic, follows a "standard" approach to the resolution of the problem (based on
<a href="https://en.wikipedia.org/wiki/Bor%C5%AFvka%27s_algorithm">Boruvka's algorithm</a>):

1. Choose the lightest edge coming out of every (super-)vertex of the forest.

2. Find the root of every (super-)vertex of the forest, the root is the "core" of the connected
   component identified by the tree containing the newfound (super-)vertex.

3. Rename the (super-)vertices as a preparation for the contraction step

4. Graph contraction

It's clear that, since I am talking about "Graph contractions" the number of vertices changes and
the connected components are nothing but super-vertices inside the contracted graph.

<h2> Implementation roadmap </h2>
In the following is the roadmap of the development process, once I will be done with the project I
will change this section to explain more in detail the various processes and the interesting aspects
that I will also highlight in the report.

- Implemented a naïve version of Prim's solver, not using any specific performance-enhancing
  strategies, in which case the code runs at $n^2$ speed.

- Implemented a naïve solver running on both the GPU and the CPU using the best of both worlds, leveraging the CPU speed when dealing with scans and parallel reductions and using the parallel
  GPU architecture for the rest.

- Implemented a new solver on the CPU using a simple binary-heap implementation for Prim's
  algorithm, which takes the complexity down from $n^2$ to $m\log{n}$, where $m$ is the size of the
  set of edges and $n$ is the size of the set of vertices.

- Reimplementation of the contraction operation to use a mix of parallel and work efficient scan
  alongside a logarithmic-time search operation working on the GPU.

- Reimplementation of the cumulated degrees update function to work using the new work-efficient
  strategy.

- Reimplementation of the technique finding the minimum value for every vertex to break free of the
  naïve approach originally implemented on the GPU (which is the last function eating a bit portion
  of the runtime for larger graphs).

Once the project will be fully implemented and tested I will be uploading a series of test-runs and
graphs alongside the full report.
