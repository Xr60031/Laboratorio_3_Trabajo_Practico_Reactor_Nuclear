import Normal from "../../../../src/Generadores/Reactor/Estados/Normal";
import DatosEnTodoMomento from "../../../../src/CentralNuclear/DatosEnTodoMomento";
import AccionInvalidaException from "../../../../src/Generadores/Reactor/ExcepcionesReactor/AccionInvalidaException";
import * as MOCK from "./mocks";
import * as MOCK2 from "../mocks";

describe("Normal", () => {
    let instancia: Normal;

    beforeEach(() => {
        instancia = new Normal();
        instancia.setReactor(MOCK.ReactorMock);
    })
    
    describe("Set Reactor", () => {
        it("Debería establecer el reactor", () => {
            instancia.setReactor(MOCK.ReactorMock);
            expect((instancia as any) ['reactor']).toBe(MOCK.ReactorMock);
        });
    });
    
    describe("Iniciar", () => {
        it("Debería lanzar una excepcion de acción inválida", () => {
            try{
                instancia.iniciar();
            }
            catch (e) {
                expect(e).toBeInstanceOf(AccionInvalidaException);
            }
        });
    });

    describe("Detener", () => {
        it("Debería llamar a Reactor.cambiarA(), y DatosEnTodoMomento.contarApagado()", () => {
            const spy1 = jest.spyOn(MOCK.ReactorMock, "cambiarA");
            const spy2 = jest.spyOn(DatosEnTodoMomento.getInstance(), "contarApagado");
            instancia.detener();
            expect(spy1).toHaveBeenCalled();
            expect(spy2).toHaveBeenCalled();
        });
    });

    describe("Procesar Energia Termica", () => {
        it("Debería entrar al if", () => {
            MOCK.ReactorMock.getCombustible = jest.fn().mockReturnValueOnce(MOCK2.CombustibleMock);
            MOCK2.CombustibleMock.tieneCombustible = jest.fn().mockReturnValueOnce(false);
            const spy = jest.spyOn(instancia, "detener");
            instancia.procesarEnergiaTermica();
            expect(spy).toHaveBeenCalled();
        });

        it("Debería entrar al else", () => {
            MOCK.ReactorMock.getCombustible = jest.fn().mockReturnValueOnce(MOCK2.CombustibleMock);
            MOCK2.CombustibleMock.tieneCombustible = jest.fn().mockReturnValueOnce(true);
            MOCK.ReactorMock.getSensorTermico = jest.fn().mockReturnValue(MOCK2.SensorMock);
            MOCK2.SensorMock.getTemperatura = jest.fn().mockReturnValueOnce(250);
            const spy1 = jest.spyOn(MOCK.ReactorMock, "getEnergiaTermica");
            const spy2 = jest.spyOn(MOCK.ReactorMock, "getAdicionalEnergia");
            const spy3 = jest.spyOn(MOCK.ReactorMock, "setEnergiaTermica");
            const spy4 = jest.spyOn(MOCK2.SensorMock, "medir");
            const spy5 = jest.spyOn(MOCK2.SensorMock, "getTemperatura");
            instancia.procesarEnergiaTermica();
            expect(spy1).toHaveBeenCalled();
            expect(spy2).toHaveBeenCalled();
            expect(spy3).toHaveBeenCalled();
            expect(spy4).toHaveBeenCalled();
            expect(spy5).toHaveBeenCalled();
        });
    });
});