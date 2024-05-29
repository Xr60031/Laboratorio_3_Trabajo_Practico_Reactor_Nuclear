import { Computadora } from "../../Controles/Computadora";
import { AlertaTemperatura } from "./Types/AlertaTemperatura";

export class SensorTermico {
    private temperatura: number;
    private computadora: Computadora;

    constructor(computadora: Computadora) {
        this.computadora = computadora;
        this.temperatura = 0;
    }

    public medir(energiaTermica: number): void {
        this.temperatura = energiaTermica / 7.5;

        if (this.temperatura >= 330) {
            this.enviarAlertaTemperatura(AlertaTemperatura.ALTA);
        } else {
            this.enviarAlertaTemperatura(AlertaTemperatura.NORMAL);
        }
    }

    private enviarAlertaTemperatura(alerta: AlertaTemperatura): void {
        this.computadora.recibirAlertaTemperatura(alerta);
    }

    public getTemperatura(): number {
        return this.temperatura;
    }
}
