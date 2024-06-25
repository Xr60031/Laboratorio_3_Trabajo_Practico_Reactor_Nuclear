import Estado from "../../../src/Generadores/Reactor/Estados/Estado";
import Reactor from "../../../src/Generadores/Reactor/Reactor";
import * as MOCK from "./mocks";

describe("Reactor", () => {
    let instancia: Reactor;

    beforeEach(() => {
        instancia = new Reactor(MOCK.UranioMock, MOCK.SistemaMock, MOCK.SensorMock);
    });

    describe("Getters y Setters", () => {
        it("Debería llamar a getEstado() y obtener algo de tipo Estado", () => {
            expect(instancia.getEstado()).toBeInstanceOf(Estado);
        });

        it("Debería llamar a getSensorTermico() y obtener algo de tipo SensorTermico", () => {
            expect(instancia.getSensorTermico()).toBe(MOCK.SensorMock);
        });

        it("Debería llamar a getSistemaDeRegulacionTermica() y obtener algo de tipo SistemaDeRegulacionTermica", () => {
            expect(instancia.getSistemaDeRegulacionTermica()).toBe(MOCK.SistemaMock);
        });

        it("Debería llamar a getCombustible() y obtener algo de tipo CombustibleNuclear", () => {
            expect(instancia.getCombustible()).toBe(MOCK.UranioMock);
        });

        it("Debería llamar a getConsumoCombustible() y obtener 1", () => {
            expect(instancia.getConsumoCombustible()).toBe(1);
        });

        it("Debería llamar a getEnergiaTermica() y obtener 0", () => {
            expect(instancia.getEnergiaTermica()).toBe(0);
        });

        it("Debería llamar a setEnergiaTermica() y establcer energiaTermica", () => {
            const TEST_VALUE = 1000;
            instancia.setEnergiaTermica(TEST_VALUE);
            expect(instancia.getEnergiaTermica()).toBe(TEST_VALUE);
        });
    });

    describe("Cambiar A Estado", () => {
        it("Debería cambiar su estado y asociarse a este", () => {
            const spy = jest.spyOn(MOCK.EstadoMock, "setReactor");
            instancia.cambiarA(MOCK.EstadoMock);
            expect(instancia.getEstado()).toBe(MOCK.EstadoMock);
            expect(spy).toHaveBeenCalled();
        });
    });

    describe("Iniciar", () => {
        it("Debería llamar a Estado.iniciar()", () => {
            instancia.cambiarA(MOCK.EstadoMock);
            const spy = jest.spyOn(MOCK.EstadoMock, "iniciar");
            instancia.iniciar();
            expect(spy).toHaveBeenCalled();
        });
    });

    describe("Detener", () => {
        it("Debería llamar a Estado.detener()", () => {
            instancia.cambiarA(MOCK.EstadoMock);
            const spy = jest.spyOn(MOCK.EstadoMock, "detener");
            instancia.detener();
            expect(spy).toHaveBeenCalled();
        });
    });

    describe("Generar Energia Termica", () => {
        it("Debería llamar a Estado.procesarEnergiaTermica() y obtener la energia termica del reactor", () => {
            instancia.cambiarA(MOCK.EstadoMock);
            const spy = jest.spyOn(MOCK.EstadoMock, "procesarEnergiaTermica");
            const energiaTermica = instancia.generarEnergiaTermica();
            expect(spy).toHaveBeenCalled();
            expect(energiaTermica).toBe(instancia.getEnergiaTermica());
        });
    });

    describe("Consumir Combustible", () => {
        
    });

    describe("Get Adicional Energia", () => {
        
    });
})