export default abstract class SistemaDeRegulacionTermica{
    protected encendido:boolean=false;
    public abstract controlarEnergiaTermica(temperatura:number):void;
    public abstract getEnergiaTermica(energiaTermica: number): number;
    public encenderSistema():void{
        this.encendido=true;
    }
    public apagarSistema():void{
        this.encendido=false;
    }
    public getEstado():boolean{
        return this.encendido;
    }
}