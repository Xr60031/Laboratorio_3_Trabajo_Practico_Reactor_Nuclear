
import Mensaje from "../Comunicaciones/Mensaje";
import { Cabecera } from "../Types/Cabecera";
import { Comandos } from "../Types/Comandos";



export default class Computadora{

    public mostrarAlerta(alerta : Mensaje): Mensaje{
        alerta.mostrarMensaje();
        return this.mostrarMenu();
    }
    private mostrarMenu(): Mensaje{
        var opcion : string | null= "1";
   
        while(opcion != "0"){
            opcion = prompt("1. Mostrar temperatura\n2. Iniciar sistema de enfriamiento\n0. Continuar la produccion");
            if(opcion == "1"){
                return new Mensaje(2, Comandos.PEDIR_TEMPERATURA.toString());
            }else if(opcion == "2"){
                return new Mensaje(2, Comandos.INICIAR_REFRIGERACION.toString());
            }
        }
        return new Mensaje(0, "Continuar");

    }
}