import SistemaDeRegulacionTermica from "../SistemaDeRefrigeracion/ClasesAbstractas/SistemaDeRegulacionTermica"
import { Estado } from "./Estados/Estado";
import SensorTermico from "./SensorTermico";

class Reactor {
    private static instance: Reactor;
    //private combustible: CombustibleNuclear;
    private sensorTermico: SensorTermico;
    private sistemaDeRegulacionTermica: SistemaDeRegulacionTermica;
    private estado: Estado;
    private temperatura: number;
    //private modoEnfriamiento: boolean;
    //private puedeGenerarEnergiaTermica: boolean;
    //private consumoCombustible: number;

    private constructor(sensor: SensorTermico, sistema: SistemaDeRegulacionTermica, estado: Estado) {
        this.sensorTermico = sensor;
        this.sistemaDeRegulacionTermica = sistema;
        this.estado = estado
        this.estado.set;
    }

    public static getInstance(sensor: SensorTermico, sistema: SistemaDeRegulacionTermica, estadoInicial: Estado) {
        if (Reactor.instance == null) {
            Reactor.instance = new Reactor(sensor, sistema, estadoInicial);
        }
        return Reactor.instance;
    }
    
    public iniciar(): void {
        this.estado.iniciar();
    }

    public detener(): void {
        
    }

    public generarEnergiaTermica(): number {
        if(this.estado != ESTADO_REACTOR.APAGADO) {
            const temperatura: number = this.sensorTermico.medir();
            const energiaTermica: number = temperatura * 8 - 140;
            return this.sistemaDeRegulacionTermica.getEnergiaTermica(energiaTermica);
        }
        return 0;
    }

    private enfriar(): void {

    }

    private enviarAlerta(): void {

    }
}