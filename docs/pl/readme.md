The project can be found on <a href="https://github.com/S3gmentati0nFault/MST-implementation">Github (MST implementation)</a>

This project was written mainly in **Common Lisp** and **Prolog** using **emacs**.

<h2>Introduction</h2>
The project was assigned for the course of Programming Languages at <a href="https://s3gmentati0nfault.github.io/me/unimib/">Università degli studi Milano Bicocca</a> held by professor <a href="https://www.unimib.it/marco-antoniotti">Marco Antoniotti</a>.

The project consisted of the implementation of Prim's solution for the Minimum Spanning Tree problem using Common Lisp and Prolog. In the following I will provide the documentations of the two implementations written in italian.

<h2>Prolog documentation</h2>

**NOTE AL LETTORE**

Il readme è stato composto su Emacs rispettando la regola che impone
di scrivere il testo entro le 80 colonne.
Nel caso in cui all'interno del readme dovessero comparire caratteri
illeggibili è dovuto al fatto che è stato fatto un porting da blocco
note e nel testo originale erano presenti delle lettere accentate,
dovrebbero essere state rimosse tutte in questa versione.

---

<h3>INTERFACCIA PROLOG PER LA MANIPOLAZIONE DEI DATI</h3>

---

**NOTE AL LETTORE**

- Nell'ultima versione del file la prima regola consente di eliminare tutti i
  dati presenti nella base di conoscenza con il predicato 'consult'

- All'interno dell'algoritmo abbiamo utilizzato una rappresentazione
  "ad arco doppio" quindi all'interno della base di conoscenza avremo
  l'arco di andata e l'arco di ritorno

---

<h4>Predicati obbligatori</h4>

**new_graph(G)**

Predicato che aggiunge un nuovo grafo di nome G alla base di conoscenza

**delete_graph(G)**

Predicato che rimuove il grafo di nome G e tutti i vertici e gli archi
a lui associati dalla base di conoscenza, se su di esso e' stato eseguito
l'algoritmo di Prim verranno cancellati anche i relativi vertex_key e
vertex_previous

**new_vertex(G, V)**

Predicato che aggiunge un vertice V al grafo G, il predicato che rappresenta il
vertice deve essere vertex(G, V)

**graph_vertices(G, Vs)**

Predicato che ritorna true se Vs e' una lista contenente tutti i vertici di G

**list_vertices(G)**

Predicato che stampa a console la lista dei vertici di G

**new_arc(G, U, V, Weight)**

Predicato che aggiunge un arco appartenente al grafo G alla base di
conoscenza con le seguenti discriminanti:

- Se il grafo non esiste lo crea
- Se uno dei due vertici non esiste lo crea
- Se l'arco esiste già lo sostituisce all'interno della base di conoscenza

**graph_arcs(G, Es)**

Predicato utilizzato per creare una lista Es contenente tutti
gli archi del grafo G

**vertex_neighbors(G, V, Ns)**

Predicato che ritorna true se V e' un vertice del grafo G e Ns e'
una lista contenente gli archi, arc(G, V, N, W), che portano ai vertici N
immediatamente raggiungibili da V

**adjs(G, V, Vs)**

Predicato che ritorna true se V e' un vertice del grafo G e' Vs e' una lista
che contiene i vertici, vertex(G, V), ad esso adiacenti

**list_arcs(G)**

Predicato che stampa a console la lista degli archi del grafo G

**list_graph(G)**

Predicato che stampa a console la lista dei vertici e degli archi del grafo G

**read_graph(G, FileName)**
Predicato che riceve un grafo dal file csv 'FileName' e lo inserisce nella
base di conoscenza.

Se il grafo esiste gia' lo sovrascrive

**write_graph(G, FileName)**

Predicato che riceve il nome di un file csv 'FileName' e ci scrive dentro
il grafo G.

**write_graph(G, FileName, Type)**

