import * as MOCK from "./mocks"
import ExceptionTemperaturaNormal from "../../../src/SistemaDeRegulacionTermica/ExceptionsBarras/ExceptionTemperaturaNormal";
import SistemaBarrasDeControl from "../../../src/SistemaDeRegulacionTermica/SistemaBarrasDeControl/SistemaBarrasDeControl";
import ExceptionSinBarras from "../../../src/SistemaDeRegulacionTermica/ExceptionsBarras/ExceptionSinBarras";
import { BARRA_VIDA_MAX, DIVISOR_PRODUCCION_ENERGIA_TERMICA } from "../../../src/Constantes";
import ExceptionSistemaYaEncendido from "../../../src/SistemaDeRegulacionTermica/ExceptionsBarras/ExceptionSistemaYaEncendido";
import ExceptionSistemaYaApagado from "../../../src/SistemaDeRegulacionTermica/ExceptionsBarras/ExceptionSistemaYaApagado";

describe("Tests para el sistema de barras de control", () =>{

    let sistemaBarras:SistemaBarrasDeControl;
    
    beforeEach(()=>{
        sistemaBarras=new SistemaBarrasDeControl();
    })

    it("Se intenta enencder el sistema de refrigeracion cuando la temperatura es mayor a 330", ()=>{
        sistemaBarras.addBarra(MOCK.BarraDeControlMocks);
        MOCK.ReactorMocks.getTemperatura=jest.fn().mockReturnValueOnce(331);
        sistemaBarras.verificadorParaEncender(MOCK.ReactorMocks.getTemperatura());
        expect(sistemaBarras.getEstado()).toBeTruthy();
    })

    it("Se intenta enencder el sistema de refrigeracion cuando la temperatura es igual a 330", ()=>{
        sistemaBarras.addBarra(MOCK.BarraDeControlMocks);
        MOCK.ReactorMocks.getTemperatura=jest.fn().mockReturnValueOnce(330);
        sistemaBarras.verificadorParaEncender(MOCK.ReactorMocks.getTemperatura());
        expect(sistemaBarras.getEstado()).toBeTruthy();
    })

    it("Se intenta enencder el sistema de refrigeracion cuando la temperatura es menor a 330", ()=>{
        sistemaBarras.addBarra(MOCK.BarraDeControlMocks);
        MOCK.ReactorMocks.getTemperatura=jest.fn().mockReturnValueOnce(329);
        try{
            sistemaBarras.verificadorParaEncender(MOCK.ReactorMocks.getTemperatura());
        }
        catch (TemperaturaNormal){
            expect(TemperaturaNormal).toBeInstanceOf(ExceptionTemperaturaNormal);
        }
    })

    it("Se apaga el sistema de refrigeracion", ()=>{
        sistemaBarras.encenderSistema();
        sistemaBarras.apagarSistema();
        expect(sistemaBarras.getEstado()).toBeFalsy();
    })

    it("Se intenta prender el sistema de refrigeracion cuando ya se encuentra prendido, deveria lanzar una excepcion", ()=>{
        sistemaBarras.encenderSistema();
        try{
            sistemaBarras.encenderSistema();
        }
        catch(ErrorYaEncendido){
            expect(ErrorYaEncendido).toBeInstanceOf(ExceptionSistemaYaEncendido);
        }
    })

    it("Se intenta de apagar el sistema de refrigeracion cuando ya se encuentra apagado", ()=>{
        try{
            sistemaBarras.apagarSistema();
        }
        catch(ErrorYaApagado){
            expect(ErrorYaApagado).toBeInstanceOf(ExceptionSistemaYaApagado);
        }
    })

    it("Se obtiene el porcentaje de produccion cuando vida util es 200", ()=>{
        let barraNew=MOCK.BarraDeControlMocks;
        sistemaBarras.addBarra(barraNew);
        expect(sistemaBarras.getPorcentajeReduccion()).toBe(200/DIVISOR_PRODUCCION_ENERGIA_TERMICA);
    })

    it("Se añade una barra de control del sistema", ()=>{
        const barraNew=MOCK.BarraDeControlMocks
        sistemaBarras.addBarra(barraNew);
        const barraBuscada=sistemaBarras.getBarras().find(obj => obj.getNroSerie()===barraNew.getNroSerie());
        expect(barraBuscada!.getNroSerie()).toBe(1);
    })

    it("Se remueve una barra de control del sistema", ()=>{
        sistemaBarras.addBarra(MOCK.BarraDeControlMocks);
        sistemaBarras.removeBarra();
        expect(sistemaBarras.getBarras().length).toBe(0);
    })

    it("Se remueve una barra de control del sistema y que no hayan para sacar", ()=>{
        try{
            sistemaBarras.removeBarra();
        }
        catch (SinBarras){
            expect(SinBarras).toBeInstanceOf(ExceptionSinBarras);
        }
        
    })

    it("Se busca la barra que se esta utilizando actualmente por el sistema de barras de control", ()=>{
        const barraNew=MOCK.BarraDeControlMocks;
        sistemaBarras.addBarra(barraNew);
        expect(sistemaBarras.getBarraActual()).toBe(barraNew);
    })

    it("Se intenta obtener la barra que se esta utilizando actualmente, pero no hay barras en sistema", ()=>{
        try{
            sistemaBarras.getBarraActual();
        }
        catch(VectorVacio){
            expect(VectorVacio).toBeInstanceOf(ExceptionSinBarras);
        }
    })

    it("Se busca obtener la energia termica cuando se utilizan las barras de control", ()=>{
        sistemaBarras.addBarra(MOCK.BarraDeControlMocks);
        sistemaBarras.encenderSistema();
        expect(sistemaBarras.getEnergiaTermica(2500)).toBe(2500*(1-(BARRA_VIDA_MAX/DIVISOR_PRODUCCION_ENERGIA_TERMICA)));
    })

    it("Se prueba el correcto funcionamiento de la funcion actualizar", ()=>{
        sistemaBarras.actualizar(MOCK.ComputadoraMocks);
        expect(sistemaBarras.getEstado()).toBeTruthy();
    })
})