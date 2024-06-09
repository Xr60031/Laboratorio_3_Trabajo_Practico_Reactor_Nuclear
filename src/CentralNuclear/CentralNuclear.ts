
import { MODIFICADOR_TEMPERATURA_ENERGIA } from "../Constantes";
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
    public iniciarReactor(){
        try {
            this.reactor.iniciar();
        } catch (NoHayCombustibleExcepcion) {
            throw new Error("Catch no implemenado CentralNuclear.iniciarReactor()");
        }
    }
    // Deberia recibir un number y un bucle for que ejecute la función de generar energia
    // Cada una hora
    public generarEnergia(duracion : number, temperatura? : number) : void{
        var energiaAcumulada : number = 0;
        this.setTemperaturaReactor(temperatura);
        
        for (let i = 0; i < duracion; i++) {
            try {
                energiaAcumulada += this.generador.generarEnergiaElectrica(this.reactor.generarEnergiaTermica());
            } catch (error) {
                console.error("Catch no implementado CentralNuclear.generarEnergia()");
            } 
        }
        
    }
    private setTemperaturaReactor(temp : number | undefined){
        if(temp !== undefined){
        this.reactor.getSensorTermico().medir(temp*MODIFICADOR_TEMPERATURA_ENERGIA);
        }
    }
}