Predicato che riceve il nome di un file csv 'FileName' e ci scrive dentro
il grafo G secondo il valore dell'argomento Type. Type puo' essere
graph o edges:

- Se Type e' graph allora G sarà il nome di un grafo nella base di
  conoscenza e il suo contenuto verra' scritto all'interno del file
- Se Type e' edges allora G e' una lista di archi e il suo contenuto
  verra' scritto all'interno del file.

---

<h4>Predicati d'appoggio</h4>

**arcConv([], [])**

Predicato che si occupa di fare una compressione di una lista di elementi arc/4
in una lista di elementi di arc/3 in modo da prepararla per essere inserita nel
file .csv

**new_arcList(\[arc(X, Y, W) | T\], G)**

Predicato che presa in ingresso una lista contenente tutti i termini arc/3
provenienti dal file .csv passa gli argomeni di arc/3 a new_arc/4 che li
inserisce nella base di conoscenza aggiungendo l'informazione del grafo

---

<h3>GESTIONE DELLO HEAP</h3>

---

<h4>Predicati obbligatori</h4>

**new_heap(H)**

Predicato che inserisce un nuovo heap nella base di conoscenza, la
prima posizione all'interno dello heap e' 0

**delete_heap(H)**

Predicato che elimina uno heap dalla base di conoscenza e tutte le
heap_entry ad essa legate

**heap_has_size(H, S)**

Predicato che restituisce true quando S e' la dimensione attuale dello heap

**heap_empty(H)**

Predicato che restituisce true se l'heap H e' vuoto

**heap_not_empty(H)**

Predicato che restituisce true se l'heap H non e' vuoto

**heap_head(H, K, V)**

Predicato che restituisce true quando l'elemento dello heap H con chiave
minima K e' V.

**heap_insert(H, K, V)**

Predicato che restituisce true quando l'elemento V viene correttamente
inserito nello heap H con chiave K

**heap_extract(H, K, V)**

Predicato che restituisce true quando l'elemento V viene correttamente
rimosso dall'heap H con chiave K

**list_heap(H)**

Predicato che stampa a console lo stato interno dello heap

---

<h4>Predicati d'appoggio</h4>

**swap(H, SP, FP)**

Predicato che scambia due elementi SP-FP nello heap H

**heap_update(H, A)**

Predicato che incrementa/decrementa di A la dimensione dello heap H

**heap_switch(H, P)**

Predicato che si occupa di far scalare il figlio all'interno dello heap finche'
il padre non e' minore o non diventa la radice.

**heapify(H, P)**

Predicato che riordina lo heap H rispettando 'heap property'

---

<h3>ALGORTIMO DI PRIM</h3>

---

**NOTA AL LETTORE**

- Abbiamo deciso di implementare l'algoritmo di Prim impiegando gli
  archi anzichè i soli vertici come valori della heap_entry per un
  semplice fatto di dispersivita'.
  Penso che in questo modo tutte le informazioni siano sempre dove
  devono essere e sono veloci da raggiungere in ogni momento
  dell'esecuzione dell'algoritmo.

- Abbiamo deciso di eseguire la sort tramite la funzione consigliata da
  Professor M. Antoniotti (la sort/4) che sfrutta il predicato di
  riordino @=<

---

<h4>Predicati obbligatori</h4>

**vertex_key(G, V, K)**

Predicato che restituisce true quando V e' un vertice di G e, durante e dopo
l'esecuzione dell'algoritmo di Prim, contiene il peso minimo di un arco che
connette V nell'albero minimo; se questo arco non esiste (ed all'inizio
dell'esecuzione) allora K e' inf

**vertex_previous(G, V, U)**

Predicato che restituisce true quando V ed U sono vertici di G e il vertice U
e' il vertice 'genitore' di V nel minimum spanning tree

**mst_prim(G, Source)**

Questo predicato ha successo con un effetto collaterale. Dopo la sua esecuzione,
la base-dati Prolog ha al suo interno i predicati vertex_key(G, V, K)
e vertex_previous(G, V, U) per ogni V appartenente a G

