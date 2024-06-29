import CentralNuclear from "./CentralNuclear/CentralNuclear";
import { BARRA_VIDA_MAX, CANTIDAD_COMBUSTIBLE_CONSTRUCTOR, LIMITE_COMBUSTIBLE_CONSTRUCTOR } from "./Constantes";
import Generador from "./Generadores/GeneradorElectrico/Generador";
import CombustibleNuclear from "./Generadores/Reactor/Combustible/CombustibleNuclear";
import Uranio from "./Generadores/Reactor/Combustible/Uranio";
import Reactor from "./Generadores/Reactor/Reactor";
import SensorTermico from "./Generadores/Reactor/SensorTermico";
import BarraDeControl from "./SistemaDeRegulacionTermica/BarraDeControl/BarraDeControl";
import SistemaDeRegulacionTermica from "./SistemaDeRegulacionTermica/ClasesAbstractas/SistemaDeRegulacionTermica";
import SistemaBarrasDeControl from "./SistemaDeRegulacionTermica/SistemaBarrasDeControl/SistemaBarrasDeControl";

export default class ConstructorCentralNuclear {


    crearCentral(cantBarras?: number): CentralNuclear {
        let central = new CentralNuclear(
            this.reactor(
                this.combustible(),
                cantBarras ? this.sistemaRegulacionTermica(this.Barras(cantBarras)) : this.sistemaRegulacionTermica(),
                this.sensor()),
            this.generador())


        return central;
    }

    private generador() {
        return new Generador();
    }
    private Barras(cantBarras: number) {

        var barras = new Array<BarraDeControl>
        for (let i = 0; i < cantBarras; i++) {
            barras.push(new BarraDeControl(i, BARRA_VIDA_MAX))
        }
        return barras;



    }
    private sistemaRegulacionTermica(): SistemaBarrasDeControl;
    private sistemaRegulacionTermica(barrasDeControl: Array<BarraDeControl>): SistemaBarrasDeControl;
    private sistemaRegulacionTermica(barrasDeControl?: Array<BarraDeControl>): SistemaBarrasDeControl {
        if (barrasDeControl) {
            return new SistemaBarrasDeControl(barrasDeControl);
        }
        return new SistemaBarrasDeControl();
    }

    private reactor(
        combustible: CombustibleNuclear,
        sistema: SistemaDeRegulacionTermica,
        sensor: SensorTermico,
    ) {
        return new Reactor(combustible, sistema, sensor);
    }
    private combustible() {
        return new Uranio(CANTIDAD_COMBUSTIBLE_CONSTRUCTOR, LIMITE_COMBUSTIBLE_CONSTRUCTOR);
    }
    private sensor() {
        return new SensorTermico();
    }




}