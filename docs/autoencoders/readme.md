The project can be found on <a href="https://github.com/S3gmentati0nFault/autoencoders">Github (Autoencoders project)</a>, consider that the code cannot be executed unless a different dataset is provided (the url for the original dataset was taken down).

<h2>Introduction</h2>
I did this project alongside <a href="https://github.com/MassimoMario">Mario Massimo</a> during my stay in Heidelberg for the course of Machine Learning and Physics held by professor Tilman Plehn. The project aimed at comparing performance for two different machine learning architectures, the first being an MLP based autoencoder and the second being a CNN based autoencoder, in the field of anomaly detection.

The dataset came from the professor and a given preprocessing step was applied to turn CMS measurements into 40x40 images.

The task at hand was: given the dataset, containing two different types of jets (Quantum ChromoDynamics and Top), use one of the two jets as signal and the other as anomaly.

The following image is an averaging of over 5000 jets taken from <a href="https://www.researchgate.net/publication/336541590_FPGA-Accelerated_Machine_Learning_Inference_as_a_Service_for_Particle_Physics_Computing">FPGA-Accelerated Machine Learning Inference as a Service for Particle Physics Computing</a> and it is clear to see that the area spanned by the top jets is much wider than the one spanned by the QCD jets. That is because of the three-pronged structure of the top jets, which is not present in the QCD jets.
<br><br>

<figure>
  <img src="https://www.researchgate.net/publication/336541590/figure/fig7/AS:963467762749453@1606720023236/A-comparison-of-QCD-left-and-top-right-jet-images-averaged-over-5-000-jets.png" alt="could not load the image">

  <figcaption>Top (right) vs QCD (left) jets</figcaption>
</figure>

Coming to the performance of the machine learning algorithm, whenever top jets are signal and QCD jets are anomaly it's quite likely that the model will have a harder time detecting the anomaly since in most cases QCD jets can be seen as a top jet whose prongs are extremely close together. This means in turn that the reconstruction performance of our autoencoder model will be worse when the QCD jets are the anomaly.
That is due to the fact that the model learns to reconstruct really well the signal while reconstructing the anomaly poorly.

The code can be found on my github repository alongside some commentary, unfortunately the dataset is not available anymore, furthermore the outputs of the computation are not visible due to how me and Mario decided to handle the development process; but the code is still up for reading alongside some commentary. The requirements of the sheet can be downloaded below.

<a href="https://github.com/S3gmentati0nFault/autoencoders/releases/download/Major/sheet.pdf">Download sheet requirements</a>
