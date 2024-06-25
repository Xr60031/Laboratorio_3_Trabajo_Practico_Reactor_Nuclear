import Estado from "../../../src/Generadores/Reactor/Estados/Estado";
import Normal from "../../../src/Generadores/Reactor/Estados/Normal";
import Reactor from "../../../src/Generadores/Reactor/Reactor";
import * as MOCK from "./mocks";

describe("Reactor", () => {
    let instancia: Reactor;

    beforeEach(() => {
        instancia = new Reactor(MOCK.UranioMock, MOCK.SistemaMock, MOCK.SensorMock);
        instancia.cambiarA(MOCK.EstadoMock);
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
            const spy = jest.spyOn(MOCK.EstadoMock, "iniciar");
            instancia.iniciar();
            expect(spy).toHaveBeenCalled();
        });
    });

    describe("Detener", () => {
        it("Debería llamar a Estado.detener()", () => {
            const spy = jest.spyOn(MOCK.EstadoMock, "detener");
            instancia.detener();
            expect(spy).toHaveBeenCalled();
        });
    });

    describe("Generar Energia Termica", () => {
        
    });

    describe("Consumir Combustible", () => {
        
    });

    describe("Get Adicional Energia", () => {
        
    });
})