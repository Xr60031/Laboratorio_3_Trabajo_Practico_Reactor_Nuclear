export default class ExceptionSistemaYaEncendido extends Error{

    public getMessage():String{
        return this.message;
    }

    constructor();
    constructor(){
        super();
        this.message="El sistema ya se encuentra encendido";
    }
}