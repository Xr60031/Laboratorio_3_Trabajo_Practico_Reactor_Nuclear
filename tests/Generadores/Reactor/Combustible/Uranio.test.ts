import Uranio from "../../../../src/Generadores/Reactor/Combustible/Uranio";
import {CANTIDAD_COMBUSTIBLE_CONSTRUCTOR, LIMITE_COMBUSTIBLE_CONSTRUCTOR, MULTIPLICADOR_ENERGIA_TERMICA} from "../../../../src/Constantes";
import NoHaySuficienteCombustibleExcepcion from "../../../../src/Generadores/Reactor/Combustible/ExcepcionesCombustible/NoHaySuficienteCombustibleExcepcion";

describe("Tests para el sistema de barras de control", () =>{
    let instanceUranio:Uranio

    beforeEach(()=>{
        instanceUranio=new Uranio(CANTIDAD_COMBUSTIBLE_CONSTRUCTOR, LIMITE_COMBUSTIBLE_CONSTRUCTOR);
    })

    it("Se prueba que se realice el consumo del combustible exitosamente", ()=>{
        instanceUranio.consumir(50);
        expect(instanceUranio.getCantidad()).toBe(450);
    })

    it("Se consume el combustible para calcular la energia termica ", ()=>{
        let energiaTermica=instanceUranio.consumir(50);
        expect(energiaTermica).toBe(450*100);
    })

    it("Se calcula la energia termica producida", ()=>{
        let energiaTermica = instanceUranio.calcularEnergiaTermica(instanceUranio.getCantidad());
        expect(energiaTermica).toBe(instanceUranio.getCantidad() * MULTIPLICADOR_ENERGIA_TERMICA);
    })

    it("Se intenta consumir en el caso que no haya combustible", ()=>{
        try{
            instanceUranio.consumir(CANTIDAD_COMBUSTIBLE_CONSTRUCTOR+1);
        }
        catch(NoHaySuficienteCombustible){
            expect(NoHaySuficienteCombustible).toBeInstanceOf(NoHaySuficienteCombustibleExcepcion);
        }
    })
})