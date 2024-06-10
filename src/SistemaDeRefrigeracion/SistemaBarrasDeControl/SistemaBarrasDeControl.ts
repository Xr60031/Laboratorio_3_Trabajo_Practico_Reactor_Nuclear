import SistemaDeRegulacionTermica from "../ClasesAbstractas/SistemaDeRegulacionTermica";
import ExceptionTemperaturaNormal from "../ExceptionsBarras/ExceptionTemperaturaNormal";
import BarraDeControl from "../BarraDeControl/BarraDeControl";
import ExceptionSinBarras from "../ExceptionsBarras/ExceptionSinBarras";
import { TEMPERATURA_CRITICIDAD } from "../../Constantes";
import { BARRA_ENERGIA_MINIMA } from "../../Constantes";
import { DIVIDENDO_PRODUCCION_ENERGIA_TERMICA } from "../../Constantes";

export default class SistemaBarrasDeControl extends SistemaDeRegulacionTermica{

    private barrasDeControl:Array<BarraDeControl>;
    private barrasGastadas:number=0;

    public getBarrasGastadas():number{
        return this.barrasGastadas;
    }

    public aumentarBarrasGastadas():void{
        this.barrasGastadas++;
    }

    public isEmpty():boolean{
        return this.barrasDeControl.length===0;
    }

    public addBarra(barraControl:BarraDeControl):void{
        this.barrasDeControl.push(barraControl);
    }

    public removeBarra():void{
        if(!this.isEmpty()){
            this.barrasDeControl.shift();
        }
        else{
            throw new ExceptionSinBarras();
        }
    }

    public getBarraActual():BarraDeControl{
        if(!this.isEmpty()){
            return this.barrasDeControl[0];
        }
        else{
            throw new ExceptionSinBarras();
        }
    }

    public comprobarReemplazo(barraActual:BarraDeControl):void{
        if(barraActual.getVidaUtil()<BARRA_ENERGIA_MINIMA){
            this.removeBarra();
            this.aumentarBarrasGastadas();
        }
    }

    private procesarBarra():void{
        let barraActual=this.getBarraActual();
        let iterador=0;
        while(barraActual.getVidaUtil()<BARRA_ENERGIA_MINIMA){
            barraActual=this.barrasDeControl[iterador];
            this.comprobarReemplazo(barraActual);
        }
        barraActual.setVidaUtil(barraActual.desgasteBarraVidaUtil());
        this.comprobarReemplazo(barraActual);
    }

    public verificadorParaEncender(temperatura:number):void{
        if(temperatura>=TEMPERATURA_CRITICIDAD){
            this.encenderSistema();
        }
        else{
            throw new ExceptionTemperaturaNormal(temperatura);
        }
    }

    public getPorcentajeProduccion():number{
        return (this.getBarraActual().getVidaUtil()/DIVIDENDO_PRODUCCION_ENERGIA_TERMICA);
    }

    public getEnergiaTermica(energiaTermica: number):number {
        if(this.encendido){ 
            const energiaTermicaCalculada=energiaTermica * this.getPorcentajeProduccion();
            this.procesarBarra();
            return energiaTermicaCalculada;
        }
        return energiaTermica;
    }

    public getBarras():Array<BarraDeControl>{
        return this.barrasDeControl;
    }

    constructor();
    constructor(barrasDeControl:Array<BarraDeControl>);
    constructor(barrasDeControl?:Array<BarraDeControl>){
        super();
        if(barrasDeControl!==undefined){
            this.barrasDeControl=barrasDeControl;
        }
        else{
            this.barrasDeControl=[];
        }
    }
}