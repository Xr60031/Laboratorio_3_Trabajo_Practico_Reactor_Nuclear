import BarraDeControl from "../../../src/SistemaDeRefrigeracion/BarraDeControl/BarraDeControl";

export const BarrasMocks = {
    getTemperatura : jest.fn().mockReturnValue(0),
    getEnergia : jest.fn().mockReturnValue(200)
};