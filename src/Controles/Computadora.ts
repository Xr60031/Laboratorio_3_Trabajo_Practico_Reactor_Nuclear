import SistemaDeRegulacionTermica from "../SistemaDeRefrigeracion/ClasesAbstractas/SistemaDeRegulacionTermica";
import { AlertaTemperatura } from "../Comunicaciones/AlertaTemperatura";
import { TEMPERATURA_CRITICA } from "../Constantes";

export class Computadora {
    private suscribersReguladorTermico!:Array<SistemaDeRegulacionTermica>;
    private sistemaRegulacionTermica: SistemaDeRegulacionTermica;

    constructor(sistemaDeRegulacionTermica: SistemaDeRegulacionTermica) {
        this.sistemaRegulacionTermica = sistemaDeRegulacionTermica;
        this.suscribe(this.sistemaRegulacionTermica);
    }

    public actualizar(temperatura: number): void {
        this.verificarTemperatura(temperatura);
    }

    public verificarTemperatura(temperatura: number): void {
        if (temperatura > TEMPERATURA_CRITICA) {
            this.activarModoEnfriamiento();
        } else {
            this.desactivarModoEnfriamiento();
        }
    }

    private activarModoEnfriamiento(): void {
        this.suscribersReguladorTermico.forEach(element => {
            // Como obtiene la temperatura numérica la computadora?
            // -Eze
            element.verificadorParaEncender();
        });
    }

    private desactivarModoEnfriamiento(): void {
        this.suscribersReguladorTermico.forEach(element => {
            element.apagarSistema();
        });
    }

    public suscribe(sistemaDeRegulacionTermica:SistemaDeRegulacionTermica):void{
        this.suscribersReguladorTermico.push(sistemaDeRegulacionTermica);
    }

    public unsubscribe(sistemaDeRegulacionTermica:SistemaDeRegulacionTermica):void{
        let iterador=0;
        while(sistemaDeRegulacionTermica!=this.suscribersReguladorTermico[iterador]){
            iterador++;
        }
        this.suscribersReguladorTermico.splice(iterador, 1);
    }
}
