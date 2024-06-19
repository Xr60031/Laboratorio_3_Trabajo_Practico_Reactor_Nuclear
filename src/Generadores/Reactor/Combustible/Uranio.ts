import NoHaySuficienteCombustibleExcepcion from "./ExcepcionesCombustible/NoHaySuficienteCombustibleExcepcion";
import CombustibleNuclear from "./CombustibleNuclear";
import { MULTIPLICADOR_ENERGIA_TERMICA } from "../../../Constantes";

export default class Uranio extends CombustibleNuclear {
    

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
        return cantidad * MULTIPLICADOR_ENERGIA_TERMICA;
    }
}
