import { SistemaRegulacionTermica } from "../Generadores/Reactor/RegulacionTermica/SistemaRegulacionTermica";
import { AlertaTemperatura } from "../Generadores/Reactor/Types/AlertaTemperatura";

export class Computadora {
    private sistemaRegulacionTermica: SistemaRegulacionTermica;

    constructor(sistemaRegulacionTermica: SistemaRegulacionTermica) {
        this.sistemaRegulacionTermica = sistemaRegulacionTermica;
    }

    public recibirAlertaTemperatura(alerta: AlertaTemperatura): void {
        if (alerta === AlertaTemperatura.NORMAL) {
            this.desactivarModoEnfriamiento();
        } else if (alerta === AlertaTemperatura.ALTA) {
            this.activarModoEnfriamiento();
        }
    }

    private activarModoEnfriamiento(): void {
        this.sistemaRegulacionTermica.encender();
    }

    private desactivarModoEnfriamiento(): void {
        this.sistemaRegulacionTermica.apagar();
    }
}