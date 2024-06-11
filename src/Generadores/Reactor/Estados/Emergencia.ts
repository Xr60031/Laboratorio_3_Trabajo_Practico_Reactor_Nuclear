import Apagado from "./Apagado";
import Estado from "./Estado";

export default class Emergencia extends Estado {
    public iniciar(): void {
        throw new Error("Method not implemented.");
    }

    public detener(): void {
        this.reactor.cambiarA(new Apagado());
    }

    public generarEnergiaTermica(): void {
        throw new Error("Method not implemented."); // No es posible continuar generando más energía 
    }

    public toString(): String {
        return "Emergencia";
    } 
}