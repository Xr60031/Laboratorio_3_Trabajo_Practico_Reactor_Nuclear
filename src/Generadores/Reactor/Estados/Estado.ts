import Reactor from "../Reactor";

export default abstract class Estado {
    protected reactor!: Reactor;

    public setReactor(reactor: Reactor) {
        this.reactor = reactor;
    }

    public abstract iniciar(): void;
    public abstract detener(): void;
    public generarEnergiaTermica(): void {
        if (!this.reactor.getCombustible().tieneCombustible()) {
            this.detener();
        }
    }
    public abstract toString(): String;
}