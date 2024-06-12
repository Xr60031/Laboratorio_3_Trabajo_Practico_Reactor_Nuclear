import Suscriptor from "./Suscriptor";

export default interface Notificador {
    suscribir(suscriptor: Suscriptor): void;
    desuscribir(suscriptor: Suscriptor): void;
    notificar(): void;
}
