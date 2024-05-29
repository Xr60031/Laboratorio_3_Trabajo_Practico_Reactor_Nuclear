import { SistemaRegulacionTermica } from "../Generadores/Reactor/RegulacionTermica/SistemaRegulacionTermica";

export class Computadora {
    private sistemaRegulacionTermica: SistemaRegulacionTermica;

    constructor(sistemaRegulacionTermica: SistemaRegulacionTermica) {
        this.sistemaRegulacionTermica = sistemaRegulacionTermica;
    }

    public recibirAlertaTemperatura(): void {
        this.activarModoEnfriamiento();
    }

    private activarModoEnfriamiento(): void {
        this.sistemaRegulacionTermica.encender();
    }
}
