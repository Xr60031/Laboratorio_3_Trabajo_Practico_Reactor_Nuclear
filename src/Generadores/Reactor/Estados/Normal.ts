import Apagado from "./Apagado";
import Estado from "./Estado";

export default class Normal extends Estado {
    public iniciar(): void {
        throw new Error("Method not implemented.");
    }

    public detener(): void {
        this.reactor.cambiarA(new Apagado());
    }

    public generarEnergiaTermica(): void {
        if (!this.combustible.tieneCombustible()) {
            this.detener();
        }

        this.consumirCombustible(this.consumoCombustible);

        this.controlarEstado();
        
        if (this.estado === EstadoReactor.CRITICA) {
            this.detener();
        }
    }

    public toString():string {
        return "Normal";
    }

    private controlarEstado(): void {
        const temperatura = this.sensor.getTemperatura();

        if (temperatura >= TEMPERATURA_CRITICA) {
            this.estado = EstadoReactor.CRITICA;
        } else if (temperatura >= TEMPERATURA_CRITICIDAD) {
            this.estado = EstadoReactor.CRITICIDAD;
        } else {
            this.estado = EstadoReactor.NORMALIDAD;
        }
    }
}