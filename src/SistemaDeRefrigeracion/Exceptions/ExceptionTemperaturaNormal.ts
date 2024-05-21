export default class ExceptionTemperaturaNormal extends Error{

    private temperatura:number=0;

    public getMessage():String{
        return this.message+this.temperatura;
    }

    constructor();
    constructor(temperatura:number);
    constructor(temperatura?:number){
        super();
        if(temperatura!==undefined){
            this.temperatura=temperatura;
        }
        this.message="La temperatura del reactor se encuentra normal, no se realizaron medidas, temperatura: ";
    }
}