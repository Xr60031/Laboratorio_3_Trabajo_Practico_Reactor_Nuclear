import Apagado from "../../../../src/Generadores/Reactor/Estados/Apagado";
import NoHayCombustibleExcepcion from "../../../../src/Generadores/Reactor/Combustible/ExcepcionesCombustible/NoHayCombustibleExcepcion";
import AccionInvalidaException from "../../../../src/Generadores/Reactor/ExcepcionesReactor/AccionInvalidaException";
import DatosEnTodoMomento from "../../../../src/CentralNuclear/DatosEnTodoMomento";
import * as MOCK from "./mocks";
import * as MOCK2 from "../mocks";

describe("Apagado", () => {
    let instancia: Apagado;

    beforeEach(() => {
        instancia = new Apagado();
        instancia.setReactor(MOCK.ReactorMock);
    });

    describe("Set Reactor", () => {
        it("Debería establecer el reactor", () => {
            instancia.setReactor(MOCK.ReactorMock);
            expect((instancia as any)['reactor']).toBe(MOCK.ReactorMock);
        });
    });

    describe("Iniciar", () => {
        it("Debería llamar a Reactor.cambiarA(), y DatosEnTodoMomento.contarNormal()", () => {
            MOCK.ReactorMock.getCombustible = jest.fn().mockReturnValue(MOCK2.CombustibleMock);
            MOCK2.CombustibleMock.tieneCombustible = jest.fn().mockReturnValue(true);
            const spy1 = jest.spyOn(MOCK.ReactorMock, "cambiarA");
            const spy2 = jest.spyOn(DatosEnTodoMomento.getInstance(), "contarNormal");
            const spy3 = jest.spyOn(MOCK.ReactorMock, "consumirCombustible");
            instancia.iniciar();
            expect(spy1).toHaveBeenCalled();
            expect(spy2).toHaveBeenCalled();
            expect(spy3).toHaveBeenCalled();
        });

        it("Debería lanzar una excepcion cuando se intenta iniciar el reactor sin combustible", () => {
            MOCK.ReactorMock.getCombustible = jest.fn().mockReturnValue(MOCK2.CombustibleMock);
            MOCK2.CombustibleMock.tieneCombustible = jest.fn().mockReturnValue(false);
            try {
                instancia.iniciar();
            }
            catch (e) {
                expect(e).toBeInstanceOf(NoHayCombustibleExcepcion);
            }
        });
    });

    describe("Detener", () => {
        it("Debería lanzar una excepcion de accion invalida", () => {
            try {
                instancia.detener();
            }
            catch (e) {
                expect(e).toBeInstanceOf(AccionInvalidaException);
            }
        });
    });

    describe("Procesar energia termica", () => {
        it("Debería reducir la energia termica del reactor y llamar a SensorTermico.medir()", () => {
            MOCK.ReactorMock.getEnergiaTermica = jest.fn().mockReturnValue(1000);
            MOCK.ReactorMock.getSensorTermico = jest.fn().mockReturnValue(MOCK2.SensorMock);
            MOCK2.SensorMock.getTemperatura = jest.fn().mockReturnValue(350);
            const spy1 = jest.spyOn(MOCK.ReactorMock, "setEnergiaTermica");
            const spy2 = jest.spyOn(MOCK2.SensorMock, "medir");
            instancia.procesarEnergiaTermica();
            expect(spy1).toHaveBeenCalled();
            expect(spy2).toHaveBeenCalled();
        });

        it("Debería iniciar el reactor si la temperatura es menor a la temperatura critica", () => {
            MOCK.ReactorMock.getEnergiaTermica = jest.fn().mockReturnValue(1000);
            MOCK.ReactorMock.getSensorTermico = jest.fn().mockReturnValue(MOCK2.SensorMock);
            MOCK2.SensorMock.getTemperatura = jest.fn().mockReturnValue(100);
            MOCK.ReactorMock.getCombustible = jest.fn().mockReturnValue(MOCK2.CombustibleMock);
            MOCK2.CombustibleMock.tieneCombustible = jest.fn().mockReturnValue(true);
            const spy = jest.spyOn(instancia, "iniciar");
            instancia.procesarEnergiaTermica();
            expect(spy).toHaveBeenCalled();
        });
    });
});