import SistemaDeRegulacionTermica from "../SistemaDeRefrigeracion/ClasesAbstractas/SistemaDeRegulacionTermica"
import { ESTADO_REACTOR } from "../Types/EstadoReactor";
import SensorTermico from "./SensorTermico";

export default class Reactor {
    //private combustible: CombustibleNuclear;
    private sensorTermico: SensorTermico;
    private sistemaDeRegulacionTermica: SistemaDeRegulacionTermica;
    private estado: ESTADO_REACTOR;
    //private modoEnfriamiento: boolean;
    //private puedeGenerarEnergiaTermica: boolean;
    //private consumoCombustible: number;

    constructor (sensor: SensorTermico, sistema: SistemaDeRegulacionTermica) {
        this.sensorTermico = sensor;
        this.sistemaDeRegulacionTermica = sistema;
        this.estado = ESTADO_REACTOR.APAGADO;
    }
    
    public iniciar(): void {
        this.estado = ESTADO_REACTOR.NORMALIDAD;
    }

    public mantener(): void {

    }

    public detener(): void {
        this.estado = ESTADO_REACTOR.APAGADO;
    }

    public generarEnergiaTermica(): number {
        if(this.estado != ESTADO_REACTOR.APAGADO) {
            const temperatura: number = this.sensorTermico.medir();
            const energiaTermica: number = temperatura * 8 - 140;
            return this.sistemaDeRegulacionTermica.regularEnergiaTermica(energiaTermica);
        }
        return 0;
    }

    private enfriar(): void {

    }

    private enviarAlerta(): void {

    }
}