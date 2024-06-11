import { COMBUSTIBLE_INICIO_REACTOR, REDUCCION_TEMPERATURA_APAGADO } from "../../../Constantes";
import { NoHayCombustibleExcepcion } from "../Combustible/ExcepcionesCombustible/NoHayCombustibleExcepcion";
import { AccionInvalidaException } from "../ExcepcionesReactor/AccionInvalidaException";
import Estado from "./Estado";
import Normal from "./Normal";

export default class Apagado extends Estado {
    public iniciar(): void {
        if (!this.reactor.getCombustible().tieneCombustible()) {
            throw new NoHayCombustibleExcepcion(
                "No hay combustible para iniciar el reactor."
            );
        }

        this.reactor.consumirCombustible(this.reactor.getConsumoCombustible() * COMBUSTIBLE_INICIO_REACTOR);
        this.reactor.cambiarA(new Normal());
    }

    public detener(): void {
        throw new AccionInvalidaException(
            "El reactor ya se encuentra detenido."
        );
    }

    public generarEnergiaTermica(): void {
        this.reducirEnergiaTermica();

        if (0 === this.reactor.getEnergiaTermica()) {
            this.iniciar();
        }
    }

    public toString(): String {
        return "Apagado";
    }

    private reducirEnergiaTermica(): void {
        let energiaTermica = this.reactor.getEnergiaTermica();
        energiaTermica -= REDUCCION_TEMPERATURA_APAGADO;
        if (energiaTermica < 0) {
            energiaTermica = 0;
        }
        this.reactor.setEnergiaTermica(energiaTermica);
        
        this.reactor.getSensorTermico().medir(energiaTermica);
    }

    /*public generarEnergiaTermicaNICO(): number {
        const temperatura: number = this.reactor.getSensorTermico().medir();
        const energiaTermica: number = temperatura * 8 - 140;
        return this.reactor.getSistemaDeRegulacionTermica().getEnergiaTermica(energiaTermica);
    }*/
}