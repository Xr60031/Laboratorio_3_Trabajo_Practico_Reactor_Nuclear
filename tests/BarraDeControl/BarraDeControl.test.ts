import * as MOCKS from "./mocks"
import BarraDeControl from "../../src/SistemaDeRefrigeracion/BarraDeControl/BarraDeControl";
import ExceptionTemperaturaNormal from "../../src/SistemaDeRefrigeracion/Exceptions/ExceptionTemperaturaNormal";
import ExceptionVidaUtilInvalida from "../../src/SistemaDeRefrigeracion/Exceptions/ExceptionVidaUtilInvalida";

describe("Tests barras de control", () =>{

    let barraControl:BarraDeControl=new BarraDeControl();
    
    it("Prueba setVidaUtil y getVidaUtil", ()=>{
        barraControl.setVidaUtil(75);
        expect(barraControl.getVidaUtil()).toBe(75);
    })

    it("Prueba controlarVidaUtil casoVidaUtil>200", () =>{
        try{
            barraControl.controlarVidaUtil(220);
        }
        catch(VidaInvalida){
            expect(VidaInvalida).toBeInstanceOf(ExceptionVidaUtilInvalida);
        }
    })

    it("Prueba controlarTemperatura casoTemperatura>330", ()=>{
        MOCKS.getTemperaturaMock.getTemperatura=jest.fn().mockReturnValueOnce(331);
        barraControl.controlarEnergiaTermica(MOCKS.getTemperaturaMock.getTemperatura());
        expect(barraControl.getEstado()).toBe(true);
    })

    it("Prueba controlarTemperatura casoTemperatura=330", ()=>{
        MOCKS.getTemperaturaMock.getTemperatura=jest.fn().mockReturnValueOnce(330);
        try{
            barraControl.controlarEnergiaTermica(MOCKS.getTemperaturaMock.getTemperatura());
        }
        catch (TemperaturaNormal){
            expect(TemperaturaNormal).toBeInstanceOf(ExceptionTemperaturaNormal);
        }
    })

    it("Prueba controlarTemperatura casoTemperatura=330", ()=>{
        MOCKS.getTemperaturaMock.getTemperatura=jest.fn().mockReturnValueOnce(329);
        try{
            barraControl.controlarEnergiaTermica(MOCKS.getTemperaturaMock.getTemperatura());
        }
        catch (TemperaturaNormal){
            expect(TemperaturaNormal).toBeInstanceOf(ExceptionTemperaturaNormal);
        }
    })

    it("Pruba getPorcentajeProduccion cuando vida util=0", ()=>{
        barraControl.setVidaUtil(0);
        expect(barraControl.getPorcentajeProduccion()).toBe(0);
    })

    it("Pruba getPorcentajeProduccion cuando vida util=50", ()=>{
        barraControl.setVidaUtil(50);
        expect(barraControl.getPorcentajeProduccion()).toBe((50/3600)*100);
    })

    it("Pruba getPorcentajeProduccion cuando vida util=100", ()=>{
        barraControl.setVidaUtil(100);
        expect(barraControl.getPorcentajeProduccion()).toBe((100/3600)*100);
    })

    it("Pruba getPorcentajeProduccion cuando vida util=150", ()=>{
        barraControl.setVidaUtil(150);
        expect(barraControl.getPorcentajeProduccion()).toBe((150/3600)*100);
    })

    it("Pruba getPorcentajeProduccion cuando vida util=200", ()=>{
        barraControl.setVidaUtil(200);
        expect(barraControl.getPorcentajeProduccion()).toBe((200/3600)*100);
    })

    it("Pruba getPorcentajeProduccion cuando vida util=-1", ()=>{
        try{
            barraControl.setVidaUtil(-1);
        }
        catch(VidaUtil){
            expect(VidaUtil).toBeInstanceOf(ExceptionVidaUtilInvalida);
        }
    })

    it("Pruba getPorcentajeProduccion cuando vida util=201", ()=>{
        try{
            barraControl.setVidaUtil(201);
        }
        catch(VidaUtil){
            expect(VidaUtil).toBeInstanceOf(ExceptionVidaUtilInvalida);
        }
    })
})