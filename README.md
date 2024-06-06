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

**Mecanismos de control**
* sensores (temperatura) --> Mocks
* barras de control (material x) --> consumo de barras por hora
* turbinas de refrigeración (agua) --> No implementado

**Reactor**
* capacidad 700 MWe/h (eléctrica)
* rango de temperatura normal: [280 - 330]ºC  
* fuera de rango de temperatura: [400]ºC --> Reactor OFF
      
### ENUNCIADO
PUNTO 3: Desarrollar una aplicación que permita emular la situación planteada. 
Proveer el código y las pruebas unitarias para verificar lo siguiente:

1. Cantidad de energía neta producida en una determinada cantidad de horas. Considerar distintos escenarios.
    * **Objetivo**: Generar valores de temperatura representando al menos 3 escenarios con su respectiva contingencia.   
                    
    * **Escenarios**:
     * *caso 1*: El reactor produce energía en estado Normal, es decir incrementando su temperatura de a 8.33ºC hasta   
                 alcanzar los 329.98ºC, donde estará al máximo de su producción de energía eléctrica. En este período no se activa el protocolo de enfriamiento.
               
     * *caso 2*: El reactor eleva su temperatura alcanzando el estado Crítico, es decir a partir de los 330ºC.
                 Se acciona el mecanismo de enfriamiento, el cual agrega barras de control hasta estabilizar la temperatura entrando en el estado Normal, donde el mecanismo de enfriamiento se apaga.
               
     * *caso 3*: El reactor continúa elevando su temperatura hasta alcanzar los 400ºC.
                 Este caso se denomina estado de Emergencia. 
                 Se apaga el reactor y el mecanismo de enfriamiento.   

2. Cantidad de barras de control consumidas para normalizar el estado del reactor. Considerar distintos escenarios.
    * **Objetivo**: Generar valores de temperatura representando al menos los 3 escenarios descriptos anteriormente junto con las respectivas contingencia. El consumo de barras se calcula en base al porcentaje de temperatura elevado y utilizando como referencia la tabla de valores del enunciado.