import Computadora from "../../../src/Controles/Computadora";
import CombustibleNuclear from "../../../src/Generadores/Reactor/Combustible/CombustibleNuclear";
import SistemaDeRegulacionTermica from "../../../src/SistemaDeRegulacionTermica/ClasesAbstractas/SistemaDeRegulacionTermica";
import SensorTermico from "../../../src/Generadores/Reactor/SensorTermico";
import Estado from "../../../src/Generadores/Reactor/Estados/Estado";


export const ComputadoraMock = {
    actualizar: jest.fn(),
    activarModoEnfriamiento: jest.fn(),
    desactivarModoEnfriamiento: jest.fn(),
} as unknown as Computadora;

export const CombustibleMock = {
    tieneCombustible: jest.fn(),
    consumir: jest.fn()
} as unknown as CombustibleNuclear;

export const SistemaMock = {
    getEnergiaTermica: jest.fn()
} as unknown as SistemaDeRegulacionTermica;

export const SensorMock = {
    medir: jest.fn(),
    getTemperatura: jest.fn()
} as unknown as SensorTermico;

export const EstadoMock = {
    setReactor: jest.fn(),
    iniciar: jest.fn(),
    detener: jest.fn(),
    procesarEnergiaTermica: jest.fn()
} as unknown as Estado;