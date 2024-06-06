import Estado from "./Estado";
import { SensorTermico } from "../Generadores/Reactor/SensorTermico";
import { SistemaRegulacionTermica } from "../Generadores/Reactor/RegulacionTermica/SistemaRegulacionTermica";
import LinkedList from "linked-list-typescript"

export default class Critico implements Estado {

    private _sensorTermico: SensorTermico;
    private _sistemaRegulacionTermica: SistemaRegulacionTermica;
    //private barras: LinkedList<SistemaDeRegulacionTermica>;

    constructor(
        sensorTermico: SensorTermico, 
        sistRegTermica: SistemaRegulacionTermica
    ) {
        this._sensorTermico = sensorTermico;
        this._sistemaRegulacionTermica = sistRegTermica;
    }

    generarEnergiaTermica(): void {
        let temperatura: number = this._sensorTermico.temperatura;
        temperatura += 30;

        // aquí va lo que suma temperatura al proceso
        // -> lo que baja temperatura -> BARRAS
        for (let barra of this.barras) {
            if (barra.getEstado() === "ENCENDIDA") {
                temperatura += barra.getPotencia();
            }
        }
    
        this._sensorTermico.temperatura = temperatura;
    
    }

    public activarModoEnfriamiento(): void {
        this._sistemaRegulacionTermica.encender();
    }

    public toString(): string {
        return "Critico";
    }
}