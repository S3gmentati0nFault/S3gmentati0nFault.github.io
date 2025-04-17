The project is at the moment kept private due to the sensitive nature of the data involved in it, we
are considering the possibility of sharing it with the public in the future.

The project was written mainly in **Python**.

## Introduction
The project originated as a cooperation between the departments of Computer Science and Physics of
Milan University in an attempt of confirming the analytical method, originally found by
<a href="https://homelasa.mi.infn.it/it/">INFN LASA</a> and  superconducting research group, for the localization of
quench events in High Order Corrector superconducting magnets[^1] that will be mounted in the LHC collider machine for the High
Luminosity upgrade (HL-LHC).

The aim of the original work was to use the harmonic decomposition of the residual magnetic field of
a superconducting magnet, after a quench event; to find an analytical explanation for the
reconstructed harmonic content, and to correlate it with the localization of the quenched
superconducting coil(s) in the magnet assembly. A quench event is a situation in which a
superconductor transitions from the superconducting to the normal-conducting state; generating a
buildup of resistance that can lead to material damage due to Joule heating.

The aim of my work was to identify a machine learning model capable of answering the question: 'If quench
happened during the test run, which coil within the magnet did quench?'; knowing the harmonic
decomposition of the magnetic field measured at the center of the magnet, where the beam will pass
during production. This magnetic field is the result of the contribution of the magnetization of the
superconducting coils and the iron yoke that locks the coils in place. The analyses have been
conducted after a quench event; to avoid damaging the material the magnet was tested in a protected environment, connected to a Quench Protection System.

The main focus of our work was to find models capable of explaining quench behavior, that is why we
imposed a strong constraint of explainability and simplicity. Our work was devided in two different
steps, shown here below.

- Quench Recognition Problem (QRP): identify a machine learning model capable of recognizing and explain a
quench event in a quadrupole HO corrector magnet.

- Quench Localization Problem (QLP): identify a machine learning model capable of identifying and
motivating the position of the quench event (which can be single or multiple) within the magnet
assembly.

To solve this problem we used different models (remaining in a supervised-learning framework):

- Decision trees, thanks to their simplicity and explainability,

- Random forests, for more power and more information on the feature extraction process,

- Tree aggregators, a deterministic RF we came up with, which constructs the forest by picking the
best tree for each attribute that is being considered (we used triples to avoid the need for extra
parity calculations),

- SVMs, our benchmark model, the high performance and lack of explainability make them the perfect
"counterpoint" to our objective ('what would we obtain if we forgot about the explainability
constraint we talked about earlier?'). 

[^1]: "Quench position and reconstruction through harmonic field analysis in superconducting magnets" by S. Mariotto and M. Sorbi published in 2022 Supercond. Sci. Technol. 35 015006 (DOI 10.1088/1361-6668/ac39e8).
