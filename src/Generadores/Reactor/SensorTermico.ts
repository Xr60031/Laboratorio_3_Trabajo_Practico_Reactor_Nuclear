import { Computadora } from "../../Controles/Computadora";
import { AlertaTemperatura } from "../../Comunicaciones/AlertaTemperatura";
import {
    MODIFICADOR_TEMPERATURA_ENERGIA,
    TEMPERATURA_CRITICIDAD,
} from "../../Constantes";

export class SensorTermico {
    private _temperatura: number;
    private _computadoras: Computadora[];

    constructor(temperatura: number) {
        this._temperatura = temperatura ?? 0;
        this._computadoras = [];
    }

    public suscribir(computadora: Computadora): void {
        this._computadoras.push(computadora);
    }

    public desuscribir(computadora: Computadora): void {
        const indice = this._computadoras.indexOf(computadora);
        if (indice > -1) {
            this._computadoras.splice(indice, 1);
        }
    }

    public notificar(): void {
        this._computadoras.forEach((computadora) => {
            computadora.actualizar(this.temperatura);
        });
    }

    public medir(energiaTermica: number): void {
        this.temperatura = energiaTermica / MODIFICADOR_TEMPERATURA_ENERGIA;
    }

    public set temperatura(value: number) {
        this._temperatura = value;
        this.notificar();
    }

    public get temperatura(): number {
        return this._temperatura;
    }

    public set computadoras(value: Computadora[]) {
        this._computadoras = value;
    }

    public get computadoras(): Computadora[] {
        return this._computadoras;
    }
}
