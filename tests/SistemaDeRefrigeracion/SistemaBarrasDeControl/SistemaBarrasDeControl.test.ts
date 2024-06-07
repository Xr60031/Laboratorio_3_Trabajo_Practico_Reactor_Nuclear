import * as MOCK from "./mocks"
import ExceptionTemperaturaNormal from "../../../src/SistemaDeRefrigeracion/ExceptionsBarras/ExceptionTemperaturaNormal";
import SistemaBarrasDeControl from "../../../src/SistemaDeRefrigeracion/SistemaBarrasDeControl/SistemaBarrasDeControl";
import ExceptionSinBarras from "../../../src/SistemaDeRefrigeracion/ExceptionsBarras/ExceptionSinBarras";

describe("Tests para el sistema de barras de control", () =>{

    let sistemaBarras:SistemaBarrasDeControl;
    
    beforeEach(()=>{
        sistemaBarras=new SistemaBarrasDeControl();
    })

    it("Prueba para enencder el sistema de refrigeracion cuando la temperatura es mayor a 330", ()=>{
        sistemaBarras.addBarra(MOCK.BarraDeControlMocks);
        MOCK.ReactorMocks.getTemperatura=jest.fn().mockReturnValueOnce(331);
        sistemaBarras.controlarEnergiaTermica(MOCK.ReactorMocks.getTemperatura());
        expect(sistemaBarras.getEstado()).toBeTruthy();
    })

    it("Prueba para enencder el sistema de refrigeracion cuando la temperatura es igual a 330", ()=>{
        sistemaBarras.addBarra(MOCK.BarraDeControlMocks);
        MOCK.ReactorMocks.getTemperatura=jest.fn().mockReturnValueOnce(330);
        sistemaBarras.controlarEnergiaTermica(MOCK.ReactorMocks.getTemperatura());
        expect(sistemaBarras.getEstado()).toBeTruthy();
    })

    it("Prueba para enencder el sistema de refrigeracion cuando la temperatura es menor a 330", ()=>{
        sistemaBarras.addBarra(MOCK.BarraDeControlMocks);
        MOCK.ReactorMocks.getTemperatura=jest.fn().mockReturnValueOnce(329);
        try{
            sistemaBarras.controlarEnergiaTermica(MOCK.ReactorMocks.getTemperatura());
        }
        catch (TemperaturaNormal){
            expect(TemperaturaNormal).toBeInstanceOf(ExceptionTemperaturaNormal);
        }
    })

    it("Prueba para obtener el porcentaje de produccion cuando vida util es 200", ()=>{
        let barraNew=MOCK.BarraDeControlMocks;
        sistemaBarras.addBarra(barraNew);
        expect(sistemaBarras.getPorcentajeProduccion()).toBe(200/3600);
    })

    it("Prueba para añadir una barra de control del sistema", ()=>{
        const barraNew=MOCK.BarraDeControlMocks
        sistemaBarras.addBarra(barraNew);
        const barraBuscada=sistemaBarras.getBarras().find(obj => obj.getNroSerie()===barraNew.getNroSerie());
        expect(barraBuscada!.getNroSerie()).toBe(1);
    })

    it("Prueba para remover una barra de control del sistema", ()=>{
        sistemaBarras.addBarra(MOCK.BarraDeControlMocks);
        sistemaBarras.removeBarra();
        expect(sistemaBarras.getBarras().length).toBe(0);
    })

    it("Prueba para remover una barra de control del sistema y que no hayan para sacar", ()=>{
        try{
            sistemaBarras.removeBarra();
        }
        catch (SinBarras){
            expect(SinBarras).toBeInstanceOf(ExceptionSinBarras);
        }
        
    })

    it("Prueba para obtener la barra que se esta utilizando actualmente", ()=>{
        const barraNew=MOCK.BarraDeControlMocks;
        sistemaBarras.addBarra(barraNew);
        expect(sistemaBarras.getBarraActual()).toBe(barraNew);
    })

    it("Prueba para obtener la barra que se esta utilizando actualmente, pero no hay barras en sistema", ()=>{
        try{
            sistemaBarras.getBarraActual();
        }
        catch(VectorVacio){
            expect(VectorVacio).toBeInstanceOf(ExceptionSinBarras);
        }
    })

    it("Prueba para obtener la energia termica cuando se utilizan las barras de control", ()=>{
        sistemaBarras.addBarra(MOCK.BarraDeControlMocks);
        sistemaBarras.encenderSistema();
        expect(sistemaBarras.getEnergiaTermica(2500)).toBe(2500*(200/3600));
    })
})