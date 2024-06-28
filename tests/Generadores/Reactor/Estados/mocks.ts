import Reactor from "../../../../src/Generadores/Reactor/Reactor";
import {CANTIDAD_COMBUSTIBLE_CONSTRUCTOR, COMBUSTIBLE_INICIO_REACTOR, CONSUMO_COMBUSTIBLE_BASICO, CONVERSION_TERMICA_A_TEMPERATURA} from "../../../../src/Constantes";
import Normal from "../../../../src/Generadores/Reactor/Estados/Normal";

export const ReactorMock:Reactor = {
    getCombustible: jest.fn().mockReturnValue(true),
    getConsumoCombustible: jest.fn().mockReturnValue(CONSUMO_COMBUSTIBLE_BASICO),
    consumirCombustible: jest.fn().mockReturnValue(CONSUMO_COMBUSTIBLE_BASICO * COMBUSTIBLE_INICIO_REACTOR),
    getEnergiaTermica: jest.fn().mockReturnValue(300),
    setEnergiaTermica: jest.fn(Number),
    getSensorTermico: jest.fn().mockReturnValue(CONVERSION_TERMICA_A_TEMPERATURA(300)),
    //Deberia de enviar el cambio a normal
    cambiarA: jest.fn(),
    getAdicionalEnergia: jest.fn()
} as any;