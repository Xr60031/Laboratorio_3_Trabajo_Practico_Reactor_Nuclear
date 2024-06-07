import { CombustibleNuclear } from "./Combustible/CombustibleNuclear";
import { NoHayCombustibleExcepcion } from "./Combustible/ExcepcionesCombustible/NoHayCombustibleExcepcion";
import SistemaDeRegulacionTermica from "../../SistemaDeRefrigeracion/ClasesAbstractas/SistemaDeRegulacionTermica";
import { SensorTermico } from "./SensorTermico";
import Estado from "./Estados/Estado";

export default class Reactor {
    private static instance: Reactor;
    private consumoCombustible: number;
    private capacidadProductiva: number;
    private energiaTermica: number;
    private estado: Estado;
    private combustible: CombustibleNuclear;
    private sistemaDeRegulacionTermica: SistemaDeRegulacionTermica;
    private sensor: SensorTermico;
    private temperatura: number;

    constructor(
        combustible: CombustibleNuclear,
        sistemaRegulacionTermica: SistemaDeRegulacionTermica,
        sensor: SensorTermico,
        estado: Estado
    ) {
        this.combustible = combustible;
        this.sistemaDeRegulacionTermica = sistemaRegulacionTermica;
        this.sensor = sensor;

        this.consumoCombustible = 1;
        this.capacidadProductiva = 1;
        this.energiaTermica = 0;
        this.temperatura = 0;
        this.estado = estado;
        this.estado.setReactor(this);
    }

    public static getInstance(
        combustible: CombustibleNuclear,
        sistema: SistemaDeRegulacionTermica,
        sensor: SensorTermico,
        estadoInicial: Estado
    ) {
        if (Reactor.instance == null) {
            Reactor.instance = new Reactor(combustible, sistema, sensor, estadoInicial);
        }
        return Reactor.instance;
    }

    public getSensorTermico(): SensorTermico {
        return this.sensor;
    }

    public getSistemaDeRegulacionTermica(): SistemaDeRegulacionTermica {
        return this.sistemaDeRegulacionTermica;
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
        return this.sistemaDeRegulacionTermica.getEnergiaTermica(
            energiaTermica
        );
    }

    public getCapacidadProductiva(): number {
        return this.capacidadProductiva;
    }
}
