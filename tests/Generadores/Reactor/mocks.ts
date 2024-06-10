import { Computadora } from "../../../src/Controles/Computadora";

export const ComputadoraMock = {
    actualizar: jest.fn(),
    activarModoEnfriamiento: jest.fn(),
    desactivarModoEnfriamiento: jest.fn(),
} as unknown as Computadora;
