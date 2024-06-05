# Laboratorio III

## Trabajo Práctico Reactor Nuclear

Asignaciones:
1. Diagrama de clase de la solución propuesta.
2. Diagramas de sequencia de 2 o más requerimientos a definir por el equipo.
3. Desarrollar una aplicación que permita emular la situación planteada. Proveer el código y las pruebas unitarias para verificar:
    1. Cantidad de energía neta producida en una determinada cantidad de horas. Considerar distintos escenarios.
    2. Cantidad de barras de control consumidas para normalizar el estado del reactor. Considerar distintos escenarios.
    3. Enviar una notifiación a Homero J. S.
    4. Verificar que los mecanismos de generación de energía y enfriamiento se activen bajo las condiciones especificadas.
    5. Conocer la temperatura del reactor en todo momento.
    6. Conocer la cantidad de energia neta (MWe) producida en todo momento.

### ENUNCIADO
PUNTO 3: Desarrollar una aplicación que permita emular la situación planteada. 
Proveer el código y las pruebas unitarias para verificar lo siguiente:

1. Cantidad de energía neta producida en una determinada cantidad de horas. Considerar distintos escenarios.
    * **Objetivo**: Generar valores de temperatura representando al menos 3 escenarios con su respectiva contingencia. La energía neta se calcula teniendo en cuenta un período de producción no menor a las 6 (seis) horas, en las que se contempla lo siguiente:
    
    * **Escenarios**:
        * *caso 1*: El reactor eleva su temperatura por encima de los 330ºC y acciona el mecanismo de enfriamiento. Luego de un tiempo determinado la temperatura se estabiliza en 280ºC y el mecanismo de enfriamiento se apaga.
               
        * *caso 2*: El reactor eleva su temperatura por encima de los 330ºC y acciona el mecanismo de enfriamiento. Mientras se está reduciendo la temperatura el reactor vuelve a elevar su temperatura y en consecuencia se agregan más barras hasta volver a obtener el porcentaje de reducción de temperatura anterior. Luego de un tiempo considerable la temperatura se estabiliza en 280ºC y el mecanismo de enfriamiento se apaga.
               
        * *caso 3*: El reactor eleva su temperatura por encima de los 330ºC y acciona el mecanismo de enfriamiento. Mientras se está reduciendo la temperatura el reactor vuelve a elevar su temperatura y en consecuencia se agregan más barras hasta volver a obtener el porcentaje de reducción de temperatura anterior, pero la temperatura del reactor es mayor al porcentaje de enfriamiento, y continúa elevándose hasta llegar a los 400ºC donde el reactor directamente se apaga. 

2. Cantidad de barras de control consumidas para normalizar el estado del reactor. Considerar distintos escenarios.
    * **Objetivo**: Generar valores de temperatura representando al menos los 3 escenarios descriptos anteriormente junto con su respectiva contingencia. La cantidad de barras consumidas en cada escenario se calcula en base al porcentaje de temperatura constante y estable, utilizando como referencia la tabla de valores del enunciado.