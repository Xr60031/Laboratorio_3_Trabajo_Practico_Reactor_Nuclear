import Computadora from "../../../src/Controles/Computadora";
import Uranio from "../../../src/Generadores/Reactor/Combustible/Uranio";
import SistemaBarrasDeControl from "../../../src/SistemaDeRegulacionTermica/SistemaBarrasDeControl/SistemaBarrasDeControl";
import SensorTermico from "../../../src/Generadores/Reactor/SensorTermico";
import Estado from "../../../src/Generadores/Reactor/Estados/Estado";


export const ComputadoraMock = {
    actualizar: jest.fn(),
    activarModoEnfriamiento: jest.fn(),
    desactivarModoEnfriamiento: jest.fn(),
} as unknown as Computadora;

export const UranioMock = {
    tieneCombustible: jest.fn()
} as unknown as Uranio;

export const SistemaMock = {

} as unknown as SistemaBarrasDeControl;

export const SensorMock = {

} as unknown as SensorTermico;

export const EstadoMock = {
    setReactor: jest.fn(),
    iniciar: jest.fn(),
    detener: jest.fn(),
    procesarEnergiaTermica: jest.fn()
} as unknown as Estado;