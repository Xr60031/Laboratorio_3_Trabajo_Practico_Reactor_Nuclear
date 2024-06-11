import { SensorTermico } from "../../../src/Generadores/Reactor/SensorTermico";
import { ComputadoraMock } from "./mocks";

describe("SensorTermico", () => {
    let instancia: SensorTermico;

    const TEMPERATURA_POR_DEFECTO = 240;
    const ENERGIA_TERMICA_POR_DEFECTO = 3000;
    const MODIFICADOR_TEMPERATURA_ENERGIA = 7.5;

    beforeEach(() => {
        instancia = new SensorTermico(TEMPERATURA_POR_DEFECTO);
        jest.clearAllMocks();
    });

    describe("Getters and setters", () => {
        it("deberia obtener la temperatura", () => {
            expect(instancia.temperatura).toBe(TEMPERATURA_POR_DEFECTO);
        });

        it("deberia cambiar la temperatura", () => {
            const nuevaTemperatura = 330;
            instancia.temperatura = nuevaTemperatura;
            expect(instancia.temperatura).toBe(nuevaTemperatura);
        });

        it("deberia obtener las computadoras", () => {
            expect(instancia.computadoras).toEqual([]);
            expect(instancia.computadoras.length).toBe(0);
        });

        it("deberia cambiar las computadoras", () => {
            instancia.computadoras = [ComputadoraMock];
            expect(instancia.computadoras).toEqual([ComputadoraMock]);
            expect(instancia.computadoras.length).toBe(1);
        });
    });

    describe("suscribir", () => {
        it("deberia agregar una computadora al arreglo de computadoras suscriptas", () => {
            instancia.suscribir(ComputadoraMock);
            expect(instancia.computadoras).toEqual([ComputadoraMock]);
            expect(instancia.computadoras.length).toBe(1);
        });
    });

    describe("desuscribir", () => {
        it("deberia desuscribir una computadora del arreglo de computadoras suscriptas", () => {
            instancia.desuscribir(ComputadoraMock);
            expect(instancia.computadoras).toEqual([]);
            expect(instancia.computadoras.length).toBe(0);

            instancia.suscribir(ComputadoraMock);
            instancia.desuscribir(ComputadoraMock);
            expect(instancia.computadoras).toEqual([]);
            expect(instancia.computadoras.length).toBe(0);
        });
    });

    describe("notificar", () => {
        it("deberia notificar a las computadoras", () => {
            jest.spyOn(ComputadoraMock, "actualizar");
            instancia.notificar();
            expect(ComputadoraMock.actualizar).not.toHaveBeenCalled();
            expect(ComputadoraMock.actualizar).toHaveBeenCalledTimes(0);

            instancia.suscribir(ComputadoraMock);
            instancia.notificar();
            expect(ComputadoraMock.actualizar).toHaveBeenCalled();
            expect(ComputadoraMock.actualizar).toHaveBeenCalledTimes(1);
            expect(ComputadoraMock.actualizar).toHaveBeenCalledWith(
                TEMPERATURA_POR_DEFECTO
            );
        });
    });

    describe("medir", () => {
        it("deberia medir la temperatura a partir de una energia termica", () => {
            jest.spyOn(instancia, "notificar");
            instancia.medir(ENERGIA_TERMICA_POR_DEFECTO);
            expect(instancia.temperatura).toBe(
                ENERGIA_TERMICA_POR_DEFECTO / MODIFICADOR_TEMPERATURA_ENERGIA
            );
            expect(instancia.notificar).toHaveBeenCalled();
            expect(instancia.notificar).toHaveBeenCalledTimes(1);
        });
    });
});
