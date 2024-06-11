import { TEMPERATURA_CRITICO, TEMPERATURA_EMERGENCIA } from "../../../Constantes";
import AccionInvalidaException from "../ExcepcionesReactor/AccionInvalidaException";
import Apagado from "./Apagado";
import Encendido from "./Encendido";
import Critico from "./Critico";

export default class Normal extends Encendido {
    public iniciar(): void {
        throw new AccionInvalidaException(
            "El reactor ya se encuentra iniciado."
        );
    }

    public detener(): void {
        this.reactor.cambiarA(new Apagado());
    }

    public toString(): string {
        return "Normal";
    }

    protected controlarEstado(): void {
        const temperatura = this.reactor.getSensorTermico().getTemperatura();

        if (TEMPERATURA_EMERGENCIA <= temperatura) {
            this.detener();
        } else if (TEMPERATURA_CRITICO <= temperatura) {
            this.reactor.cambiarA(new Critico());
        }
    }

    protected absorcionEnergiaTermica(energiaTermica: number): number {
        return energiaTermica;
    }
}