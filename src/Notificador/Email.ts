import Estado from "../Estado/Estado";
import Notificable from "./Notificador";

export default class Email implements Notificable {

    private notificador: Notificable;

    constructor(n: Notificable) {
        this.notificador = n;
    }

    public enviarAlerta(temperatura: number, estado: Estado): void {
        
        if (this.notificador != null) {
            this.notificador.enviarAlerta(temperatura, estado);
        }

        console.log("enviando Email...");
        console.log("Estado del reactor :" + estado);
        console.log("temperatura del reactor: " + temperatura);
    }
}