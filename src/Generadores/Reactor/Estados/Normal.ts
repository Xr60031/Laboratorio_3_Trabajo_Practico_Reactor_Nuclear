import Estado from "./Estado";
import SensorTermico from "../GeneracionDeEnergia/SensorTermico";
import { SistemaRegulacionTermica } from "../Generadores/Reactor/RegulacionTermica/SistemaRegulacionTermica";


export default class Normal extends Estado {

    private sensor: SensorTermico;
    private sistemaRegulacionTermica: SistemaRegulacionTermica;

    constructor(sensor: SensorTermico, sistRegTermica: SistemaRegulacionTermica) {
        this.sensor = sensor;
        this.sistemaRegulacionTermica = sistRegTermica;
    }   

    public generarEnergiaTermica(): void {
        let temperatura = this.sensor.medir();
        temperatura += 10;
        this.sensor.setTemperatura(temperatura);
    }

    public activarModoEnfriamiento(): void {
        this.sistemaRegulacionTermica.encender();
    }

    public toString():string {
        return "Normal";
    }
}