import SistemaDeRegulacionTermica from "../ClasesAbstractas/SistemaDeRegulacionTermica";
import ExceptionTemperaturaNormal from "../Exceptions/ExceptionTemperaturaNormal";
import BarraDeControl from "../BarraDeControl/BarraDeControl";
import ExceptionSinBarras from "../Exceptions/ExceptionSinBarras";

export default class SistemaBarrasDeControl extends SistemaDeRegulacionTermica{

    private barrasDeControl:Array<BarraDeControl>|undefined;

    public isEmpty():boolean{
        return this.barrasDeControl===undefined;
    }

    public addBarra(barraControl:BarraDeControl):void{
        this.barrasDeControl!.push(barraControl);
    }

    public removeBarra():void{
        if(!this.isEmpty()){
            this.barrasDeControl!.shift();
        }
        else{
            throw new ExceptionSinBarras();
        }
    }

    public getBarraActual():BarraDeControl{
        if(!this.isEmpty()){
            return this.barrasDeControl![0];
        }
        else{
            throw new ExceptionSinBarras();
        }
    }

    public comprobarReemplazo(barraActual:BarraDeControl):void{
        if(barraActual.getVidaUtil()<50){
            this.removeBarra();
        }
    }

    private procesarBarra():void{
        const barraActual=this.getBarraActual();
        barraActual!.setVidaUtil(barraActual!.desgasteBarraVidaUtil());
        this.comprobarReemplazo(barraActual);
    }

    public controlarEnergiaTermica(temperatura:number):void{
        if(temperatura>330){
            this.encenderSistema();
            this.procesarBarra();
        }
        else{
            throw new ExceptionTemperaturaNormal(temperatura);
        }
    }

    public getPorcentajeProduccion():number{
        return (this.getBarraActual().getVidaUtil()/3600)*100;
    }

    public getEnergiaTermica(energiaTermica: number):number {
        if(this.encendido) return energiaTermica * this.getPorcentajeProduccion();
        return energiaTermica;
    }

    public getBarras():Array<BarraDeControl>|undefined{
        return this.barrasDeControl;
    }

    constructor();
    constructor(barrasDeControl:Array<BarraDeControl>);
    constructor(barrasDeControl?:Array<BarraDeControl>){
        super();
        if(barrasDeControl!==undefined){
            this.barrasDeControl=barrasDeControl;
        }
    }
}