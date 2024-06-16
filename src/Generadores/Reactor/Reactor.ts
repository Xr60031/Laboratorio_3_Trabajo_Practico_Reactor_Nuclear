import CombustibleNuclear from "./Combustible/CombustibleNuclear";
import SistemaDeRegulacionTermica from "../../SistemaDeRegulacionTermica/ClasesAbstractas/SistemaDeRegulacionTermica";
import SensorTermico from "./SensorTermico";
import Estado from "./Estados/Estado";
import { CONSUMO_COMBUSTIBLE_BASICO } from "../../Constantes";
import Apagado from "./Estados/Apagado";

export default class Reactor {
    private static instance: Reactor;
    private consumoCombustible: number;
    private energiaTermica: number;
    private estado!: Estado;
    private combustible: CombustibleNuclear;
    private sistemaDeRegulacionTermica: SistemaDeRegulacionTermica;
    private sensor: SensorTermico;

    private constructor(
        combustible: CombustibleNuclear,
        sistemaRegulacionTermica: SistemaDeRegulacionTermica,
        sensor: SensorTermico,
       
    ) {
        this.combustible = combustible;
        this.sistemaDeRegulacionTermica = sistemaRegulacionTermica;
        this.sensor = sensor;

        this.consumoCombustible = CONSUMO_COMBUSTIBLE_BASICO;
        this.energiaTermica = 0;
        this.cambiarA(new Apagado());
    }

    public static getInstance(
        combustible: CombustibleNuclear,
        sistema: SistemaDeRegulacionTermica,
        sensor: SensorTermico,
    ) {
        if (Reactor.instance == null) {
            Reactor.instance = new Reactor(combustible, sistema, sensor);
        }
        return Reactor.instance;
    }

    public getSensorTermico(): SensorTermico {
        return this.sensor;
    }

    public getSistemaDeRegulacionTermica(): SistemaDeRegulacionTermica {
        return this.sistemaDeRegulacionTermica;
    }

    public getCombustible(): CombustibleNuclear {
        return this.combustible;
    }

    public getConsumoCombustible(): number {
        return this.consumoCombustible;
    }

    public getEnergiaTermica(): number {
        return this.energiaTermica;
    }

    public setEnergiaTermica(energiaTermica: number): void {
        this.energiaTermica = energiaTermica;
    }

    public cambiarA(estado: Estado) {
        this.estado = estado;
        this.estado.setReactor(this);
    }

    public iniciar(): void {
        this.estado.iniciar();
    }

    public detener(): void {
        this.estado.detener();
    }

    public generarEnergiaTermica(): number {
        this.estado.procesarEnergiaTermica();
        return this.energiaTermica;
    }

    public consumirCombustible(cantidad: number): void {
        this.energiaTermica +=
            this.controlarEnergiaTermica(
                this.combustible.consumir(cantidad)
            );

        this.sensor.medir(this.energiaTermica);
    }

    public getAdicionalEnergia(): number {
        return this.combustible.consumir(this.consumoCombustible);
    }

    private controlarEnergiaTermica(energiaTermica: number): number {
        return this.sistemaDeRegulacionTermica.getEnergiaTermica(energiaTermica);
    }
}