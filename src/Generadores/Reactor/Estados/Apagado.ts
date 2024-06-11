import { COMBUSTIBLE_INICIO_REACTOR } from "../../../Constantes";
import { NoHayCombustibleExcepcion } from "../Combustible/ExcepcionesCombustible/NoHayCombustibleExcepcion";
import Estado from "./Estado";
import Normal from "./Normal";

export default class Apagado extends Estado {
    
    public iniciar(): void {
        if (!this.reactor.getCombustible().tieneCombustible()) {
            throw new NoHayCombustibleExcepcion(
                "No hay combustible para iniciar el reactor"
            );
        }

        this.consumirCombustible(this.reactor.getConsumoCombustible() * COMBUSTIBLE_INICIO_REACTOR);
        this.reactor.cambiarA(new Normal());
    }

    public detener(): void {
        throw new Error("Method not implemented.");
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

    private consumirCombustible(cantidad: number): void {
        this.reactor.setEnergiaTermica(
            this.reactor.getEnergiaTermica() +
            this.controlarEnergiaTermica(
                this.reactor.getCombustible().consumir(cantidad)
            )
        );

        this.reactor.getSensorTermico().medir(this.reactor.getEnergiaTermica());
    }

    private controlarEnergiaTermica(energiaTermica: number): number {
        return this.reactor.getSistemaDeRegulacionTermica().getEnergiaTermica(energiaTermica);
    }

    private reducirEnergiaTermica(): void {
        this.energiaTermica -= REDUCCION_TEMPERATURA_APAGADO;
        if (this.energiaTermica < 0) {
            this.energiaTermica = 0;
        }

        this.sensor.medir(this.energiaTermica);
    }

    /*public generarEnergiaTermicaNICO(): number {
        const temperatura: number = this.reactor.getSensorTermico().medir();
        const energiaTermica: number = temperatura * 8 - 140;
        return this.reactor.getSistemaDeRegulacionTermica().getEnergiaTermica(energiaTermica);
    }*/
}