import BarraDeControl from "../../../src/SistemaDeRefrigeracion/BarraDeControl/BarraDeControl";
import ExceptionVidaUtilInvalida from "../../../src/SistemaDeRefrigeracion/ExceptionsBarras/ExceptionVidaUtilInvalida";

describe("Tests barras de control", () =>{

    let barraControl:BarraDeControl;

    beforeEach(()=>{
        barraControl=new BarraDeControl();
    })
    
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

    it("Prueba controlarVidaUtil casoVidaUtil<0", () =>{
        try{
            barraControl.controlarVidaUtil(220);
        }
        catch(VidaInvalida){
            expect(VidaInvalida).toBeInstanceOf(ExceptionVidaUtilInvalida);
        }
    })

    it("Prueba desgaste barra vida util", () =>{
        barraControl.setVidaUtil(200);
        expect(barraControl.desgasteBarraVidaUtil()).toBe(150);    
    })

})