**mst_get(G, Source, PreorderTree)**

Questo predicato e' vero quando PreorderTree e' una lista degli archi
dell' Mst ordinata secondo un attraversamento preorder dello stesso
fatta rispetto al peso dell'arco, nel caso di vertici di peso uguale
si è opera un ordinamento lessicografico degli stessi (vedi nota sopra).

---

<h4>Predicati d'appoggio</h4>

**mst_algorithm(G, Source, H)**

Predicato che si occupa della parte computazionale dell'algoritmo di prim
visitando il grafo in profondita', la computazione ha fine quando la heap che
contiene gli archi rimane vuota

**clean_previous_mst(G)**

Predicato che cancella tutti i dati di una precedente esecuzione dell'algoritmo
di prim sul grafo G dalla base di conoscenza

**mst_neighbours(G, V, Arcs)**

Predicato che crea una lista di archi percorribili dal nodo V ai vicini di V del
grafo G

**mst_prim_initialization(G, H)**

Predicato che costruisce una lista di archi fittizi del tipo
arc(G, vertice, X, inf)
utili solamente all'inizializzazione dell'algoritmo e chiama
heap_insertion_list e vertex_key_initialization

**vertex_key_initialization(G, \[arc(G, vertice, X, inf) | T\])**

Il predicato prende in ingresso la lista di archi generati dalla
mst_prim_initialization e va a creare una entry vertex_key per
ciascuno di essi mettendo la loro distanza ad infinito. I vertex
previous non vengono inizializzati prima dell'inizio della
computazione

**heap_insertion_list(\[arc(G, U, V, Weight) | T\], H)**

Predicato che inserisce una lista di arc/4 nello heap, secondo le seguenti
regole:

- L'arco viene inserito se e solo se il nodo di destinazione non e' ancora
  stato visitato
- Se all'interno dello heap vi e' un arco con la medesima destinazione ma peso
  maggiore, verra' sostituito dall'arco in ingresso e verranno
  aggiornate le relative vertex_key e vertex_previous
- Nel caso il nodo sia stato gia' visitato o vi e' un arco con peso inferiore
  diretto allo stesso nodo all'interno dello heap, verra' scartato

**change_previous(G, Dest, Father, New_Father)**

Il predicato si occupa di cancellare la vecchia entry vertex_previous
sostituendola con quella nuova che è stata trovata durante
l'aggiornamento della heap tramite la visita dei vicini.

**mst_calculation(\[arc(G, U, V, Weight) | T\], Mst)**

Predicato che si occupa di visitare l'albero in preorder inserendolo in una
lista che verra' restituita come Mst

**list_sort(List, Sorted)**

Predicato che ordina List rispetto al peso dell'arco. In caso di archi con pari
peso ordina rispetto all'ordinamento 'lessicografico' del vertice destinazione.

**regularize(\[arc(G, U, V)\], \[arc(G, U, V, Weight)\])**

Predicato che trasfroma arc/3 in arc/4 aggiugendone il peso associato

---

<h2>Common Lisp documentation</h2>

**NOTE AL LETTORE**

- Come per il Readme di Prolog, anche questo testo rispetta la
  convenzione delle 80 colonne e, allo stesso modo, e' stato
  originariamente importato da un file di testo formattato tramite
  blocco note, questo significa che qualunque carattere illeggibile
  dovesse apparire all'interno del testo e' una lettera accentata non
  riconosciuta; questa versione del file dovrebbe essere priva di
  refusi di questo tipo.

- Ogniqualvolta vi dovesse essere un riferimento al linguaggio Lisp
  all'interno del file si trattera' di un'abbreviazione del nome
  Common Lisp e non di un riferimento erroneo all'intera famiglia di
  linguaggi

---

INTERFACCIA LISP PER LA MANIPOLAZIONE DEI DATI

---

<h4>Funzioni obbligatorie</h4>

**new-graph (graph-id -> graph-id)**

