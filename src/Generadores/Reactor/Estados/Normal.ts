import { TEMPERATURA_CRITICO, TEMPERATURA_EMERGENCIA } from "../../../Constantes";
import { AccionInvalidaException } from "../ExcepcionesReactor/AccionInvalidaException";
import Apagado from "./Apagado";
import Critico from "./Critico";
import Estado from "./Estado";

export default class Normal extends Estado {
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

        this.reactor.consumirCombustible(this.reactor.getConsumoCombustible());

        this.controlarEstado();
    }

    public toString():string {
        return "Normal";
    }

    private controlarEstado(): void {
        const temperatura = this.reactor.getSensorTermico().getTemperatura();

        if (temperatura >= TEMPERATURA_EMERGENCIA) {
            this.detener();
        } else if (temperatura >= TEMPERATURA_CRITICO) {
            this.reactor.cambiarA(new Critico());
        }
    }
}