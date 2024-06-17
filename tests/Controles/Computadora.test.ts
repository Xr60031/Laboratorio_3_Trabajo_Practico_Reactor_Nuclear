import Computadora from "../../src/Controles/Computadora";
import { SistemaBarrasDeControlMock, SensorTermicoMock } from "./mocks";

describe("Computadora", () => {
    let instancia: Computadora;

    const TEMPERATURA_POR_DEFECTO = 240;
    const TEMPERATURA_CRITICO = 330;

    beforeEach(() => {
        instancia = new Computadora();
        jest.clearAllMocks();
    });

    describe("Getters and setters", () => {
        it("deberia obtener los suscriptores", () => {
            expect(instancia.getSuscriptores()).toEqual([]);
            expect(instancia.getSuscriptores().length).toBe(0);
        });

        it("deberia cambiar las suscriptores", () => {
            const nuevasBarrasDeControl = [SistemaBarrasDeControlMock];
            instancia.setSuscriptores(nuevasBarrasDeControl);
            expect(instancia.getSuscriptores()).toEqual(nuevasBarrasDeControl);
            expect(instancia.getSuscriptores().length).toBe(1);
        });

        it("deberia obtener el modo enfriamiento", () => {
            expect(typeof instancia.getModoEnfriamiento()).toBe("boolean");
            expect(instancia.getModoEnfriamiento()).toBeFalsy();
        });

        it("deberia cambiar el modo enfriamiento", () => {
            instancia.setModoEnfriamiento(true);
            expect(instancia.getModoEnfriamiento()).toBeTruthy();
        });

        
        it("deberia obtener la temperatura del reactor", () => {
            expect(typeof instancia.getTemperaturaReactor()).toBe("number");
            expect(instancia.getTemperaturaReactor()).toBe(0);
        });

        it("deberia cambiar la temperatura del reactor", () => {
            instancia.setTemperaturaReactor(TEMPERATURA_CRITICO);
            expect(instancia.getTemperaturaReactor()).toBe(TEMPERATURA_CRITICO);
        });
    });

    describe("suscribir", () => {
        it("deberia agregar un sistemas de barras de control al arreglo de suscriptores", () => {
            instancia.suscribir(SistemaBarrasDeControlMock);
            expect(instancia.getSuscriptores()).toEqual([
                SistemaBarrasDeControlMock,
            ]);
            expect(instancia.getSuscriptores().length).toBe(1);
        });
    });

    describe("desuscribir", () => {
        it("deberia borrar un sistemas de barras de control del arreglo de suscriptores", () => {
            instancia.desuscribir(SistemaBarrasDeControlMock);
            expect(instancia.getSuscriptores()).toEqual([]);
            expect(instancia.getSuscriptores().length).toBe(0);

            instancia.suscribir(SistemaBarrasDeControlMock);
            instancia.desuscribir(SistemaBarrasDeControlMock);
            expect(instancia.getSuscriptores()).toEqual([]);
            expect(instancia.getSuscriptores().length).toBe(0);
        });
    });

    describe("notificar", () => {
        it("deberia notificar a los suscriptores", () => {
            jest.spyOn(SistemaBarrasDeControlMock, "actualizar");
            instancia.notificar();
            expect(
                SistemaBarrasDeControlMock.actualizar
            ).not.toHaveBeenCalled();
            expect(SistemaBarrasDeControlMock.actualizar).toHaveBeenCalledTimes(
                0
            );

            instancia.suscribir(SistemaBarrasDeControlMock);
            instancia.notificar();
            expect(SistemaBarrasDeControlMock.actualizar).toHaveBeenCalled();
            expect(SistemaBarrasDeControlMock.actualizar).toHaveBeenCalledTimes(
                1
            );
            expect(SistemaBarrasDeControlMock.actualizar).toHaveBeenCalledWith(
                instancia
            );
        });
    });

    describe("actualizar", () => {
        it("deberia llamar al metodo verificarTemperatura", () => {
            jest.spyOn(instancia, "verificarTemperatura");
            jest.spyOn(SensorTermicoMock, "getTemperatura").mockReturnValue(
                TEMPERATURA_POR_DEFECTO
            );
            instancia.actualizar(SensorTermicoMock);
            expect(SensorTermicoMock.getTemperatura).toHaveBeenCalled();
            expect(SensorTermicoMock.getTemperatura).toHaveBeenCalledTimes(1);
            expect(instancia.verificarTemperatura).toHaveBeenCalled();
            expect(instancia.verificarTemperatura).toHaveBeenCalledTimes(1);
        });
    });

    describe("verificarTemperatura", () => {
        it("deberia verificar la temperatura y llamar al metodo de notificacion", () => {
            jest.spyOn(instancia, "notificar");
            instancia.verificarTemperatura();
            expect(instancia.getModoEnfriamiento()).toBeFalsy();
            expect(instancia.notificar).toHaveBeenCalled();
            expect(instancia.notificar).toHaveBeenCalledTimes(1);
            jest.spyOn(SensorTermicoMock, "getTemperatura").mockReturnValue(
                TEMPERATURA_CRITICO
            );
            instancia.actualizar(SensorTermicoMock);
            expect(instancia.getModoEnfriamiento()).toBeTruthy();
            expect(instancia.notificar).toHaveBeenCalled();
            expect(instancia.notificar).toHaveBeenCalledTimes(2);
        });

        it("deberia verificar la temperatura si es normal el modo enfriamiento tiene que devolver falso", () => {
            jest.spyOn(SensorTermicoMock, "getTemperatura").mockReturnValue(
                TEMPERATURA_POR_DEFECTO
            );
            instancia.actualizar(SensorTermicoMock);

            instancia.verificarTemperatura();
            expect(instancia.getModoEnfriamiento()).toBeFalsy();
        });

        it("deberia verificar la temperatura si es critico el modo enfriamiento tiene que devolver verdadero", () => {
            jest.spyOn(SensorTermicoMock, "getTemperatura").mockReturnValue(
                TEMPERATURA_CRITICO
            );
            instancia.actualizar(SensorTermicoMock);
            instancia.verificarTemperatura();
            expect(instancia.getModoEnfriamiento()).toBeTruthy();
        });
    });
});
