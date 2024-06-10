import BarraDeControl from "../../../src/SistemaDeRefrigeracion/BarraDeControl/BarraDeControl";
import ExceptionVidaUtilInvalida from "../../../src/SistemaDeRefrigeracion/ExceptionsBarras/ExceptionVidaUtilInvalida";
import { BARRA_VIDA_MAX } from "../../../src/Constantes";

describe("Tests barras de control", () =>{

    let barraControl:BarraDeControl;

    beforeEach(()=>{
        barraControl=new BarraDeControl();
    })

    it("Prueba para obtener la vida util", ()=>{
        expect(barraControl.getVidaUtil()).toBe(BARRA_VIDA_MAX);
    })
    
    it("Prueba para establecer la vida util", ()=>{
        barraControl.setVidaUtil(75);
        expect(barraControl.getVidaUtil()).toBe(75);
    })

    it("Prueba controlar vida util cuando la vida util es mayor a 200", () =>{
        try{
            barraControl.controlarVidaUtil(220);
        }
        catch(VidaInvalida){
            expect(VidaInvalida).toBeInstanceOf(ExceptionVidaUtilInvalida);
        }
    })

    it("Prueba controlar vida util cuando la vida util es menor a 0", () =>{
        try{
            barraControl.controlarVidaUtil(-1);
        }
        catch(VidaInvalida){
            expect(VidaInvalida).toBeInstanceOf(ExceptionVidaUtilInvalida);
        }
    })

    it("Prueba del desgaste de la vida util de la barra de control", () =>{
        barraControl.setVidaUtil(200);
        expect(barraControl.desgasteBarraVidaUtil()).toBe(150);    
    })

    it("Prueba para obtener el numero de serie de una barra de control", ()=>{
        expect(barraControl.getNroSerie()).toBe(0);
    })

    it("Prueba para establecer el numero de serie de una barra de control", ()=>{
        barraControl.setNroSerie(50);
        expect(barraControl.getNroSerie()).toBe(50);
    })

})