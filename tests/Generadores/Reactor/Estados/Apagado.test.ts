import Apagado from "../../../../src/Generadores/Reactor/Estados/Apagado";
import * as MOCK from "./mocks";
import NoHayCombustibleExcepcion from "../../../../src/Generadores/Reactor/Combustible/ExcepcionesCombustible/NoHayCombustibleExcepcion";
import AccionInvalidaException from "../../../../src/Generadores/Reactor/ExcepcionesReactor/AccionInvalidaException";
import DatosEnTodoMomento from "../../../../src/CentralNuclear/DatosEnTodoMomento";
import * as MOCK2 from "../mocks";

describe("Apagado", () => {
    let instancia:Apagado;

    beforeEach(()=>{
        instancia = new Apagado();
        instancia.setReactor(MOCK.ReactorMock);
    });

    describe("Set Reactor", () => {
        it("Debería establecer el reactor", () => {
            instancia.setReactor(MOCK.ReactorMock);
            expect((instancia as any) ['reactor']).toBe(MOCK.ReactorMock);
        });
    });

    describe("Iniciar", ()=>{
        it("Debería llamar a Reactor.cambiarA(), y DatosEnTodoMomento.contarNormal()", () => {
            MOCK.ReactorMock.getCombustible=jest.fn().mockReturnValueOnce(MOCK2.CombustibleMock);
            MOCK2.CombustibleMock.tieneCombustible=jest.fn().mockReturnValueOnce(true);
            const spy1 = jest.spyOn(MOCK.ReactorMock, "cambiarA");
            const spy2 = jest.spyOn(DatosEnTodoMomento.getInstance(), "contarNormal");
            const spy3 = jest.spyOn(MOCK.ReactorMock, "consumirCombustible");
            instancia.iniciar();
            expect(spy1).toHaveBeenCalled();
            expect(spy2).toHaveBeenCalled();
            expect(spy3).toHaveBeenCalled();
        });

        it("Debería lanzar una excepcion cuando se intenta iniciar el reactor sin combustible", ()=>{
            MOCK.ReactorMock.getCombustible=jest.fn().mockReturnValueOnce(MOCK2.CombustibleMock);
            MOCK2.CombustibleMock.tieneCombustible=jest.fn().mockReturnValueOnce(false);
            try{
                instancia.iniciar();
            }
            catch(e){
                expect(e).toBeInstanceOf(NoHayCombustibleExcepcion);
            }
        });
    });

    describe("Detener", () => {
        it("Debería lanzar una excepcion de accion invalida", ()=>{
            try{
                instancia.detener();
            }
            catch(e){
                expect(e).toBeInstanceOf(AccionInvalidaException);
            }
        });
    });

    describe("Procesar energia termica", ()=>{
        //instancia.procesarEnergiaTermica();
    });



    /*
    public iniciar(): void {
        if (!this.reactor.getCombustible().tieneCombustible()) {
            throw new NoHayCombustibleExcepcion(
                "No hay combustible para iniciar el reactor."
            );
        }

        this.precalentarReactor();
        this.reactor.cambiarA(new Normal());
        DatosEnTodoMomento.getInstance().contarNormal();
    }

    public procesarEnergiaTermica(): void {
        this.reducirEnergiaTermica();

        if (TEMPERATURA_CRITICO >= this.reactor.getEnergiaTermica()) {
            this.iniciar();
        }
    }
    */
})