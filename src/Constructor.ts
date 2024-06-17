import CentralNuclear from "./CentralNuclear/CentralNuclear";
import { BARRA_VIDA_MAX } from "./Constantes";
import Generador from "./Generadores/GeneradorElectrico/Generador";
import CombustibleNuclear from "./Generadores/Reactor/Combustible/CombustibleNuclear";
import Uranio from "./Generadores/Reactor/Combustible/Uranio";
import Estado from "./Generadores/Reactor/Estados/Estado";
import Reactor from "./Generadores/Reactor/Reactor";
import SensorTermico from "./Generadores/Reactor/SensorTermico";
import BarraDeControl from "./SistemaDeRegulacionTermica/BarraDeControl/BarraDeControl";
import SistemaDeRegulacionTermica from "./SistemaDeRegulacionTermica/ClasesAbstractas/SistemaDeRegulacionTermica";
import SistemaBarrasDeControl from "./SistemaDeRegulacionTermica/SistemaBarrasDeControl/SistemaBarrasDeControl";

export default class ConstructorCentralNuclear{


crearCentral(cantBarras? : number, temperatura? : number) : CentralNuclear{
    let central = CentralNuclear.getInstance(
        this.reactor(
            this.combustible(),
            cantBarras ? this.sistemaRegulacionTermica(this.Barras(cantBarras)) : this.sistemaRegulacionTermica(),
            this.sensor(temperatura)),
        this.generador())
    
    
    return central;
}

private generador(){
    return new Generador();
}
private Barras(cantBarras : number){
    
        var barras = new Array<BarraDeControl>
        for (let i = 0; i < cantBarras; i++) {
            barras.push(new BarraDeControl(i, BARRA_VIDA_MAX))
        }
        return barras;
    
   
    
}
private sistemaRegulacionTermica(): SistemaBarrasDeControl;
private sistemaRegulacionTermica(barrasDeControl:Array<BarraDeControl>): SistemaBarrasDeControl;
private sistemaRegulacionTermica(barrasDeControl?:Array<BarraDeControl>): SistemaBarrasDeControl{
    if(barrasDeControl){
        return new SistemaBarrasDeControl(barrasDeControl);
    }
    return new SistemaBarrasDeControl();
}
private reactor(
    combustible : CombustibleNuclear, 
    sistema : SistemaDeRegulacionTermica,
    sensor : SensorTermico,
    )
{
    return Reactor.getInstance(combustible, sistema, sensor);
}
private combustible(){
    return new Uranio(500, 1000);
}
private sensor(temperatura? : number){
    return new SensorTermico(temperatura);
}




}