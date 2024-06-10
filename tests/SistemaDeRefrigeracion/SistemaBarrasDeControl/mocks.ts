import BarraDeControl from "../../../src/SistemaDeRefrigeracion/BarraDeControl/BarraDeControl";
import { BARRA_VIDA_MAX } from "../../../src/Constantes";

export const ReactorMocks = {
    getTemperatura : jest.fn().mockReturnValue(0),
};

export const BarraDeControlMocks:BarraDeControl={
    vidaUtil: BARRA_VIDA_MAX,
    nroSerie: 1,
    getVidaUtil: jest.fn().mockReturnValue(200),
    controlarVidaUtil: jest.fn(),
    setVidaUtil: jest.fn(),
    desgasteBarraVidaUtil: jest.fn(),
    setNroSerie: jest.fn(),
    getNroSerie: jest.fn().mockReturnValue(1)
} as any;