import { TEMPERATURA_CRITICO, TEMPERATURA_EMERGENCIA } from "../../../Constantes";
import { AccionInvalidaException } from "../ExcepcionesReactor/AccionInvalidaException";
import Apagado from "./Apagado";
import Estado from "./Estado";
import Normal from "./Normal";

export default class Critico extends Estado {
    public iniciar(): void {
        throw new AccionInvalidaException(
            "El reactor ya se encuentra encendido."
        );
    }

    public detener(): void {
        this.reactor.cambiarA(new Apagado());
    }

    public generarEnergiaTermica(): void {
        super.generarEnergiaTermica();

        this.controlarEstado();
    }

    public toString(): string {
        return "Critico";
    }

    private controlarEstado(): void {
        const temperatura = this.reactor.getSensorTermico().getTemperatura();

        if (temperatura >= TEMPERATURA_EMERGENCIA) {
            this.detener();
        } else if (temperatura < TEMPERATURA_CRITICO) {
            this.reactor.cambiarA(new Normal());
        }
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