import SistemaDeRegulacionTermica from "../SistemaDeRegulacionTermica/ClasesAbstractas/SistemaDeRegulacionTermica";
import { TEMPERATURA_CRITICO } from "../Constantes";
import Suscriptor from "../Interfaces/Suscriptor";
import SensorTermico from "../Generadores/Reactor/SensorTermico";
import Notificador from "../Interfaces/Notificador";

export default class Computadora implements Notificador, Suscriptor {
    private suscriptores: Suscriptor[];
    private modoEnfriamiento: boolean;
    private temperaturaReactor: number;

    constructor() {
        this.suscriptores = [];
        this.modoEnfriamiento = false;
        this.temperaturaReactor = 0;
    }

    public suscribir(suscriptor: Suscriptor): void {
        this.suscriptores.push(suscriptor);
    }

    public desuscribir(suscriptor: Suscriptor): void {
        const indice = this.suscriptores.indexOf(suscriptor);
        if (indice > -1) {
            this.suscriptores.splice(indice, 1);
        }
    }

    public notificar(): void {
        //TODO: A IMPLEMENTAR (Debate catch)
        this.suscriptores.forEach((suscriptor) => {
            try{
                suscriptor.actualizar(this);
            }
            catch(ERROR){
                console.error(ERROR);
                //throw new Error(ERROR);
                
            }
        });
    }

    public actualizar(notificador: SensorTermico): void {
        this.temperaturaReactor=notificador.getTemperatura();
        this.verificarTemperatura();
    }

    public verificarTemperatura(): void {
        if (this.temperaturaReactor >= TEMPERATURA_CRITICO) {
            this.activarModoEnfriamiento();
        } else {
            this.desactivarModoEnfriamiento();
        }

        this.notificar();
    }

    private activarModoEnfriamiento(): void {
        this.modoEnfriamiento = true;
    }

    private desactivarModoEnfriamiento(): void {
        this.modoEnfriamiento = false;
    }

    public getSuscriptores(): Suscriptor[] {
        return this.suscriptores;
    }

    public setSuscriptores(value: Suscriptor[]) {
        this.suscriptores = value;
    }

    public getModoEnfriamiento(): boolean {
        return this.modoEnfriamiento;
    }

    public setModoEnfriamiento(value: boolean): void {
        this.modoEnfriamiento = value;
    }

    public getTemperaturaReactor():number{
        return this.temperaturaReactor
    }
}
