import GerenciaBurns from "../../src/Controles/GerenciaBurns";
import { SensorTermicoMock, actualizarMock } from "./mocks";

describe('GerenciaBurns', () => {
    let gerenciaBurns: GerenciaBurns;

    beforeEach(() => {
        gerenciaBurns = new GerenciaBurns('Montgomery Burns',
            'montgomery.burns@PlantaNuclearSpringfield.com');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const TEMPERATURA_EMERGENCIA = 400;

    describe('Constructor', () => {
        it('La instancia creada debería estar referenciada a la clase "GerenciaBurns"', () => {
            expect(gerenciaBurns instanceof GerenciaBurns).toBeTruthy();
        });

        it('El objeto debería inicializarse con las propiedades y atributos esperados', () => {
            const nombre = 'Montgomery Burns';
            const email = 'montgomery.burns@PlantaNuclearSpringfield.com';

            expect((gerenciaBurns as any)['_nombre']).toBe(nombre);
            expect((gerenciaBurns as any)['_email']).toBe(email);
            expect((gerenciaBurns as any)['_mensaje']).toBe(`Señor ${nombre}, el reactor ha sido apagado`);
            expect((gerenciaBurns as any)['_suscriptoresGerencia']).toEqual([]);
            expect((gerenciaBurns as any)['_temperaturaReactor']).toBe(0);
        });
    });

    describe('Getters y setters', () => {
        it('El método getSuscriptores() debería devolver los elementos suscritos', () => {
            const suscriptor1 = actualizarMock;
            const suscriptor2 = actualizarMock;

            gerenciaBurns.suscribir(suscriptor1);
            gerenciaBurns.suscribir(suscriptor2);

            expect(gerenciaBurns.getSuscriptores()).toEqual([suscriptor1, suscriptor2]);
            expect(gerenciaBurns.getSuscriptores().length).toBe(2);
        });

        it('El método setSuscriptores() debería modificar los suscriptores', () => {
            const suscriptor1 = actualizarMock;
            const suscriptor2 = actualizarMock;

            gerenciaBurns.setSuscriptores([suscriptor1, suscriptor2]);
            expect(gerenciaBurns.getSuscriptores()).toEqual([suscriptor1, suscriptor2]);
        });
    });

    describe('Suscribir y desuscribir', () => {
        it('El método suscribir() debería agregar un suscriptor', () => {
            const suscriptor = actualizarMock;

            gerenciaBurns.suscribir(suscriptor);

            expect((gerenciaBurns as any)['_suscriptoresGerencia']).toContain(suscriptor);
        });

        it('El método desuscribir() debería remover un suscriptor', () => {
            const suscriptor = actualizarMock;

            gerenciaBurns.suscribir(suscriptor);
            gerenciaBurns.desuscribir(suscriptor);

            expect((gerenciaBurns as any)['_suscriptoresGerencia']).not.toContain(suscriptor);
        });
    });

    describe('Actualizar y notificar', () => {
        it('El método actualizar() debería actualizar la temperatura y notificar a los suscriptores si el reactor está en nivel de emergencia', () => {
            const suscriptor = actualizarMock;
            gerenciaBurns.suscribir(suscriptor);

            jest.spyOn(gerenciaBurns, 'notificar');
            jest.spyOn(SensorTermicoMock, 'getTemperatura').mockReturnValue(TEMPERATURA_EMERGENCIA);

            gerenciaBurns.actualizar(SensorTermicoMock);

            expect((gerenciaBurns as any)['_temperaturaReactor']).toBe(TEMPERATURA_EMERGENCIA);
            expect(gerenciaBurns.notificar).toHaveBeenCalled();
        });

        it('El método actualizar() debería actualizar la temperatura pero NO notificar a los suscriptores si el reactor está por debajo del nivel de emergencia', () => {
            const suscriptor = actualizarMock;
            gerenciaBurns.suscribir(suscriptor);

            jest.spyOn(gerenciaBurns, 'notificar');
            jest.spyOn(SensorTermicoMock, 'getTemperatura').mockReturnValue(TEMPERATURA_EMERGENCIA - 1);

            gerenciaBurns.actualizar(SensorTermicoMock);

            expect((gerenciaBurns as any)['_temperaturaReactor']).toBe(TEMPERATURA_EMERGENCIA - 1);
            expect(gerenciaBurns.notificar).not.toHaveBeenCalled();
        });
    });

});