import SistemaDeRegulacionTermica from "../SistemaDeRefrigeracion/ClasesAbstractas/SistemaDeRegulacionTermica";
import { AlertaTemperatura } from "../Comunicaciones/AlertaTemperatura";

export class Computadora {
    private sistemaRegulacionTermica: SistemaDeRegulacionTermica;

    constructor(SistemaDeRegulacionTermica: SistemaDeRegulacionTermica) {
        this.sistemaRegulacionTermica = SistemaDeRegulacionTermica;
    }

    // OBSERVERS!!!!!

    public recibirAlertaTemperatura(alerta: AlertaTemperatura): void {
        if (alerta === AlertaTemperatura.NORMAL) {
            this.desactivarModoEnfriamiento();
        } else if (alerta === AlertaTemperatura.ALTA) {
            this.activarModoEnfriamiento();
        }
    }

    private activarModoEnfriamiento(): void {
        //Mandarle a sus suscribers encender
        this.sistemaRegulacionTermica.encenderSistema();
    }

    private desactivarModoEnfriamiento(): void {
        //Mandarle a sus suscribers apagado
        this.sistemaRegulacionTermica.apagarSistema();
    }
}
