# Laboratorio III
## Trabajo Práctico Reactor Nuclear

### Análisis
** Mecanismos de control **
 ¬ sensores (temperatura) --> Mocks
 ¬ barras de control (material x)
 ¬ turbinas de refrigeración (agua)

** Reactor **
 ¬ capacidad 700MWe/h (eléctrica)
 ¬ fuera de rango de temperatura: [400]ºC --> Reactor OFF
 ¬ rango de temperatura normal: [280 - 330]ºC --> mecanismo de enfriamiento [flag booleano] en estado 'false'.

** Aviso de exceso de temperatura ** 
 [> 330]ºC: Se activa el mecanismo de enfriamiento [flag booleano] en estado 'true'--> El mecanismo inserta barras de control al núcleo 
            del reactor para reducir la velocidad de reacción nuclear a través de la absorción de neutrones, donde la magnitud de reducción 
            está dada por el cálculo del porcentaje a ser restado de la energía térmica hasta que la misma se estabilice (<= 330)ºC.

   ¬ aviso de energía térmica liberada: debe ser [>= 2500.24] 
     --> cálculo hecho con regla de 3 simple: (330.01 x 2500.02) / 329.98 
  
** Porcentaje de reducción de energía térmica a través de 1 barra de control **
    ¬ Cálculo del porcentaje de vida útil de 1 barra de control: prc = [ (200 - 0) / 3600 ] (%) 
    
    --> Son 3600 segundos, es decir 1 hora. O sea que por cada minuto se reduce en 3.33 el valor de vida útil de cada barra en cuestión.
        Al entrar en contacto con el reactor, cada barra deberá ser reemplazada cuando llegue a un valor <= 50, es decir cuando resten 
        al menos 15 minutos (tiempo de recambio) para agotar su vida útil por completo, teniendo en cuenta de recalcular el porcentaje
        de reducción de temperatura en base al conjunto total de barras, con la idea de asegurar un porcentaje constante de reducción de 
        la temperatura del reactor.
         
    
   Observación1: La idea es sumar barras de control hasta obtener el porcentaje de reducción necesario como para reducir la temperatura 
                 en exceso del reactor en el lapso de al menos 30' minutos, donde los 30' subsiguientes serán posiblemente utilizados (según 
                 la situación lo requiera) para reponer las barras que estén por debajo de un valor de vida útil, tomando como referencia el valor 50.
                 cálculo de vida útil de 1 barra por 1 minuto: 200 / 60 = 3,33
                 cálculo de vida útil de 1 barra por 15 minutos: 3,33 x 15 = 50 
            
   Observación 2: En esos 30' minutos se ejecutará el reemplazo de x cantidad de barras, contemplando la posibilidad de que la temperatura 
                  del reactor vuelva a subir o sea mayor el porcentaje de temperatura al porcentaje de enfriamiento, para que en ese caso 
                  tengamos un espacio de 15' minutos para reponer barras sin que la temperatura continúe en ascenso y así estabilizarla en 280ºC.   
      
** ENUNCIADO **           
 PUNTO 3: Desarrollar una aplicación que permita emular la situación planteada. 
          Proveer el código y las pruebas unitarias para verificar lo siguiente:

1. Cantidad de energía neta producida en una determinada cantidad de horas. Considerar distintos escenarios.
    ¬ Objetivo: Generar valores de temperatura representando al menos 3 escenarios con su respectiva contingencia.
                La energía neta se calcula teniendo en cuenta un período de producción no menor a las 6 (seis) horas, en las que 
                se contempla lo siguiente:
    
    ¬ Escenarios:
     * caso 1: El reactor eleva su temperatura por encima de los 330ºC y acciona el mecanismo de enfriamiento. Luego de un tiempo determinado
               la temperatura se estabiliza en 280ºC y el mecanismo de enfriamiento se apaga.
               
     * caso 2: El reactor eleva su temperatura por encima de los 330ºC y acciona el mecanismo de enfriamiento. Mientras se está reduciendo la 
               temperatura el reactor vuelve a elevar su temperatura y en consecuencia se agregan más barras hasta volver a obtener el porcentaje 
               de reducción de temperatura anterior. Luego de un tiempo considerable la temperatura se estabiliza en 280ºC y el mecanismo de 
               enfriamiento se apaga.
               
     * caso 3: El reactor eleva su temperatura por encima de los 330ºC y acciona el mecanismo de enfriamiento. Mientras se está reduciendo la 
               temperatura el reactor vuelve a elevar su temperatura y en consecuencia se agregan más barras hasta volver a obtener el porcentaje 
               de reducción de temperatura anterior, pero la temperatura del reactor es mayor al porcentaje de enfriamiento, y continúa elevándose 
               hasta llegar a los 400ºC donde el reactor directamente se apaga. 

2. Cantidad de barras de control consumidas para normalizar el estado del reactor. Considerar distintos escenarios.
    ¬ Objetivo: Generar valores de temperatura representando al menos los 3 escenarios descriptos anteriormente junto con su respectiva contingencia.
                La cantidad de barras consumidas en cada escenario se calcula en base al porcentaje de temperatura constante y estable, utilizando 
                como referencia la tabla de valores del enunciado.