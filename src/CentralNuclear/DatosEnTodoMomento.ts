export default class DatosEnTodoMomento {
    private _temperatura: number;
    private _energiaProducida: number;
    private _barrasGastadas: number;
    private _vecesNormal: number;
    private _vecesCritico: number;
    private _vecesApagado: number;
    private static _instance: DatosEnTodoMomento;

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

    public get barrasGastadas(): number {
        return this._barrasGastadas;
    }
    public set barrasGastadas(value: number) {
        this._barrasGastadas = value;
    }
    public contarBarra(): void {
        this._barrasGastadas++;
    }

    public get vecesNormal(): number {
        return this._vecesNormal;
    }
    public set vecesNormal(value: number) {
        this._vecesNormal = value;
    }
    public contarNormal(): void {
        this._vecesNormal++;
    }

    public get vecesCritico(): number {
        return this._vecesCritico;
    }
    public set vecesCritico(value: number) {
        this._vecesCritico = value;
    }
    public contarCritico(): void {
        this._vecesCritico++;
    }

    public get vecesApagado(): number {
        return this._vecesApagado;
    }
    public set vecesApagado(value: number) {
        this._vecesApagado = value;
    }
    public contarApagado(): void {
        this._vecesApagado++;
    }

    public static getInstance(): DatosEnTodoMomento {
        if (DatosEnTodoMomento._instance == null) {
            DatosEnTodoMomento._instance = new DatosEnTodoMomento();
        }
        return DatosEnTodoMomento._instance;
    }

    private constructor() {
        this._temperatura = 0;
        this._energiaProducida = 0;
        this._barrasGastadas = 0;
        this._vecesNormal = 0;
        this._vecesCritico = 0;
        this._vecesApagado = 0;
    }

    public toString(): string {
        return "Temperatura: " + this.temperatura +
            "\nEnergia producida: " + this.energiaProducida +
            "\nBarras de control consumidas: " + this.barrasGastadas +
            "\nVeces que el rector estuvo en estado normal: " + this.vecesNormal +
            "\nVeces que el rector estuvo en estado critico: " + this.vecesCritico +
            "\nVeces que el rector debio ser apagado: " + this.vecesApagado;
    }
}