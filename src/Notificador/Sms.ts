import Notificable from "./Notificador";
import Estado from "../Estado/Estado";

export default class Sms implements Notificable {

    public enviarAlerta(temperatura: number, estado: Estado): void {

        console.log("Enviando SMS...");
        console.log("Estado del Reactor: " + estado);
        console.log("Temperatura del Reactor: " + temperatura);
    }
}