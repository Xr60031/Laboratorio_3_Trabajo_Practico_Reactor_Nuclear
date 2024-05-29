import { Computadora } from "../../Controles/Computadora";

export class SensorTermico {
    private temperatura: number;
    private computadora: Computadora;

    constructor(computadora: Computadora) {
        this.computadora = computadora;
        this.temperatura = 0;
    }

    public medir(energiaTermica: number): void {
        this.temperatura = energiaTermica / 7.5;
        console.log("Temperatura: ", this.temperatura);
        if (this.temperatura > 330) {
            this.enviarAlertaTemperatura();
        }
    }

    private enviarAlertaTemperatura(): void {
        this.computadora.recibirAlertaTemperatura();
    }

    public getTemperatura(): number {
        return this.temperatura;
    }
}
