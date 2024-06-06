import Estado from "../Estado/Estado";

export default interface Notificable {
    enviarAlerta(temperatura:number, estado: Estado): void;  
}