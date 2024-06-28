import NoHaySuficienteCombustibleExcepcion from "./ExcepcionesCombustible/NoHaySuficienteCombustibleExcepcion";
import CombustibleNuclear from "./CombustibleNuclear";
import { MULTIPLICADOR_ENERGIA_TERMICA } from "../../../Constantes";

export default class Uranio extends CombustibleNuclear {
    

    public consumir(cantidadAConsumir: number): number {
        if (this.cantidad - cantidadAConsumir < 0) {
            throw new NoHaySuficienteCombustibleExcepcion(
                "No hay suficiente Uranio para consumir"
            );
        }

        this.cantidad -= cantidadAConsumir;

        return this.calcularEnergiaTermica(cantidadAConsumir);
    }

    public calcularEnergiaTermica(cantidadAConsumir: number): number {
        return cantidadAConsumir * MULTIPLICADOR_ENERGIA_TERMICA;
    }
}
