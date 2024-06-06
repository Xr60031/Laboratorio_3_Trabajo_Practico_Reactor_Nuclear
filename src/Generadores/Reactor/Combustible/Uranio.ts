import { NoHaySuficienteCombustibleExcepcion } from "./ExcepcionesCombustible/NoHaySuficienteCombustibleExcepcion";
import { CombustibleNuclear } from "./CombustibleNuclear";

export class Uranio extends CombustibleNuclear {
    private readonly MULTIPLICADOR_ENERGIA_TERMICA: number = 10;

    public consumir(cantidad: number): number {
        if (this.cantidad - cantidad < 0) {
            throw new NoHaySuficienteCombustibleExcepcion(
                "No hay suficiente Uranio para consumir"
            );
        }

        this.cantidad -= cantidad;

        return this.calcularEnergiaTermica(cantidad);
    }

    public calcularEnergiaTermica(cantidad: number): number {
        return cantidad * this.MULTIPLICADOR_ENERGIA_TERMICA;
    }
}
