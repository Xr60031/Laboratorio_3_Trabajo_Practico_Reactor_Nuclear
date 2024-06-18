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

**Descripción de las clases**

* CentralNuclear: Coordina el funcionamiento seguro y eficiente de un reactor y un generador eléctrico en la planta de energía nuclear. Se encarga de la inicialización, actualización de datos, inicio del reactor, generación de energía eléctrica y muestra información relevante sobre el funcionamiento.

* DatosEnTodoMomento: Almacena y gestiona datos relacionados con la temperatura y la energía producida en un momento dado. La clase tiene dos propiedades privadas: _temperatura y _energiaProducida. El constructor inicializa ambas propiedades con el valor 0. Además, la clase proporciona métodos de acceso (get y set) para ambas propiedades. El método toString() devuelve una cadena que muestra la temperatura y la energía producida.

* Computadora: Gestiona la temperatura de un reactor y notifica a los suscriptores cuando se produce un cambio significativo en la temperatura. La computadora mplementa las interfaces Notificador y Suscriptor. Tiene tres propiedades privadas: suscriptores, modoEnfriamiento y temperaturaReactor. El constructor inicializa estas propiedades. La clase también tiene métodos para suscribir y desuscribir suscriptores, notificar a los suscriptores, actualizar la temperatura del reactor y verificar si se debe activar o desactivar el modo de enfriamiento. Además, hay métodos privados para activar y desactivar el modo de enfriamiento, y métodos para obtener y establecer los valores de las propiedades.

* Generador: contiene un método llamado generarEnergiaElectrica, que toma un valor de energía térmica como argumento. Dentro del método, se realiza una conversión de energía térmica a energía eléctrica utilizando una función llamada CONVERSION_TERMICA_A_ELECTRICA. Si el resultado de la conversión es mayor que cero, se devuelve ese valor; de lo contrario, se retorna 0.

* CombustibleNuclear: Proporciona una abstracción para gestionar el combustible utilizado en el sistema nuclear. Permite recargar el combustible, verificar si hay suficiente, calcular la energía térmica y establecer límites. Además, define funciones abstractas para el consumo y la energía térmica, que deben implementarse en clases derivadas.

* Uranio: Extiende la clase CombustibleNuclear y proporciona dos funciones principales. La primera, consumir(cantidad: number), verifica si hay suficiente uranio disponible para consumir y luego reduce la cantidad de uranio en función de la cantidad especificada. La segunda función, calcularEnergiaTermica(cantidad: number), calcula la energía térmica generada multiplicando la cantidad de uranio por un factor constante. 

* El Reactor: Modela un sistema de generación de energía termal. Su funcionamiento se basa en el consumo de combustible nuclear para producir energía térmica. El reactor tiene un sensor térmico que mide la energía generada, y un sistema de regulación térmica que controla la cantidad de energía liberada. Además, puede cambiar su estado (iniciar o detenerse) y generar energía térmica mediante el procesamiento de combustible.

* SensorTermico: Representa un sensor de temperatura que permite suscribir y desuscribir suscriptores interesados en recibir notificaciones sobre cambios de temperatura. Además, calcula la temperatura a partir de la energía térmica proporcionada y notifica a los suscriptores cuando ocurren cambios. También ofrece métodos para obtener y establecer la temperatura actual, así como para gestionar la lista de suscriptores.

* SistemaDeRegulacionTermica: Clase abstracta que funciona como un intermediario entre la computadora de Homero J. Simpson, el Reactor, y las Barras de Control. La implementación de este sistema permite que las diversas clases trabajen con las barras de control, y con otros posibles sistemas de refrigeración que podrían ser implementados a futuro. Cada metodología de refrigeración va a poseer su propia versión de "controlarTemperatura" y "getEnergiaTermica" siendo estas funciones esenciales para la regulación de temperatura y el cálculo de la energía térmica que se encuentra en el Reactor luego de haber utilizado el mecanismo de enfriamiento en cuestión. 

* SistemaBarrasDeControl:
Clase que hereda de SistemaDeRegulacionRTermica, es la clase que se encarga de ser el sistema intermediario para el mecanismo de barras de control. Las dos funciones mas relevantes son "controlarTemperatura" la cual utiliza Homero en el caso de que se exceda la temperatura permitida, encendiendo el mecanismo de refrigeración si la precondición para realizarlo es las correcta (Que la temperatura sea mayor a 330 grados). En caso de que Homero accidentalmente activara el sistema, el mismo no se activará al no cumplir con las condiciones necesarias para hacerlo y le devolverá una excepción. Por otro lado está el "getEnergíaTérmica", que en este caso, la utiliza el Reactor con la finalidad de obtener la energía térmica nueva luego de que se utilizaran las barras de control para regular la temperatura.

Adicionalmente, el sistema cuenta con un mecanismo de rotación de barras de control, esto se refiere a que el sistema de barras maneja un conjunto de barras de control que posee a disposición el reactor para regular la energía térmica en caso de necesitarlo. Cada vez que se utiliza la función "getEnergiaTermica", dentro de la misma se calcula la nueva energía térmica que se produce luego de utilizar las barras de control, lo cual va consumiendo progresivamente la vida útil de las barras. Sin embargo, si el reactor llamara a esta función mientras las barras no se encuentran activas, simplemente devolvería su energía térmica actual, ya que las barras de control no se encuentran activas. Dentro de getEnergiaTermica, se llaman a diversas funciones, siendo las principales "ComprobarReemplazo" y "ProcesarBarra", en el proceso de revisar la utilidad de las barras de control, antes y luego de utilizarlas, principalmente para el caso en el que por algún motivo una barra de control empiece siendo incapaz de regular la energía térmica, siendo esta reemplazada inmediatamente para que la próxima barra disponible, repitiendo el proceso hasta que una barra pueda regular la temperatura exitosamente. Luego de realizar esto, a esa barra disponible, se calcula la nueva energía térmica en base a esta barra que puede satisfacer el pedido, y luego se le reduce la vida útil a la barra respectiva.

Este sistema de barras cuenta con un mecanismo para agregar y sacar barras del reactor con las funciones "addBarra" y "removeBarra".

Finalmente, para saber cuantas barras utilizó el reactor para regular la temperatura, se posee la función "getBarras" la cual devuelve cuantas barras de control fueron requeridas para poder estabilizar la energía térmica del reactor exitosamente