import { Computadora } from "../../Controles/Computadora";
import { AlertaTemperatura } from "../../Comunicaciones/AlertaTemperatura";
import { MODIFICADOR_TEMPERATURA_ENERGIA } from "../../Constantes";



export class SensorTermico {
    private _temperatura: number;
    private _computadora: Computadora;

    constructor(computadora: Computadora, temperatura: number) {
        this._computadora = computadora;
        this._temperatura = temperatura ?? 0;
    }

    public medir(energiaTermica: number): void {
        this._temperatura = energiaTermica / MODIFICADOR_TEMPERATURA_ENERGIA;

        if (this._temperatura >= 330) {
            this.enviarAlertaTemperatura(AlertaTemperatura.ALTA);
        } else {
            this.enviarAlertaTemperatura(AlertaTemperatura.NORMAL);
        }
    }

    private enviarAlertaTemperatura(alerta: AlertaTemperatura): void {
        this._computadora.recibirAlertaTemperatura(alerta);
    }

    public set temperatura(value: number) {
        this._temperatura = value;
    }

    public get temperatura(): number {
        return this._temperatura;
    }
}
