import { CONVERSION_TEMPERATURA_A_TERMICA } from "../Constantes";
import Computadora from "../Controles/Computadora";
import Generador from "../Generadores/GeneradorElectrico/Generador";
import NoHayCombustibleExcepcion from "../Generadores/Reactor/Combustible/ExcepcionesCombustible/NoHayCombustibleExcepcion";
import Reactor from "../Generadores/Reactor/Reactor";
import SensorTermico from "../Generadores/Reactor/SensorTermico";
import Notificador from "../Interfaces/Notificador";
import Suscriptor from "../Interfaces/Suscriptor";
import DatosEnTodoMomento from "./DatosEnTodoMomento";

export default class CentralNuclear implements Suscriptor{
    
    private reactor: Reactor;
    private generador: Generador;
    private datosFuncionamiento : DatosEnTodoMomento;
    private pcHomero : Computadora;

    public getDatosFuncionamiento(){
        return this.datosFuncionamiento;
    }
    public constructor(reactor: Reactor, generador: Generador) {
        this.reactor = reactor;
        this.generador = generador;
        this.datosFuncionamiento = DatosEnTodoMomento.getInstance();
        this.pcHomero = new Computadora();

        this.iniciarSubscripciones();
    }

    public actualizar(notificador: SensorTermico): void {  
        this.datosFuncionamiento.temperatura = notificador.getTemperatura();
    }

    public añadirObservadorSensor(s : Suscriptor){
        this.reactor.getSensorTermico().suscribir(s);
    }
    public removerObservadorSensor(s : Suscriptor){
        this.reactor.getSensorTermico().desuscribir(s);
    }

    public iniciarReactor(){
        try {
            this.reactor.iniciar();
        } catch (e) {
          console.error(e);
        }
    }

    public detenerReactor(){
        try {
            this.reactor.detener();
        } catch (error) {
            console.error(error);
            
        }
    }

    public generarEnergia(duracion : number, temperatura? : number) : number{
        let energiaAcumulada : number = 0;
        
        if (temperatura !== undefined) {
            this.setTemperaturaReactor(temperatura);
        }
        
        for (let i = 0; i < duracion; i++) {
            try {
                this.datosFuncionamiento.energiaProducida = this.generador.generarEnergiaElectrica(this.reactor.generarEnergiaTermica());
                energiaAcumulada += this.datosFuncionamiento.energiaProducida;

            } catch (error) {
                console.error(error);
            } 
        }
        return energiaAcumulada;
    }

    public mostrarDatosFuncionamiento():string{
        return this.datosFuncionamiento.toString();
    }

    
    private setTemperaturaReactor(temp : number){
        this.reactor.getSensorTermico().medir(CONVERSION_TEMPERATURA_A_TERMICA(temp));
    }
    
    private iniciarSubscripciones(){
        this.reactor.getSensorTermico().suscribir(this);
        this.reactor.getSensorTermico().suscribir(this.pcHomero);
        this.pcHomero.suscribir(this.reactor.getSistemaDeRegulacionTermica());
    }

    
}