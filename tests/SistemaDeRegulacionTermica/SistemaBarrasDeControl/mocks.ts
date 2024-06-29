import BarraDeControl from "../../../src/SistemaDeRegulacionTermica/BarraDeControl/BarraDeControl";
import { BARRA_VIDA_MAX } from "../../../src/Constantes";
import Computadora from "../../../src/Controles/Computadora";

export const ReactorMocks = {
    getTemperatura: jest.fn().mockReturnValue(0),
};

export const BarraDeControlMocks: BarraDeControl = {
    vidaUtil: BARRA_VIDA_MAX,
    nroSerie: 1,
    getVidaUtil: jest.fn().mockReturnValue(200),
    controlarVidaUtil: jest.fn(),
    setVidaUtil: jest.fn(),
    desgasteBarraVidaUtil: jest.fn(),
    setNroSerie: jest.fn(),
    getNroSerie: jest.fn().mockReturnValue(1)
} as any;

export const ComputadoraMocks: Computadora = {
    suscriptores: [],
    modoEnfriamiento: false,
    temperaturaReactor: 0,
    suscribir: jest.fn(),
    desuscribir: jest.fn(),
    notificar: jest.fn(),
    actualizar: jest.fn(),
    verificarTemperatura: jest.fn(),
    activarModoEnfriamiento: jest.fn(),
    desactivarModoEnfriamiento: jest.fn(),
    getSuscriptores: jest.fn(),
    setSuscriptores: jest.fn(),
    getModoEnfriamiento: jest.fn().mockReturnValue(true),
    setModoEnfriamiento: jest.fn(),
    getTemperaturaReactor: jest.fn().mockReturnValue(331)
} as any;