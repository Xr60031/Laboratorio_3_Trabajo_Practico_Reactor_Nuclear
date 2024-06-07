import Generador from "../Generadores/GeneradorElectrico/Generador";
import Reactor from "../Generadores/Reactor/Reactor";

//Para agregar iniciar reactor;

export default class CentralNuclear {
    private static instance: CentralNuclear;
    private reactor: Reactor;
    private generador: Generador;

    private constructor(reactor: Reactor, generador: Generador) {
        this.reactor = reactor;
        this.generador = generador;
    }

    public static getInstance(reactor: Reactor, generador: Generador): CentralNuclear {
        if (CentralNuclear.instance == null) {
            CentralNuclear.instance = new CentralNuclear(reactor, generador);
        }
        return CentralNuclear.instance;
    }

    // Deberia recibir un number y un bucle for que ejecute la función de generar energia
    // Cada una hora
    public generarEnergia(): number {
        return this.generador.generarEnergiaElectrica(this.reactor.generarEnergiaTermica());
    }
}