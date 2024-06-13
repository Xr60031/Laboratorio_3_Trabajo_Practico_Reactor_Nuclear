export default class DatosEnTodoMomento{
    private _temperatura: number;
    private _energiaProducida: number;

    public get temperatura(): number {
        return this._temperatura;
    }
    public set temperatura(value: number) {
        this._temperatura = value;
    }
    public get energiaProducida(): number {
        return this._energiaProducida;
    }
    public set energiaProducida(value: number) {
        this._energiaProducida = value;
    }

    constructor(){
        this._temperatura = 0;
        this._energiaProducida = 0;
    }

    public toString():string{
        return "Temperatura: "+ this.temperatura + "\nEnergia producida : " + this.energiaProducida;
    }
}