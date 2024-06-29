import ExceptionVidaUtilInvalida from "../ExceptionsBarras/ExceptionVidaUtilInvalida";
import { DESGASTE_BARRA } from "../../Constantes";
import { BARRA_VIDA_MAX } from "../../Constantes";
import { BARRA_VIDA_MIN } from "../../Constantes";

export default class BarraDeControl {
    private vidaUtil: number;
    private nroSerie: number;

    public getVidaUtil(): number {
        return this.vidaUtil;
    }

    public controlarVidaUtil(vidaUtil: number): void {
        if (vidaUtil > BARRA_VIDA_MAX || vidaUtil < BARRA_VIDA_MIN) {
            throw new ExceptionVidaUtilInvalida(vidaUtil);
        }
    }

    public setVidaUtil(nuevaVidaUtil: number): void {
        this.controlarVidaUtil(nuevaVidaUtil);
        this.vidaUtil = nuevaVidaUtil;
    }

    public desgasteBarraVidaUtil(): number {
        return this.vidaUtil - DESGASTE_BARRA;
    }

    public setNroSerie(nroSerie: number): void {
        this.nroSerie = nroSerie;
    }

    public getNroSerie(): number {
        return this.nroSerie;
    }

    constructor();
    constructor(nroSerie: number, vidaUtil: number);
    constructor(nroSerie?: number, vidaUtil?: number) {
        if (vidaUtil !== undefined && nroSerie !== undefined) {
            this.controlarVidaUtil(vidaUtil);
            this.vidaUtil = vidaUtil;
            this.nroSerie = nroSerie;
        }
        else {
            this.vidaUtil = BARRA_VIDA_MAX;
            this.nroSerie = 0;
        }
    }
}