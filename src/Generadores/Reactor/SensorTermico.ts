import { Computadora } from "../../Controles/Computadora";
import { CONVERSION_TERMICA_A_TEMPERATURA } from "../../Constantes";

export class SensorTermico {
    private temperatura: number;
    private computadoras: Computadora[];

    constructor(temperatura: number) {
        this.temperatura = temperatura ?? 0;
        this.computadoras = [];
    }

    public suscribir(computadora: Computadora): void {
        this.computadoras.push(computadora);
    }

    public desuscribir(computadora: Computadora): void {
        const indice = this.computadoras.indexOf(computadora);
        if (indice > -1) {
            this.computadoras.splice(indice, 1);
        }
    }

    public notificar(): void {
        this.computadoras.forEach((computadora) => {
            computadora.actualizar(this.temperatura);
        });
    }

    public medir(energiaTermica: number): void {
        this.temperatura = CONVERSION_TERMICA_A_TEMPERATURA(energiaTermica);
        this.notificar();
    }

    public getTemperatura(): number {
        return this.temperatura;
    }

    public setComputadoras(value: Computadora[]) {
        this.computadoras = value;
    }

    public getComputadoras(): Computadora[] {
        return this.computadoras;
    }
}
