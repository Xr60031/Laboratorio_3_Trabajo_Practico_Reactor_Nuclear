import { TEMPERATURA_CRITICO, TEMPERATURA_EMERGENCIA } from "../../../Constantes";
import AccionInvalidaException from "../ExcepcionesReactor/AccionInvalidaException";
import Apagado from "./Apagado";
import Encendido from "./Encendido";
import Normal from "./Normal";

export default class Critico extends Encendido {
    public iniciar(): void {
        throw new AccionInvalidaException(
            "El reactor ya se encuentra iniciado."
        );
    }

    public detener(): void {
        this.reactor.cambiarA(new Apagado());
    }

    public toString(): string {
        return "Critico";
    }

    protected controlarEstado(): void {
        const temperatura = this.reactor.getSensorTermico().getTemperatura();

        if (TEMPERATURA_EMERGENCIA <= temperatura) {
            this.detener();
        } else if (TEMPERATURA_CRITICO > temperatura) {
            this.reactor.cambiarA(new Normal());
        }
    }

    protected absorcionEnergiaTermica(energiaTermica: number): number {
        return this.reactor.getSistemaDeRegulacionTermica().getEnergiaTermica(energiaTermica);
    }
}