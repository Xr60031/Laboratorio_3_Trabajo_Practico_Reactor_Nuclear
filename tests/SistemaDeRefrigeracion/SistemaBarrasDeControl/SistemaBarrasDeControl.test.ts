import * as MOCKS from "./mocks"
import ExceptionTemperaturaNormal from "../../../src/SistemaDeRefrigeracion/Exceptions/ExceptionTemperaturaNormal";
import SistemaBarrasDeControl from "../../../src/SistemaDeRefrigeracion/SistemaBarrasDeControl/SistemaBarrasDeControl";
import BarraDeControl from "../../../src/SistemaDeRefrigeracion/BarraDeControl/BarraDeControl";
import ExceptionSinBarras from "../../../src/SistemaDeRefrigeracion/Exceptions/ExceptionSinBarras";

describe("Tests Sistema de barras de control", () =>{

    let sistemaBarras:SistemaBarrasDeControl=new SistemaBarrasDeControl();

    it("Prueba controlarTemperatura casoTemperatura>330", ()=>{
        MOCKS.BarrasMocks.getTemperatura=jest.fn().mockReturnValueOnce(331);
        sistemaBarras.controlarEnergiaTermica(MOCKS.BarrasMocks.getTemperatura());
        expect(sistemaBarras.getEstado()).toBe(true);
    })

    it("Prueba controlarTemperatura casoTemperatura=330", ()=>{
        MOCKS.BarrasMocks.getTemperatura=jest.fn().mockReturnValueOnce(330);
        try{
            sistemaBarras.controlarEnergiaTermica(MOCKS.BarrasMocks.getTemperatura());
        }
        catch (TemperaturaNormal){
            expect(TemperaturaNormal).toBeInstanceOf(ExceptionTemperaturaNormal);
        }
    })

    it("Prueba controlarTemperatura casoTemperatura=330", ()=>{
        MOCKS.BarrasMocks.getTemperatura=jest.fn().mockReturnValueOnce(329);
        try{
            sistemaBarras.controlarEnergiaTermica(MOCKS.BarrasMocks.getTemperatura());
        }
        catch (TemperaturaNormal){
            expect(TemperaturaNormal).toBeInstanceOf(ExceptionTemperaturaNormal);
        }
    })

    it("Pruba getPorcentajeProduccion cuando vida util=100", ()=>{
        sistemaBarras.getBarras()!.splice(0, sistemaBarras.getBarras()!.length);
        sistemaBarras.addBarra(new BarraDeControl(0, 100));
        expect(sistemaBarras.getPorcentajeProduccion()).toBe((100/3600)*100);
    })

    it("Pruba addBarra", ()=>{
        sistemaBarras.getBarras()!.splice(0, sistemaBarras.getBarras()!.length);
        sistemaBarras.addBarra(new BarraDeControl(12345, 200));
        const barraBuscada=sistemaBarras.getBarras()!.find(obj => obj.getNroSerie()===12345);
        expect(barraBuscada!.getNroSerie()).toBe(12345);
    })

    it("Prueba removeBarra, caso válido", ()=>{
        sistemaBarras.getBarras()!.splice(0, sistemaBarras.getBarras()!.length);
        sistemaBarras.addBarra(new BarraDeControl(12345, 200));
        const barraActual=sistemaBarras.getBarraActual();
        sistemaBarras.removeBarra();
        expect(sistemaBarras.getBarraActual()).toBe(undefined);
    })

    it("Prueba removeBarra, caso inválido", ()=>{
        sistemaBarras.getBarras()!.splice(0, sistemaBarras.getBarras()!.length);
        try{
            sistemaBarras.removeBarra();
        }
        catch (SinBarras){
            expect(SinBarras).toBeInstanceOf(ExceptionSinBarras);
        }
        
    })

    it("Prueba getBarraActual, caso válido", ()=>{
        sistemaBarras.getBarras()!.splice(0, sistemaBarras.getBarras()!.length);
        const barraNew=new BarraDeControl(1,200)
        sistemaBarras.addBarra(barraNew);
        expect(sistemaBarras.getBarraActual()).toBe(barraNew);
    })

    it("Prueba getBarraActual, caso inválido", ()=>{
        sistemaBarras.getBarras()!.splice(0, sistemaBarras.getBarras()!.length);
        try{
            sistemaBarras.getBarraActual();
        }
        catch(VectorVacio){
            expect(VectorVacio).toBeInstanceOf(ExceptionSinBarras);
        }
    })

    it("Prueba getEnergiaTermica", ()=>{
        sistemaBarras.getBarras()!.splice(0, sistemaBarras.getBarras()!.length);
        sistemaBarras.addBarra(new BarraDeControl());
        expect(sistemaBarras.getEnergiaTermica(MOCKS.BarrasMocks.getEnergia())).toBe(200*200);
    })
})