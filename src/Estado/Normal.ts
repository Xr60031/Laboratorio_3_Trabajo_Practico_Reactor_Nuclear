import Reactor from "../GeneracionDeEnergia/Reactor";
import Estado from "./Estado";


export default class Normal implements Estado {

    private reactor: Reactor;

    constructor(r: Reactor) {
        this.reactor = r;
    }   

    public generarEnergia(): void {
        let temperatura = this.reactor.getTemperatura();
        temperatura += 10;
        this.reactor.setTemperatura(temperatura);
    }

    public refrigerar(): void {
        let temperatura = this.reactor.getTemperatura();
        temperatura -=20;
        this.reactor.setTemperatura(temperatura);
    }

    public toString():string {
        return "Normal";
    }
}