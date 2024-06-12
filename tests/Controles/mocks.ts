import SensorTermico from "../../src/Generadores/Reactor/SensorTermico";
import SistemaBarrasDeControl from "../../src/SistemaDeRegulacionTermica/SistemaBarrasDeControl/SistemaBarrasDeControl";

export const SistemaBarrasDeControlMock = {
    actualizar: jest.fn(),
    encenderSistema: jest.fn(),
    apagarSistema: jest.fn(),
} as unknown as SistemaBarrasDeControl;

export const SensorTermicoMock = {
    getTemperatura: jest.fn(),
} as unknown as SensorTermico;
