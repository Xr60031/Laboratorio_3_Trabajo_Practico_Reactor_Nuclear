import { CONVERSION_ELECTRICA } from "../../Constantes";

export default class Generador {
    public generarEnergiaElectrica(energiaTermica: number) {
        const energiaElectrica: number = CONVERSION_ELECTRICA(energiaTermica);
        if(energiaElectrica > 0) return energiaElectrica;
        return 0;
    }

}