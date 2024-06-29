import Reactor from "../../../../src/Generadores/Reactor/Reactor";
import { COMBUSTIBLE_INICIO_REACTOR, CONSUMO_COMBUSTIBLE_BASICO } from "../../../../src/Constantes";

export const ReactorMock = {
    getCombustible: jest.fn(),
    getConsumoCombustible: jest.fn().mockReturnValue(CONSUMO_COMBUSTIBLE_BASICO),
    consumirCombustible: jest.fn().mockReturnValue(CONSUMO_COMBUSTIBLE_BASICO * COMBUSTIBLE_INICIO_REACTOR),
    getEnergiaTermica: jest.fn().mockReturnValue(300),
    setEnergiaTermica: jest.fn(),
    getSensorTermico: jest.fn(),
    cambiarA: jest.fn(),
    getAdicionalEnergia: jest.fn()
} as unknown as Reactor;