Funzione che genera un nuovo grafo e lo inserisce nella hash-table \_graphs\_

**is-graph (graph-id -> boolean)**

Funzione che ritorna il graph-id se il grafo esiste, altrimenti ritorna NIL

**delete-graph (graph-id -> NIL)**

Funzione che rimuove il grafo graph-id dal sistema (con vertici archi etc)

**new-vertex (graph-id vertex-id -> vertex-rep)**

Funzione che aggiunge un nuovo vertice vertex-id al grafo graph-id

**graph-vertices (graph-id -> vertex-rep-list)**

Funzione che ritorna una lista di vertici del grafo

**new-arc (graph-id dep-id arr-id &optional (weight 1) -> arc-rep)**

Funzione che aggiunge un arco del grafo graph-id nella hash-table \_arcs\_
Se il grafo o uno dei due vertici non esistono viene restituito un
errore.

Si e' deciso, per comodita', di utilizzare una rappresentazione
che inserisca nella hashtable l'arco di andata e l'arco di ritorno,
inoltre qualora fosse gia' presente all'interno della hashtable un
arco che ha la stessa destinazione questo verra' sovrascritto al nuovo
valore.

Per concludere, in questa funzione si fa uso per la prima volta della
hashtable \_neighbors\_ che contiene tutti gli archi vicini di ogni
vertice, quando creiamo un nuovo grafo, questo verrà inserito
all'interno della tavola (la sua utilita' viene spiegata nella sezione
delle strutture dati aggiuntive).

**graph-arcs (graph-id -> arc-rep-list)**

Funzione che ritorna una lista di tutti gli archi presenti nel grafo graph-id

**graph-vertex-neighbors (graph-id vertex-id -> arc-rep-list)**

Funzione che ritorna una lista arc-rep-list contenente gli archi che portano ai
vertici N immediatamente raggiungibili dal vertice vertex-id

**graph-vertex-adjacent (graph-id vertex-id -> vertex-rep-list)**

Funzione che ritorna una lista vertex-rep-list contenente i vertici adiacenti al
vertice vertex-id

**graph-print (graph-id)**

Funzione che stampa a console la lista dei vertici e degli archi del grafo
graph-id

---

<h4>Strutture d'appoggio</h4>

**hashtable \_neighbours\_**

Fa corrispondere ad ogni vertice una lista dei suoi archi vicini.
Ho deciso di crearla, andando ad occupare più spazio, perchè migliora
drasticamente le performance del nostro algoritmo.
Siamo passati da 90 secondi di tempo di esecuzione sul file
"primkiller_50k.LISP" gentilmente concessoci dal nostro collega Luca
di Pierro a meno di un secondo sullo stesso input cambiando solamente
il modo in cui si accede ai vicini di ciascun nodo.

**hashtable \_positions\_**

Fa corrispondere ad ogni oggetto dello heap la sua posizione
all'interno dell'array che che memorizza lo heap.
Implementata in modo da avere un tempo di accesso ai dati all'interno
dello heap costante e non dover implementare una ricerca lineare che
sarebbe lunga e costosa

**hashtable \_visited\_**

Fa corrispondere ad ogni vertice del grafo un booleano che indica
se un nodo e' o non e' gia stato visitato in precedenza

---

<h4>Funzioni d'appoggio</h4>

**is-vertex (graph-id vertex-id -> vertex-rep o NIL)**

Funzione che ritorna il vertex-id se il vertice esiste, altrimenti ritorna NIL

**find-arc (graph-id dep-id arr-id neighbors -> arc-rep o NIL)**

Funzione che cerca all'interno di una lista l'arco che vada da dep-id
ad arr-id, l'abbiamo implementata perchè quando andiamo a modificare
un arco che già esiste nella hashtable vogliamo che questa modifica
si ripercuota anche sulla hashtable \_neighbors\_.

