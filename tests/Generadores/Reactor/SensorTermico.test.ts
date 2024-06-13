import { CONVERSION_TERMICA_A_TEMPERATURA } from "../../../src/Constantes";
import SensorTermico from "../../../src/Generadores/Reactor/SensorTermico";
import { ComputadoraMock } from "./mocks";

describe("SensorTermico", () => {
    let instancia: SensorTermico;

    const TEMPERATURA_POR_DEFECTO = 280;
    const ENERGIA_TERMICA_POR_DEFECTO = 3000;

    beforeEach(() => {
        instancia = new SensorTermico(TEMPERATURA_POR_DEFECTO);
        jest.clearAllMocks();
    });

    describe("Getters and setters", () => {
        it("deberia obtener la temperatura", () => {
            expect(instancia.getTemperatura()).toBe(TEMPERATURA_POR_DEFECTO);
        });

        it("deberia cambiar la temperatura", () => {
            const nuevaTemperatura = 330;
            instancia.setTemperatura(nuevaTemperatura);
            expect(instancia.getTemperatura()).toBe(nuevaTemperatura);
        });

        it("deberia obtener los suscriptores", () => {
            expect(instancia.getSuscriptores()).toEqual([]);
            expect(instancia.getSuscriptores().length).toBe(0);
        });

        it("deberia cambiar las suscriptores", () => {
            const nuevasComputadoras = [ComputadoraMock];
            instancia.setSuscriptores(nuevasComputadoras);
            expect(instancia.getSuscriptores()).toEqual(nuevasComputadoras);
            expect(instancia.getSuscriptores().length).toBe(1);
        });
    });

    describe("suscribir", () => {
        it("deberia agregar una computadora al arreglo de suscriptores", () => {
            instancia.suscribir(ComputadoraMock);
            expect(instancia.getSuscriptores()).toEqual([ComputadoraMock]);
            expect(instancia.getSuscriptores().length).toBe(1);
        });
    });

    describe("desuscribir", () => {
        it("deberia borrar una computadora del arreglo de suscriptores", () => {
            instancia.desuscribir(ComputadoraMock);
            expect(instancia.getSuscriptores()).toEqual([]);
            expect(instancia.getSuscriptores().length).toBe(0);

            instancia.suscribir(ComputadoraMock);
            instancia.desuscribir(ComputadoraMock);
            expect(instancia.getSuscriptores()).toEqual([]);
            expect(instancia.getSuscriptores().length).toBe(0);
        });
    });

    describe("notificar", () => {
        it("deberia notificar a los suscriptores", () => {
            jest.spyOn(ComputadoraMock, "actualizar");
            instancia.notificar();
            expect(ComputadoraMock.actualizar).not.toHaveBeenCalled();
            expect(ComputadoraMock.actualizar).toHaveBeenCalledTimes(0);

            instancia.suscribir(ComputadoraMock);
            instancia.notificar();
            expect(ComputadoraMock.actualizar).toHaveBeenCalled();
            expect(ComputadoraMock.actualizar).toHaveBeenCalledTimes(1);
            expect(ComputadoraMock.actualizar).toHaveBeenCalledWith(instancia);
        });
    });

    describe("medir", () => {
        it("deberia medir la temperatura a partir de energia termica", () => {
            jest.spyOn(instancia, "notificar");
            instancia.medir(ENERGIA_TERMICA_POR_DEFECTO);
            expect(instancia.getTemperatura()).toBe(
                CONVERSION_TERMICA_A_TEMPERATURA(ENERGIA_TERMICA_POR_DEFECTO)
            );
            expect(instancia.notificar).toHaveBeenCalled();
            expect(instancia.notificar).toHaveBeenCalledTimes(1);
        });
    });
});
