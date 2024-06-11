import Apagado from "./Apagado";
import Estado from "./Estado";

export default class Critico extends Estado {
    public iniciar(): void {
        throw new Error("Method not implemented.");
    }

    public detener(): void {
        this.reactor.cambiarA(new Apagado());
    }

    public generarEnergiaTermica(): void {
        throw new Error("Method not implemented.");
    }

    public toString(): string {
        return "Critico";
    }

    /*public generarEnergiaTermicaMARCOS(): void {
        let temperatura: number = this._sensorTermico.temperatura;
        temperatura += 30;

        // aquí va lo que suma temperatura al proceso
        // -> lo que baja temperatura -> BARRAS
        for (let barra of this.barras) {
            if (barra.getEstado() === "ENCENDIDA") {
                temperatura += barra.getPotencia();
            }
        }

        this._sensorTermico.temperatura = temperatura;

    }*/
}