export default class AccionInvalidaException extends Error {
    constructor(msg: string) {
        super(msg);
    }
}