**is-arc (graph-id dep-id arr-id -> arc-rep o NIL)**
Funzione che ritorna l'arco con vertice di partenza dep-id e vertice di arrivo
arr-id se esiste, altrimenti ritorna NIL

---

<h3>GESTIONE DELLO HEAP</h3>

---

<h4>Funzioni obbligatorie</h4>

**new-heap (heap-id &optional (capacity42) -> heap-rep)**

Funzione che inserisce un nuovo heap nella hash-table \_heaps\_.
La numerazione delle posizioni interne allo heap parte da 0

**heap-size (heap-rep -> heap-size)**

Funzione che restituisce la dimensione attuale dello heap

**heap-id (heap-rep -> heap-id)**

Funzione che restituisce l'id dello heap

**heap-actual-heap (heap-rep -> actual-heap)**

Funzione che restituisce l'array che contiene i dati dello heap

**heap-delete (heap-id -> T)**

Funzione che elimina uno heap identificato da heap-id dalla hashtable

**heap-empty (heap-id -> boolean)**

Funzione che restituisce true se l'heap heap-id e' vuoto

**heap-not-empty (heap-id -> boolean)**

Funzione che restituisce true se l'heap heap-id non e' vuoto

**heap-head (heap-id -> (K V))**

Funzione ritorna una lista di due elementi dove K è la chiave minima e V il
valore associato

**heap-insert (heap-id key value -> boolean)**

Funzione che restituisce true quando l’elemento V viene correttamente
inserito nello heap heap-id con chiave K e la sua posizione viene salvata
nell'hashtable \_positions\_.

Chiama una funzione heap_switch per fare in modo che il valore
inserito galleggi verso l'alto andando a piazzarsi nella posizione corretta.

Se la dimensione dello heap raggiunge la dimensione dell'array aumenta la
dimesione dell'array di 10

**heap-extract (heap-id -> (K V))**

Funzione che restituisce una lista con K, V e con K minima, la coppia viene
rimossa dallo heap heap-id e dall'hashtable \_positions\_.

Se la dimensione dello heap e' diversa da quella dell'array elimina le celle
dell'array in eccesso

**heap-print (heap-id -> boolean)**

Funzione che stampa a console lo stato interno dello heap heap/id

---

<h4>Funzioni d'appoggio</h4>

**is-heap (heap-id -> boolean)**

Funzione che restituisce true se l'heap esiste, altrimenti restituisce false

**heap-update (heap-id amount -> heap-rep)**

Funzione che cambia la dimensione dello heap di amount

**get-father (heap-id pos -> (K V))**

Funzione che restituisce la coppia (K V) che occupa la posizione del padre

**get-element (heap-id pos -> (K V))**

Funzione che restituisce la coppia (K V) che occupa la posizione indicata

**set-element (heap-id key value pos -> pos)**

Funzione che imposta l'oggetto in posizione pos alla coppia (key value)
Viene aggiornato anche il valore nella hashtable \_positions\_

**swap-pos (heap-id key value pos -> pos)**
Funzione che si occupa dello spostamento dell'elemento della coppia (key value)
nella posizione del padre e dello spostamento inverso, cambiando di conseguenza
la hashtable \_positions\_

**swap (heap-id key value pos1 pos2 -> pos)**

Funzione che scambia le due coppie (key value) delle posizioni pos1 e pos2,
cambiando di conseguenza le posizioni all'interno della hashtable \_positions\_

**delete-node (heap-id pos -> T)**

Funzione che cancella il nodo in posizione pos dallo heap heap-id

**get-position (heap-id key -> pos o NIL)**
Funzione che restituisce la posizione di un elemento all'interno
dell'array che contiene i dati dello heap.

Sebbene il nome possa essere fuorviante, abbiamo utilizzato il valore
V di ogni coppia (K V) come chaive all'interno della hashtable
\_positions\_, qualcosa di più riguardo a questa implementazione nella
prossima sezione

**fp (pos -> pos)**

Funzione che restituisce la posizione del padre

**left-son (pos -> pos)**

