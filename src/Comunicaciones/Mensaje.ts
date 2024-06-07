import { Cabecera } from "./Types/Cabecera";

//RRR
export default class Mensaje{
    private cabecera : Cabecera;
    private cuerpo : string;

    constructor(cabecera : Cabecera, mensaje : string){
        this.cuerpo = mensaje;
        this.cabecera = cabecera;
    }


    public getCuerpo():string{
        return this.cuerpo;
    }
    public getCabecera(): Cabecera{
        return this.cabecera;
    }

}