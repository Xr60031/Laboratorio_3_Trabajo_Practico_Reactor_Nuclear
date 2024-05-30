import LinkedList from "linked-list-typescript"
import Reactor from "../GeneracionDeEnergia/Reactor";
import Estado from "./Estado";


export default class Critico implements Estado {
    private reactor: Reactor;
    private turbinas: LinkedList<Turbina>;

    constructor(r: Reactor, t: LinkedList<Turbina>) {
        this.reactor = r;
        this.turbinas = t;
    }

    generarEnergia(): void {
        let temperatura: number = this.reactor.getTemperatura();
        temperatura += 30;

        for (let turbina of this.turbinas) {
            if (turbina.getEstado() === "PRENDIDA") {
                temperatura += turbina.getPotencia();
            }
        }
        this.reactor.setTemperatura(temperatura);
    }

    refrigerar(): void {
        let temperatura: number = this.reactor.getTemperatura();
        temperatura -= 30;
        temperatura -= this.reactor.cantidadTurbinas();
        this.reactor.setTemperatura(temperatura);
    }

    toString(): string {
        return "Critico";
    }
}