import { SinVidaUtilExcepcion } from "../Excepciones/SinVidaUtilExcepcion";
import { SistemaRegulacionTermica } from "./SistemaRegulacionTermica";

export class BarraDeControl extends SistemaRegulacionTermica {
    private vidaUtil: number;

    constructor() {
        super();
        this.vidaUtil = 2000;
    }

    public controlarEnergiaTermica(energiaTermica: number): number {
        if (this.encendido) {
            this.consumirVidaUtil();
            energiaTermica -=
                energiaTermica * (this.getPorcentajeReduccion() / 100);
        }

        return energiaTermica;
    }

    private consumirVidaUtil(): void {
        if (this.vidaUtil <= 0) {
            throw new SinVidaUtilExcepcion("Barra de control sin vida útil");
        }

        this.vidaUtil -= 1;
    }

    private getPorcentajeReduccion(): number {
        return (this.vidaUtil / 3600) * 100;
    }
}
