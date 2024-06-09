import { CombustibleNuclear } from "./Combustible/CombustibleNuclear";
import { NoHayCombustibleExcepcion } from "./Combustible/ExcepcionesCombustible/NoHayCombustibleExcepcion";
import SistemaDeRegulacionTermica from "../../SistemaDeRefrigeracion/ClasesAbstractas/SistemaDeRegulacionTermica";
import { SensorTermico } from "./SensorTermico";
import Estado from "./Estados/Estado";
import { COMBUSTIBLE_INICIO_REACTOR, CONSUMO_COMBUSTIBLE_BASICO, REDUCCION_TEMPERATURA_APAGADO, TEMPERATURA_CRITICA, TEMPERATURA_CRITICIDAD } from "../../Constantes";

export default class Reactor {
    private static instance: Reactor;
    private consumoCombustible: number;
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

        this.consumoCombustible = CONSUMO_COMBUSTIBLE_BASICO;
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
        this.consumirCombustible(this.consumoCombustible * COMBUSTIBLE_INICIO_REACTOR);
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
        if (this.energiaTermica - REDUCCION_TEMPERATURA_APAGADO < 0) {
            this.energiaTermica = 0;
        } else {
            this.energiaTermica -= REDUCCION_TEMPERATURA_APAGADO;
        }

        this.sensor.medir(this.energiaTermica);
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

}
