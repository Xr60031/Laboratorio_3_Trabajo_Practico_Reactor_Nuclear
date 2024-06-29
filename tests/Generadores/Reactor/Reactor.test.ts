import { MULTIPLICADOR_ENERGIA_TERMICA } from "../../../src/Constantes";
import Reactor from "../../../src/Generadores/Reactor/Reactor";
import * as MOCK from "./mocks";

describe("Reactor", () => {
    let instancia: Reactor;

    beforeEach(() => {
        instancia = new Reactor(MOCK.CombustibleMock, MOCK.SistemaMock, MOCK.SensorMock);
    });

    describe("Getters y Setters", () => {
        it("Debería llamar a getSensorTermico() y obtener algo de tipo SensorTermico", () => {
            expect(instancia.getSensorTermico()).toBe(MOCK.SensorMock);
        });

        it("Debería llamar a getSistemaDeRegulacionTermica() y obtener algo de tipo SistemaDeRegulacionTermica", () => {
            expect(instancia.getSistemaDeRegulacionTermica()).toBe(MOCK.SistemaMock);
        });

        it("Debería llamar a getCombustible() y obtener algo de tipo CombustibleNuclear", () => {
            expect(instancia.getCombustible()).toBe(MOCK.CombustibleMock);
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
            expect((instancia as any)['estado']).toBe(MOCK.EstadoMock);
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
        it("Debería llamar a CombustibleNuclear.consumir(), a SistemaDeRegulacionTermica.getEnergiaTermica(), y a SensorTermico.medir()", () => {
            MOCK.CombustibleMock.consumir = jest.fn().mockReturnValueOnce(instancia.getConsumoCombustible() * MULTIPLICADOR_ENERGIA_TERMICA);
            MOCK.SistemaMock.getEnergiaTermica = jest.fn().mockReturnValueOnce(instancia.getConsumoCombustible() * MULTIPLICADOR_ENERGIA_TERMICA);
            const spy1 = jest.spyOn(MOCK.CombustibleMock, "consumir");
            const spy2 = jest.spyOn(MOCK.SistemaMock, "getEnergiaTermica");
            const spy3 = jest.spyOn(MOCK.SensorMock, "medir");
            instancia.consumirCombustible(instancia.getConsumoCombustible());
            expect(spy1).toHaveBeenCalled();
            expect(spy2).toHaveBeenCalled();
            expect(spy3).toHaveBeenCalled();
        });

        it("Debería sumarle el consumo por el multiplicador a la energia termica del reactor", () => {
            MOCK.CombustibleMock.consumir = jest.fn().mockReturnValueOnce(instancia.getConsumoCombustible() * MULTIPLICADOR_ENERGIA_TERMICA);
            MOCK.SistemaMock.getEnergiaTermica = jest.fn().mockReturnValueOnce(instancia.getConsumoCombustible() * MULTIPLICADOR_ENERGIA_TERMICA);
            const energiaTermicaPrevia = instancia.getEnergiaTermica();
            instancia.consumirCombustible(instancia.getConsumoCombustible());
            expect(instancia.getEnergiaTermica()).toBe(energiaTermicaPrevia + instancia.getConsumoCombustible() * MULTIPLICADOR_ENERGIA_TERMICA);
        });
    });

    describe("Get Adicional Energia", () => {
        it("Debería llamar a CombustibleNuclear.consumir() y devolver el consumo por el multiplicador", () => {
            MOCK.CombustibleMock.consumir = jest.fn().mockReturnValueOnce(instancia.getConsumoCombustible() * MULTIPLICADOR_ENERGIA_TERMICA);
            const spy = jest.spyOn(MOCK.CombustibleMock, "consumir");
            expect(instancia.getAdicionalEnergia()).toBe(instancia.getConsumoCombustible() * MULTIPLICADOR_ENERGIA_TERMICA);
            expect(spy).toHaveBeenCalled();
        });
    });
})