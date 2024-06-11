import LimiteCombustibleExcepcion from "./ExcepcionesCombustible/LimiteCombustibleExcepcion";

export default abstract class CombustibleNuclear {
    protected cantidad: number;
    protected limite: number;

    constructor(cantidad: number, limite: number) {
        this.cantidad = cantidad;
        this.limite = limite;
    }

    public recargar(cantidad: number): void {
        if (cantidad + this.cantidad > this.limite) {
            throw new LimiteCombustibleExcepcion(
                "Se alcanzó el limite de combustible"
            );
        }

        this.cantidad += cantidad;
    }

    public abstract consumir(cantidad: number): number;

    public tieneCombustible(): boolean {
        return this.cantidad > 0;
    }

    public abstract calcularEnergiaTermica(cantidad: number): number;

    public getCantidad(): number {
        return this.cantidad;
    }

    public setCantidad(cantidad: number): void {
        this.cantidad = cantidad;
    }

    public getLimite(): number {
        return this.limite;
    }

    public setLimite(limite: number): void {
        this.limite = limite;
    }
}
