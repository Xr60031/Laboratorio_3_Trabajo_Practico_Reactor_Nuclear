import { CONVERSION_TEMPERATURA_A_TERMICA } from "../Constantes";
import Generador from "../Generadores/GeneradorElectrico/Generador";
import Reactor from "../Generadores/Reactor/Reactor";

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

    public iniciarReactor(){
        try {
            this.reactor.iniciar();
        } catch (NoHayCombustibleExcepcion) {
            throw new Error("Catch no implementado CentralNuclear.iniciarReactor()");
        }
    }

    public generarEnergia(duracion : number, temperatura? : number) : number{
        let energiaAcumulada : number = 0;

        if (temperatura !== undefined) {
            this.setTemperaturaReactor(temperatura);
        }
        
        for (let i = 0; i < duracion; i++) {
            try {
                energiaAcumulada += this.generador.generarEnergiaElectrica(this.reactor.generarEnergiaTermica());
            } catch (error) {
                console.error("Catch no implementado CentralNuclear.generarEnergia()");
            } 
        }
        return energiaAcumulada;
    }

    public setTemperaturaReactor(temp : number){
        this.reactor.getSensorTermico().medir(CONVERSION_TEMPERATURA_A_TERMICA(temp));
    }
}