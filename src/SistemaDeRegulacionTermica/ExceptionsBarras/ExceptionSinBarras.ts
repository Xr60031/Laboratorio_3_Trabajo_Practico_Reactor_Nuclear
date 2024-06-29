export default class ExceptionSinBarras extends Error {

    public getMessage(): String {
        return this.message;
    }

    constructor();
    constructor() {
        super();
        this.message = "No hay barras para realizar la acción";
    }
}