import Reactor from "../Reactor";

export default abstract class Estado {
    protected reactor!: Reactor;

    public setReactor(reactor: Reactor) {
        this.reactor = reactor;
    }

    public abstract iniciar(): void;
    public abstract detener(): void;
    public abstract procesarEnergiaTermica(): void;
    public abstract toString(): string;
}