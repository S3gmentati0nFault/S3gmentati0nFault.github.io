I did this project alongside Mario Massimo (<a href="https://github.com/MassimoMario">his github</a>) during my stay in Heidelberg for the course of Machine Learning and Physics held by professor Tilman Plehn, the project was aimed at comparing the performance of two different machine learning architectures, the first one being an MLP based autoencoder and the second one being a CNN based autoencoder.

The dataset came from the professor and a given preprocessing step was applied to turn the tracker information coming from the LHC into 40x40 images.

The task at hand was: given the dataset, containing two different types of jets (Quantum Chromo Dynamics and Top), use one of the two jets as signal and the other as anomaly. The following image is an averaging of over 5000 jets taken from <a href="https://www.researchgate.net/publication/336541590_FPGA-Accelerated_Machine_Learning_Inference_as_a_Service_for_Particle_Physics_Computing">FPGA-Accelerated Machine Learning Inference as a Service for Particle Physics Computing</a> and it is clear to see that the area spanned by the top jets is way wider than the one spanned by the QCD jets. That is because of the three-pronged structure of the top jets, which is not present in the QCD jets.
<br><br>

<figure>
  <img src="https://www.researchgate.net/publication/336541590/figure/fig7/AS:963467762749453@1606720023236/A-comparison-of-QCD-left-and-top-right-jet-images-averaged-over-5-000-jets.png" alt="could not load the image">

  <figcaption>Top (right) vs QCD (left) jets</figcaption>
</figure>

When it comes to a more practical scenario, whenever top jets are signal and QCD jets are anomaly it's quite likely that the model will have a harder time finding the anomaly since in most cases QCD jets can be seen as a top jet whose prongs are extremely close together. This means in turn that the reconstruction performance of our model will be worse when the QCD jets are the anomaly.

The code can be found on my github repository alongside some commentary, unfortunately the dataset is not available anymore, therefore there is no visible results but the code is still up for reading alongside some commentary. The requirements of the sheet can be downloaded below.

<a href="https://github.com/S3gmentati0nFault/autoencoders/releases/download/Major/sheet.pdf">sheet requirements</a>