Funzione che restituisce la posizione del figlio sinistro

**right-son (heap-id -> pos)**

Funzione che restituisce la posizione del figlio destro

**heap-switch (heap-id key value pos -> T)**

Funzione che si occupa di far risalire verso l'alto la coppia (key value) fino
a che l'elemento non diventa maggiore del padre o non diventa
l'elemento in posizione 0 all'interno dello heap

**heapify (heap-id key value pos -> T)**

Funzione che si occupa di far rispettare allo heap heap-id la heap property

**positions-print (heap-id -> NIL)**

Funzione che stampa le posizioni delle chiavi presenti all'interno dello heap
heap-id, inoltre le celle vuote non vengono considerate

---

<h3>ALGORTIMO DI PRIM</h3>

---

**NOTE AL LETTORE**

- Come detto prima abbiamo impiegato il valore V della coppia (K V)
  per ogni elemento presente all'interno dello heap per indicizzare i
  valori nella hashtable \_positions\_, questa scelta ci ha costretti a
  virare dall'originale implementazione in prolog che consisteva
  nell'inserire gli archi all'interno della heap direttamente, mentre
  in prolog potrebbe non dare un vantaggio rilevante, in lisp il fatto
  di avere direttamente a portata di mano il genitore di ogni nodo
  all'interno dello heap puo' essere utile ed evitarci di andare a
  visitare i vicini troppe volte.

  Il motivo per cui non mi sono sentito di creare un'implementazione
  del genere e' per il fatto che all'interno dello heap le entry
  sarebbero state del tipo

  (list 'arc 'graph 'dep 'arr 'weight)

  e, a meno che non si riduce il numero di elementi inseriti nella
  hashtable positions ai soli 'graph e 'arr accedere alla hashtable
  _positions_ diviene poi impossibile, questo perchè: come faccio a
  trovare la posizione di un arco come quello indicato sopra se non so
  quale sia il nodo di partenza originale e il peso che avevo prima?

- Per la mst-get, su indicazione del professor M. Antoniotti, ci siamo
  comportati come in Prolog, impiegando la funzione sort che ci
  consente di implementare una nostra versione della funzione di
  ordinamento, nel caso di confronti tra numeri abbiamo impiegato il
  confronto aritmetico puro, nel resto dei casi abbiamo impiegato la funzione
  string< per decretare l'ordine

---

<h4>Funzioni obbligatorie</h4>

**mst-vertex-key (graph-id vertex-id -> K)**

Funzione che dato un vertex-id di un grafo graph-id ritorna il peso minimo di un
arco che connette vertex-id nell’albero minimo; se questo arco non esiste allora
k è MOST-POSITIVE-DOUBLE-FLOAT

**mst-previous (graph-id V -> U)**

Ritorna il vertice U che e' il vertice genitore di V nel mst

**mst-prim (graph-id source -> NIL)**

Funzione che termina con un effetto collaterale. Dopo la sua esecuzione, la
hash-table _vertex-keys_ contiene al suo interno le associazioni (graph-id V) ⇒
K per ogni V appartenente a graph-id; la hash-table _previous_ contiene le
associazioni (graph-id V) ⇒ U calcolate durante l’esecuzione dell’algoritmo di
Prim.

La funzione inizializza la dimensione dell'array dello heap, che conterra' i
vertici del grafo, al numero totale di vertici presenti nel grafo in ingresso

**mst-get (graph source -> preorder-mst)**

Funzione che ritorna preorder-mst che è una lista degli archi del MST ordinata
secondo un attraversamento preorder dello stesso, fatta rispetto al peso
dell’arco.

Nel caso di archi con peso uguale si e' deciso di stamparli secondo l'ordine
lessicografico

---

<h4>Funzioni d'appoggio</h4>

**mst-algorithm (graph-id source heap -> NIL)**

Funzione che si occupa della gran parte della computazione dell'algoritmo di
prim, durante la sua esecuzione modifica i vertex key e mst previous dei vertici
che compaiono nello heap, e' in grado di gestire componenti non connesse
riconoscendole per la loro distanza infinita(most positive double float) dalla
componente in analisi.

La computazione ha fine quando la heap diventa vuota

**clean-previous-mst (graph-id -> T)**

Funzione che elimina tutte le entry nelle hashtable \_vertex-keys\_ e \_previous\_
del grafo graph-id

**mst-prim-initialization (graph source heap -> NIL)**

Funzione che inizializza le strutture dati ausiliarie neccessarie al corretto
funzionamento dell'algoritmo di prim:

- inizializza i vertex-key a infinito
- i nodi a non visitato
- inizializza a infinito la distanza dei nodi all'interno dello heap

**set-not-visited (graph-id vertex-id -> NIL)**

Imposta a NIL il valore del vertice vertex-id all'interno dell'hashtable
_visited_

**set-visited (graph-id vertex-id -> T)**

Imposta a T il valore del vertice vertex-id all'interno dell'hashtable \_visited\_

**heap-insertion-list (heap-id arc-list -> T)**

Funzione che inserisce gli archi all'interno di arclist nello heap heap-id
secondo il seguente criterio:

- L'arco viene inserito all'interno dello heap se e solo se la destinazione non
  e' ancora stata visitata
- se il peso dell'arco e' minore del peso memorizzato all'interno
  dello heap il valore viene sovrascritto e vengono cambiati i
  vertex-key e vertex-previous corrispondenti
- altrimenti si prosegue con l'inserimento.
  L'esecuzione termina quando la lista e' vuota

**set-key (heap-id weight pos -> (K V))**

Funzione che cambia la chiave di una coppia (K V) all'interno dello
heap in posizione pos

**already-visited (graph vertex -> boolean)**

Funzione che restituisce true se il nodo e' gia' stato visitato, false altrimenti

**set-vertex-key (graph-id heap-entry -> K)**

Funzione che setta vertex-key di un nodo a un certo valore

**set-mst-previous (graph-id heap-entry -> U)**

Funzione che chiama find-father sulla lista dei vicini del nodo in
modo da cercare il padre del vertice contenuto in heap-entry così da settarne
il valore del padre a U

**find-father (graph heap-entry arc-list -> arr-id)**

Funzione che restituisce l'id del vertice di arrivo di un arco che
parte dal nodo che stiamo considerando e arriva in arr-id.

Nota: Restituiamo arr-id perche' i nodi presenti in arc-list sono i
vicini del nodo che stiamo ispezionando ma il grafo che a noi interessa corre
in direzione opposta

**get-graph (arc -> graph-id)**

Funzione che restituisce il grafo a cui appartiene un arco arc

**get-departure(arc -> dep-id)**

Funzione che restituisce il vertice di partenza di un arco arc

**get-arrival(arc -> arr-id)**

Funzione che restituisce il vertice di arrivo di un arco arc

**get-weight (arc -> weight)**

Funzione che restituisce il peso dell'arco arc

**mst-calculation (graph-id arc-list -> arc-list)**

Funzione che fa la maggior parte del lavoro di computazione per la
mst-get, si occupa della costruzione dell'albero in preorder tree appoggiandosi
alla funzione list-sort

**list-sort (arc-list -> arc-list)**

Funzione che mette in ordine una lista secondo l'ordinamento dei pesi.
Se due oggetti hanno lo stesso peso, utilizza l'ordinamento
lessicografico per le stringhe e l'ordinamento aritmetico per i numeri

**regularize (arc-list -> arc-list)**

Funzione che prende in ingresso una lista di archi arc/3, simile a
quanto accadeva in prolog, e restituisce la lista ricostituita in cui
ogni arco ha il rispettivo peso

**find-mst-previous (graph source -> arc-list)**
Funzione che restituisce una lista contenente i previous di un nodo
inserendoli all'interno di una lista, serve per costruire gli arc/3 di
cui ho parlato nella precedente funzione
