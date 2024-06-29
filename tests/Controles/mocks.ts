import SensorTermico from "../../src/Generadores/Reactor/SensorTermico";
import Suscriptor from "../../src/Interfaces/Suscriptor";
import SistemaBarrasDeControl from "../../src/SistemaDeRegulacionTermica/SistemaBarrasDeControl/SistemaBarrasDeControl";

export const SistemaBarrasDeControlMock = {
    actualizar: jest.fn(),
    encenderSistema: jest.fn(),
    apagarSistema: jest.fn(),
} as unknown as SistemaBarrasDeControl;

export const SensorTermicoMock = {
    getTemperatura: jest.fn(),
} as unknown as SensorTermico;

export const actualizarMock = {
    actualizar: jest.fn(),
} as unknown as Suscriptor;
