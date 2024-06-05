import * as mocksReactor from "./mocksReactor"
import ExceptionTemperaturaNormal from "../../../src/SistemaDeRefrigeracion/Exceptions/ExceptionTemperaturaNormal";
import SistemaBarrasDeControl from "../../../src/SistemaDeRefrigeracion/SistemaBarrasDeControl/SistemaBarrasDeControl";
import ExceptionSinBarras from "../../../src/SistemaDeRefrigeracion/Exceptions/ExceptionSinBarras";
import BarraDeControl from "../../../src/SistemaDeRefrigeracion/BarraDeControl/BarraDeControl";

describe("Tests Sistema de barras de control", () =>{

    let sistemaBarras:SistemaBarrasDeControl;
    
    beforeEach(()=>{
        sistemaBarras=new SistemaBarrasDeControl();
    })

    it("Prueba controlarTemperatura casoTemperatura>330", ()=>{
        const barraNew=new BarraDeControl(1,200);
        sistemaBarras.addBarra(barraNew);
        mocksReactor.ReactorMocks.getTemperatura=jest.fn().mockReturnValueOnce(331);
        sistemaBarras.controlarEnergiaTermica(mocksReactor.ReactorMocks.getTemperatura());
        expect(sistemaBarras.getEstado()).toBe(true);
    })

    it("Prueba controlarTemperatura casoTemperatura=330", ()=>{
        const barraNew=new BarraDeControl(1,200);
        sistemaBarras.addBarra(barraNew);
        mocksReactor.ReactorMocks.getTemperatura=jest.fn().mockReturnValueOnce(330);
        try{
            sistemaBarras.controlarEnergiaTermica(mocksReactor.ReactorMocks.getTemperatura());
        }
        catch (TemperaturaNormal){
            expect(TemperaturaNormal).toBeInstanceOf(ExceptionTemperaturaNormal);
        }
    })

    it("Prueba controlarTemperatura casoTemperatura<330", ()=>{
        const barraNew=new BarraDeControl(1,200);
        sistemaBarras.addBarra(barraNew);
        mocksReactor.ReactorMocks.getTemperatura=jest.fn().mockReturnValueOnce(329);
        try{
            sistemaBarras.controlarEnergiaTermica(mocksReactor.ReactorMocks.getTemperatura());
        }
        catch (TemperaturaNormal){
            expect(TemperaturaNormal).toBeInstanceOf(ExceptionTemperaturaNormal);
        }
    })

    it("Pruba getPorcentajeProduccion cuando vida util=100", ()=>{
        const barraNew=new BarraDeControl(1,100);
        sistemaBarras.addBarra(barraNew);
        expect(sistemaBarras.getPorcentajeProduccion()).toBe((100/3600)*100);
    })

    it("Pruba addBarra", ()=>{
        const barraNew=new BarraDeControl(1,200);
        sistemaBarras.addBarra(barraNew);
        const barraBuscada=sistemaBarras.getBarras().find(obj => obj.getNroSerie()===barraNew.getNroSerie());
        expect(barraBuscada!.getNroSerie()).toBe(1);
    })

    it("Prueba removeBarra, caso válido", ()=>{
        const barraNew=new BarraDeControl(1,200);
        sistemaBarras.addBarra(barraNew);
        sistemaBarras.removeBarra();
        expect(sistemaBarras.getBarras().length).toBe(0);
    })

    it("Prueba removeBarra, caso inválido", ()=>{
        try{
            sistemaBarras.removeBarra();
        }
        catch (SinBarras){
            expect(SinBarras).toBeInstanceOf(ExceptionSinBarras);
        }
        
    })

    it("Prueba getBarraActual, caso válido", ()=>{
        const barraNew=new BarraDeControl(1,200);
        sistemaBarras.addBarra(barraNew);
        expect(sistemaBarras.getBarraActual()).toBe(barraNew);
    })

    it("Prueba getBarraActual, caso inválido", ()=>{
        try{
            sistemaBarras.getBarraActual();
        }
        catch(VectorVacio){
            expect(VectorVacio).toBeInstanceOf(ExceptionSinBarras);
        }
    })

    it("Prueba getEnergiaTermica", ()=>{
        sistemaBarras.addBarra(new BarraDeControl(1,200));
        sistemaBarras.encenderSistema();
        expect(sistemaBarras.getEnergiaTermica(2500)).toBe(2500*(200/3600));
    })
})