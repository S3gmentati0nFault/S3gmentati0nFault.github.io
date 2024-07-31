The project can be found on <a href="https://github.com/S3gmentati0nFault/autoencoders">Github (Autoencoders project)</a>.

<h2>Introduction</h2>
I did this project alongside <a href="https://github.com/MassimoMario">Mario Massimo</a> during my stay in Heidelberg for the course of Machine Learning and Physics held by professor <a href="https://www.thphys.uni-heidelberg.de/~plehn/">Tilman Plehn</a>. The project aimed at comparing performance for two different machine learning architectures, the first being an MLP based autoencoder and the second being a CNN based autoencoder, in the field of anomaly detection.

The dataset came from the professor and a given preprocessing step was applied to turn CMS measurements into 40x40 images.

The task at hand was: given the dataset, containing two different types of jets (Quantum ChromoDynamics and Top), use one of the two jets as signal and the other as anomaly.

The following image is taken from the representation of two different jets inside of the dataset, one is a Top jet and the other is a QCD jet.
A straightforward consequence of the three-pronged structure of top jets is going to be that using the spatial information to distinguish them from the anomaly (QCD jets) is not going to be a great idea, and that is because QCD jets can be seen as a top jet whose prongs are extremely close together.

<figure>
  <img src="../assets/qcd_vs_top.png" alt="could not load the image">
  <figcaption>Top (left) vs QCD (left) jets</figcaption>
</figure>

A round of reconstruction can be seen in the following image, the process was done using the MLP autoencoder trained to recognize Top jets as signal and QCD jets as anomaly.

<figure>
  <img src="../assets/mlp_reconstruction.png" alt="could not load the image">
</figure>

As it can be clearly seen the reconstruction procedure is far from perfect, due to a very high amount of background noise, but the autoencoder is able to recognize and reconstruct the principal spatial features of both the signal and the anomaly. This proves that the autoencoder is unable to find the anomaly (in this case the QCD) since it reconstructs it almost perfectly, as if it was a Top jet.

The code can be found on my github repository and down below I provide downloads for the compressed dataset, an HTML version of the notebook with all the outputs and the requirements sheet.

<a href="https://github.com/S3gmentati0nFault/autoencoders/releases/download/Major/sheet.pdf">Download sheet requirements</a>

<a href="https://github.com/S3gmentati0nFault/autoencoders/releases/download/final-release/data.zip">Download the compressed dataset</a>

<a href="https://github.com/S3gmentati0nFault/autoencoders/releases/download/final-release/easy_reading.html">Download the HTML notebook</a>
