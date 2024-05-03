import * as MOCKS from "./mocks"

describe("Tests barras de control", () =>{

    let barraControl:BarraDeControl;
    
    it("Prueba setVidaUtil y getVidaUtil", ()=>{
        barraControl.setVidaUtil(75);
        expect(barraControl.getVidaUtil()).toBe(75);
    })

    it("Prueba controlarTemperatura casoTemperatura>330", ()=>{
        MOCKS.getTemperaturaMock.getTemperatura=jest.fn().mockReturnValueOnce(331);("Se activo la medida de regulacion de temperatura, la cual fue estabilizada exitosamente");
        expect(barraControl.controlarTemperatura(MOCKS.getTemperaturaMock.getTemperatura())).toBe;
    })

    it("Prueba controlarTemperatura casoTemperatura=330", ()=>{
        MOCKS.getTemperaturaMock.getTemperatura=jest.fn().mockReturnValueOnce(330);
        expect(barraControl.controlarTemperatura(MOCKS.getTemperaturaMock.getTemperatura())).toBe("La temperatura del reactor se encuentra normal, no se realizaron medidas");
    })

    it("Prueba controlarTemperatura casoTemperatura<330", ()=>{
        MOCKS.getTemperaturaMock.getTemperatura=jest.fn().mockReturnValueOnce(329);
        expect(barraControl.controlarTemperatura(MOCKS.getTemperaturaMock.getTemperatura())).toBe("La temperatura del reactor se encuentra normal, no se realizaron medidas");
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
        catch(error){
            expect(error).toBe(VidaUtilInvalidaException);
        }
    })

    it("Pruba getPorcentajeProduccion cuando vida util=201", ()=>{
        try{
            barraControl.setVidaUtil(201);
        }
        catch(error){
            expect(error).toBe(VidaUtilInvalidaException);
        }
    })
})