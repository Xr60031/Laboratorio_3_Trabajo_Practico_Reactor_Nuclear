import { CONVERSION_TERMICA_A_TEMPERATURA } from "../../Constantes";
import Notificador from "../../Interfaces/Notificador";
import Suscriptor from "../../Interfaces/Suscriptor";

export default class SensorTermico implements Notificador {
    private temperatura: number;
    private suscriptores: Suscriptor[];

    constructor(temperatura?: number) {
        this.temperatura = temperatura ?? 0;
        this.suscriptores = [];
    }

    public suscribir(suscriptor: Suscriptor): void {
        this.suscriptores.push(suscriptor);
    }

    public desuscribir(suscriptor: Suscriptor): void {
        const indice = this.suscriptores.indexOf(suscriptor);
        if (indice > -1) {
            this.suscriptores.splice(indice, 1);
        }
    }

    public notificar(): void {
        this.suscriptores.forEach((suscriptor) => {
            suscriptor.actualizar(this);
        });
    }

    public medir(energiaTermica: number): void {
        this.temperatura = CONVERSION_TERMICA_A_TEMPERATURA(energiaTermica);
        this.notificar();
    }

    public getTemperatura(): number {
        return this.temperatura;
    }

    public setTemperatura(value: number): void {
        this.temperatura = value;
    }

    public setSuscriptores(value: Suscriptor[]) {
        this.suscriptores = value;
    }

    public getSuscriptores(): Suscriptor[] {
        return this.suscriptores;
    }
}
