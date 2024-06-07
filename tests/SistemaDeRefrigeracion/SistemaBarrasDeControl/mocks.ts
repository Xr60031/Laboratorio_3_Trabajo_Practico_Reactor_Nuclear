import BarraDeControl from "../../../src/SistemaDeRefrigeracion/BarraDeControl/BarraDeControl";

export const ReactorMocks = {
    getTemperatura : jest.fn().mockReturnValue(0),
};

export const _Mock:BarraDeControl={
    
    getVidaUtil: jest.fn(),
    controlarVidaUtil: jest.fn(),
    setVidaUtil: jest.fn(),
    desgasteBarraVidaUtil: jest.fn(),
    setNroSerie: jest.fn(),
    getNroSerie: jest.fn()
} as any;