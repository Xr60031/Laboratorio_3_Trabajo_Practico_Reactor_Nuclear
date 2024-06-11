export default class NoHaySuficienteCombustibleExcepcion extends Error {
    constructor(msg: string) {
        super(msg);
    }
}
