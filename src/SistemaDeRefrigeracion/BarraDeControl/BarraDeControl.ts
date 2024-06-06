import ExceptionVidaUtilInvalida from "../Exceptions/ExceptionVidaUtilInvalida";

export default class BarraDeControl {
    private vidaUtil:number;
    private nroSerie:number;

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

    public desgasteBarraVidaUtil():number{
        return this.vidaUtil-50;
    }

    public setNroSerie(nroSerie:number):void{
        this.nroSerie=nroSerie;
    }

    public getNroSerie():number{
        return this.nroSerie;
    }
    
    constructor();
    constructor(nroSerie:number, vidaUtil:number);
    constructor(nroSerie?:number, vidaUtil?:number){
        if(vidaUtil!==undefined && nroSerie!==undefined){
            this.controlarVidaUtil(vidaUtil);
            this.vidaUtil=vidaUtil;
            this.nroSerie=nroSerie;
        }
        else{
            this.vidaUtil=200;
            this.nroSerie=0;
        }
    }
}