import Notificador from "./Notificador";

export default interface Suscriptor {
    actualizar(notificador: Notificador): void;
}