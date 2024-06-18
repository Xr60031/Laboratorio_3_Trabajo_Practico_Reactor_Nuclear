import Computadora from "../../Controles/Computadora";
import Suscriptor from "../../Interfaces/Suscriptor";
import ExceptionSistemaYaApagado from "../ExceptionsBarras/ExceptionSistemaYaApagado";
import ExceptionSistemaYaEncendido from "../ExceptionsBarras/ExceptionSistemaYaEncendido";

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
        
        if(this.getEstado()==false){
            this.encendido=true;
        }
        else{
            throw new ExceptionSistemaYaEncendido();
        }
        
    }
    public apagarSistema():void{
        if(this.getEstado()==true){
            this.encendido=false;
        }
        else{
            throw new ExceptionSistemaYaApagado();
        }
        
    }
    public getEstado():boolean{
        return this.encendido;
    }
}