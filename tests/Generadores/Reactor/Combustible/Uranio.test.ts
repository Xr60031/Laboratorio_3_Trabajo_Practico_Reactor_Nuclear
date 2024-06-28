import Uranio from "../../../../src/Generadores/Reactor/Combustible/Uranio";
import {CANTIDAD_COMBUSTIBLE_CONSTRUCTOR, LIMITE_COMBUSTIBLE_CONSTRUCTOR, MULTIPLICADOR_ENERGIA_TERMICA} from "../../../../src/Constantes";
import NoHaySuficienteCombustibleExcepcion from "../../../../src/Generadores/Reactor/Combustible/ExcepcionesCombustible/NoHaySuficienteCombustibleExcepcion";
import LimiteCombustibleExcepcion from "../../../../src/Generadores/Reactor/Combustible/ExcepcionesCombustible/LimiteCombustibleExcepcion";

describe("Tests para el sistema de barras de control", () =>{
    let instanceUranio:Uranio

    beforeEach(()=>{
        instanceUranio=new Uranio(CANTIDAD_COMBUSTIBLE_CONSTRUCTOR, LIMITE_COMBUSTIBLE_CONSTRUCTOR);
    })

    it("Se prueba que se realice la recarga de combustible exitosamente", () => {
        instanceUranio.recargar(50);
        expect(instanceUranio.getCantidad()).toBe(550);
    })    
    
    it("Se intenta la recarga de combustible en el caso de que pase el limite", () => {
        try {
            instanceUranio.recargar(LIMITE_COMBUSTIBLE_CONSTRUCTOR+1);
        } catch(error) {
            expect(error).toBeInstanceOf(LimiteCombustibleExcepcion);
        }
    })

    it("Se prueba que se realice el consumo del combustible exitosamente", ()=>{
        instanceUranio.consumir(50);
        expect(instanceUranio.getCantidad()).toBe(450);
    })

    it("Se consume el combustible para calcular la energia termica ", ()=>{
        let energiaTermica=instanceUranio.consumir(50);
        expect(energiaTermica).toBe(50*100);
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

    it("Se prueba que si tiene combustible devuelve verdadero", () => {
        expect(instanceUranio.tieneCombustible()).toBeTruthy();
    })

    it("Se prueba que si no tiene combustible devuelve falso", () => {
        instanceUranio.setCantidad(0);
        expect(instanceUranio.tieneCombustible()).toBeFalsy();
    })

    it("Se prueba de obtener la cantidad de combustible", () => {
        expect(instanceUranio.getCantidad()).toBe(CANTIDAD_COMBUSTIBLE_CONSTRUCTOR);
    })

    it("Se prueba de obtener el limite de combustible", () => {
        expect(instanceUranio.getLimite()).toBe(LIMITE_COMBUSTIBLE_CONSTRUCTOR);
    })
})