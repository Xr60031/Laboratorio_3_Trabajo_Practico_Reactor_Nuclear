import Estado from "./Estado";
import { SensorTermico } from "../Generadores/Reactor/SensorTermico";
import { SistemaRegulacionTermica } from "../Generadores/Reactor/RegulacionTermica/SistemaRegulacionTermica";

export default class Emergencia extends Estado {
    
    private sensor: SensorTermico;
    private sistemaRegulacionTermica: SistemaRegulacionTermica;
    //private barras: LinkedList<Turbina>;

    constructor(s: SensorTermico, sistRegTermica: SistemaRegulacionTermica) {
        this.sensor = s;
        this.sistemaRegulacionTermica = sistRegTermica;
    }

    public generarEnergiaTermica(): void {
        // No es posible continuar generando más energía 
    }
    
    public activarModoEnfriamiento(): void {
        this.sistemaRegulacionTermica.controlarEnergiaTermica;
        // aquí apaga el reactor directamente    
    }

    public toString(): String {
        return "Emergencia";
    } 
}