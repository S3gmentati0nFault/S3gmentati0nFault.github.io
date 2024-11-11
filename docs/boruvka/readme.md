The project can be found on <a href="https://github.com/S3gmentati0nFaultUni/GPU-project">Github (GPU-project)</a>.

This project was written mainly in **C++** and **CUDA C**.

## Introduction
This project was developed for the exam of GPU computing held by professor Giuliano Grossi at <a href="https://s3gmentati0nfault.github.io/me/unimi/">Università degli studi di Milano</a>, I chose to analyze this problem because I had already considered one of its solutions for the <a href="https://s3gmentati0nfault.github.io/pl/readme/">Programming Languages</a> course during my bachelor.

## Background
The project is mainly based on the implementation proposed by the University of Minho "A generic and highly efficient parallel variant of Boruvka's algorithm". The performance measurements register an uplift that is comparable to the one computed in the original paper, all of the benchmarks have been conducted on sparse graphs because for a series of reasons: 

1. Boruvka's algorithm performs better on sparse graphs.

2. Considering the approach proposed in the original paper it's apparent that it was meant to work
   at peak performance only when sparse graphs were considered.

## The algorithm
Given a graph G(E, V) the CPU version of Boruvka solver has a computational complexity of O(m log(n)) where m is the size of the edge set E and n is the size of the vertex set V. The reason why Boruvka's approach is chosen more often compared to Prim's and Kruscal's counterparts is because it's more indicated for any parallel approach. In general, a parallel approach based on Boruvka can be divided in the following operations:

- Choose the lightest edge

- Find the root of the connected component

- Rename the supervertices obtained by doing component merge

- Graph contraction

All of these operations are performed until the graph has size 1, which means that all of the
graph was contracted in one supervertex.

The particular implementation followed by the colleagues at Minho university is to compute each one
of these actions as a single kernel, one thread per vertex, since there is no dependence between
vertices the result is that the computation can be carried out very efficiently as long as the
neighbourhood for every vertex has a reasonable size. Almost no synchronization is required (only
inside the exclusive scan operation) and resorting to atomic oeprations is not the norm, therefore
we have an approach that is almost lock-free and able to perform at a high level on most
benchmarking instances.

## Performance
The algorithm was tested through Google Colab online development environment using their T4 GPU
alongside 12 GB of system memory two virtual cores taken from an undescriptive Xeon CPU equipped with 3
MB of cache. Benchmarking instances were taken from the 9th DIMACS (DIscrete MAthematics &
theoretical Computer Science center) challenge meant to try and solve the <a href="https://www.diag.uniroma1.it/challenge9/download.shtml">Shortest Path problem</a> efficiently.

<figure>
  <img src="../assets/benchmarks.png" alt="Could not load the image" width="50%" height="50%" >
  <figcaption>Chosen benchmarking suite</figcaption>
</figure>

On these benchmarks I registered a GPU uplift ranging between 30 and 180 times depending on the CPU
and GPU implementation considered.

## Conclusions
There is more that still needs to be discovered and since MST solvers are the basis for many other
algorithm implementations fast is never too fast. I expect more work to be done in the field of
parallel MST computation, especially trying to find novel approaches that do not necessarily use
graph contraction to carry out the computation therefore having stronger performance in the field of
dense graphs manipulation. As far as contraction-based techniques are concerned, I would be interested in seeing whether a fully scan-based implementation suffers as much as hypotheses say due to the necessary amounts of synchronization to make sure that all the threads have a consistent view of memory.

The full pdf for "A generic and highly efficient parallel variant for Boruvka's algorithm" can be
found here: <a href="https://ieeexplore.ieee.org/document/7092783">original paper</a>

The full pdf report for my project can be found here:
