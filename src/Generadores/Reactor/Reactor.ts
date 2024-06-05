import { CombustibleNuclear } from "./Combustible/CombustibleNuclear";
import { NoHayCombustibleExcepcion } from "./Excepciones/NoHayCombustibleExcepcion";
import { SistemaRegulacionTermica } from "./RegulacionTermica/SistemaRegulacionTermica";
import { SensorTermico } from "./SensorTermico";
import { EstadoReactor } from "./Types/EstadoReactor";

export class Reactor {
    private consumoCombustible: number;
    private capacidadProductiva: number;
    private energiaTermica: number;
    private estado: EstadoReactor;
    private combustible: CombustibleNuclear;
    private sistemaRegulacionTermica: SistemaRegulacionTermica;
    private sensor: SensorTermico;

    constructor(
        combustible: CombustibleNuclear,
        sistemaRegulacionTermica: SistemaRegulacionTermica,
        sensor: SensorTermico
    ) {
        this.combustible = combustible;
        this.sistemaRegulacionTermica = sistemaRegulacionTermica;
        this.sensor = sensor;

        this.consumoCombustible = 1;
        this.capacidadProductiva = 1;
        this.energiaTermica = 0;
        this.estado = EstadoReactor.APAGADO;
    }

    public iniciar(): void {
        if (!this.combustible.tieneCombustible()) {
            throw new NoHayCombustibleExcepcion(
                "No hay combustible para iniciar el reactor"
            );
        }

        this.estado = EstadoReactor.NORMALIDAD;
        this.consumirCombustible(this.consumoCombustible * 210);
    }

    public mantener(): void {
        if (this.estado === EstadoReactor.APAGADO) {
            this.reducirEnergiaTermica();

            if (this.energiaTermica === 0) {
                this.iniciar();
            }
        } else {
            if (!this.combustible.tieneCombustible()) {
                this.detener();
            }

            this.consumirCombustible(this.consumoCombustible);

            this.controlarEstado();

            this.calcularCapacidadProductiva();

            if (this.estado === EstadoReactor.CRITICA) {
                this.detener();
            }
        }
    }

    public detener(): void {
        this.estado = EstadoReactor.APAGADO;
    }

    public generarEnergiaTermica(): number {
        this.mantener();

        return this.energiaTermica;
    }

    private reducirEnergiaTermica(): void {
        if (this.energiaTermica - 1000 < 0) {
            this.energiaTermica = 0;
        } else {
            this.energiaTermica -= 1000;
        }

        this.sensor.medir(this.energiaTermica);
    }

    private calcularCapacidadProductiva(): void {
        if (this.estado === EstadoReactor.NORMALIDAD) {
            this.capacidadProductiva = 1;
        } else if (this.estado === EstadoReactor.CRITICIDAD) {
            this.capacidadProductiva = 0.2;
        } else if (this.estado === EstadoReactor.CRITICA) {
            this.capacidadProductiva = 0;
        }
    }

    private controlarEstado(): void {
        const temperatura = this.sensor.getTemperatura();

        if (temperatura >= 400) {
            this.estado = EstadoReactor.CRITICA;
        } else if (temperatura >= 330) {
            this.estado = EstadoReactor.CRITICIDAD;
        } else if (temperatura >= 280) {
            this.estado = EstadoReactor.NORMALIDAD;
        }
    }

    private consumirCombustible(cantidad: number): void {
        this.energiaTermica += this.controlarEnergiaTermica(
            this.combustible.consumir(cantidad)
        );

        this.sensor.medir(this.energiaTermica);
    }

    private controlarEnergiaTermica(energiaTermica: number): number {
        return this.sistemaRegulacionTermica.controlarEnergiaTermica(
            energiaTermica
        );
    }

    public getCapacidadProductiva(): number {
        return this.capacidadProductiva;
    }
}