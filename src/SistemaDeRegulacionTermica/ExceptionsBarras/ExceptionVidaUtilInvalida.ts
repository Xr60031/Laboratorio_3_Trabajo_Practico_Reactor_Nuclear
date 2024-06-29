export default class ExceptionVidaUtilInvalida extends Error {

    private vidaUtil: number = 0;

    public getMessage(): String {
        return this.message + this.vidaUtil;
    }

    constructor();
    constructor(vidaUtil: number);
    constructor(vidaUtil?: number) {
        super();
        if (vidaUtil !== undefined) {
            this.vidaUtil = vidaUtil;
        }
        this.message = "El siguiente valor ingresado no es valido: ";
    }
}