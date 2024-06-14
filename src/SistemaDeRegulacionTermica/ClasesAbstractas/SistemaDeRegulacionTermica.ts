import Computadora from "../../Controles/Computadora";
import Suscriptor from "../../Interfaces/Suscriptor";

export default abstract class SistemaDeRegulacionTermica implements Suscriptor{
    public abstract verificadorParaEncender(temperatura:number):void;
    public abstract getEnergiaTermica(energiaTermica: number): number;
    protected encendido:boolean=false;
    public actualizar(notificador: Computadora): void {
        if (notificador.getModoEnfriamiento()) {
            this.verificadorParaEncender(notificador.getTemperaturaReactor());
        } else {
            this.apagarSistema();
            
        }
    }
    public encenderSistema():void{
        this.encendido=true;
        }
    public apagarSistema():void{
        this.encendido=false;
    }
    public getEstado():boolean{
        return this.encendido;
    }
}