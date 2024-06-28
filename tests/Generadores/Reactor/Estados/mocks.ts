import Reactor from "../../../../src/Generadores/Reactor/Reactor";
import {CANTIDAD_COMBUSTIBLE_CONSTRUCTOR, COMBUSTIBLE_INICIO_REACTOR, CONSUMO_COMBUSTIBLE_BASICO, CONVERSION_TERMICA_A_TEMPERATURA} from "../../../../src/Constantes";

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