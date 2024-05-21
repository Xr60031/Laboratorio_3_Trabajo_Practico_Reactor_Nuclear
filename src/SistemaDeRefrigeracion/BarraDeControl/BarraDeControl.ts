import ExceptionTemperaturaNormal from "../Exceptions/ExceptionTemperaturaNormal";
import ExceptionVidaUtilInvalida from "../Exceptions/ExceptionVidaUtilInvalida";
import SistemaDeRegulacionTermica from "../ClasesAbstractas/SistemaDeRegulacionTermica";

export default class BarraDeControl extends SistemaDeRegulacionTermica{
    private vidaUtil:number;

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

    public controlarEnergiaTermica(temperatura:number):void{
        if(temperatura>330){
            this.encenderSistema();
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
        super();
        if(vidaUtil!==undefined){
            this.controlarVidaUtil(vidaUtil);
            this.vidaUtil=vidaUtil;
        }
        else{
            this.vidaUtil=0;
        }
    }
}