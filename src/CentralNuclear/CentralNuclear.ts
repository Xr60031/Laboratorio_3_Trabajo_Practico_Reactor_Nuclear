import Generador from "../GeneracionDeEnergia/Generador";
import Reactor from "../GeneracionDeEnergia/Reactor";

export default class CentralNuclear {
    private reactor: Reactor;
    private generador: Generador;

    constructor(r: Reactor, g: Generador) {
        this.reactor = r;
        this.generador = g;
    }

    public generarEnergia(): number {
        return this.generador.generarEnergiaElectrica(this.reactor.generarEnergiaTermica());
    }
}