import SistemaDeRegulacionTermica from "../ClasesAbstractas/SistemaDeRegulacionTermica";
import ExceptionTemperaturaNormal from "../ExceptionsBarras/ExceptionTemperaturaNormal";
import BarraDeControl from "../BarraDeControl/BarraDeControl";
import ExceptionSinBarras from "../ExceptionsBarras/ExceptionSinBarras";
import { BARRA_ENERGIA_MINIMA, DIVISOR_PRODUCCION_ENERGIA_TERMICA, TEMPERATURA_CRITICO } from "../../Constantes";
import DatosEnTodoMomento from "../../CentralNuclear/DatosEnTodoMomento";

export default class SistemaBarrasDeControl extends SistemaDeRegulacionTermica{

    private barrasDeControl:BarraDeControl[];
    private barrasGastadas:number=0;

    public getBarrasGastadas():number{
        return this.barrasGastadas;
    }

    public aumentarBarrasGastadas():void{
        this.barrasGastadas++;
        DatosEnTodoMomento.getInstance().contarBarra();
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
        if(temperatura>=TEMPERATURA_CRITICO){
            try{
                this.encenderSistema();
            }catch(Error){
                //TODO agregar lo que corresponda
                console.log("verificadorParaEncender() : catch no implementado");
            }
        }
        else{
            throw new ExceptionTemperaturaNormal(temperatura);
        }
    }

    public getPorcentajeReduccion():number{
        return (this.getBarraActual().getVidaUtil() / DIVISOR_PRODUCCION_ENERGIA_TERMICA);
    }

    public getEnergiaTermica(energiaTermica: number):number {
        if(this.encendido){ 
            const energiaTermicaCalculada = energiaTermica * (1 - this.getPorcentajeReduccion());
            this.procesarBarra();
            return energiaTermicaCalculada;
        }
        return energiaTermica;
    }

    public getBarras():BarraDeControl[]{
        return this.barrasDeControl;
    }

    constructor();
    constructor(barrasDeControl:BarraDeControl[]);
    constructor(barrasDeControl?:BarraDeControl[]){
        super();
        if(barrasDeControl!==undefined){
            this.barrasDeControl=barrasDeControl;
        }
        else{
            this.barrasDeControl=[];
        }
    }
}