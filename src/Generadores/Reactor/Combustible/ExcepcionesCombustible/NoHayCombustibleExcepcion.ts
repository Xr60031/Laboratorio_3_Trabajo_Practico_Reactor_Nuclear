export default class NoHayCombustibleExcepcion extends Error {
    constructor(msg: string) {
        super(msg);
    }
}