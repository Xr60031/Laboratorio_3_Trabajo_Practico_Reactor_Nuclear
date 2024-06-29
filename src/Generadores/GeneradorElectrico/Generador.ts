import { CONVERSION_TERMICA_A_ELECTRICA } from "../../Constantes";

export default class Generador {
    public generarEnergiaElectrica(energiaTermica: number) {
        const energiaElectrica: number = CONVERSION_TERMICA_A_ELECTRICA(energiaTermica);
        if (energiaElectrica > 0) return energiaElectrica;
        return 0;
    }

}