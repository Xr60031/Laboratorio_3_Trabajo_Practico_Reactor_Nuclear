import ExceptionTemperaturaNormal from "../Exceptions/ExceptionTemperaturaNormal";
import ExceptionVidaUtilInvalida from "../Exceptions/ExceptionVidaUtilInvalida";
import SistemaDeRegulacionTermica from "../Interfaces/SistemaDeRegulacionTermica";

export default class BarraDeControl implements SistemaDeRegulacionTermica{
    private vidaUtil:number=0;

    public getVidaUtil():number{
        return this.vidaUtil;
    }

    public controlarVidaUtil(vidaUtil:number):void{
        if(vidaUtil>200 || vidaUtil<0){
            throw new ExceptionVidaUtilInvalida(vidaUtil);
        }
    }

    public setVidaUtil(nuevaVidaUtil:number):void{
        this.controlarVidaUtil(nuevaVidaUtil);
        this.vidaUtil=nuevaVidaUtil;
    }

    ControlarTemperatura(temperatura:number):number{
        if(temperatura>330){
            return this.getPorcentajeProduccion();
        }
        else{
            throw new ExceptionTemperaturaNormal(temperatura);
        }
    }

    public getPorcentajeProduccion():number{
        return (this.getVidaUtil()/3600)*100;
    }

    constructor();
    constructor(vidaUtil:number);
    constructor(vidaUtil?:number){
        if(vidaUtil!==undefined){
            this.controlarVidaUtil(vidaUtil);
            this.vidaUtil=vidaUtil;
        }
    }
}