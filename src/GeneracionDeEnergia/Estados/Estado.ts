import Reactor from "../../Generadores/Reactor/Reactor";

export default abstract class Estado {
    protected reactor: Reactor;

    public setReactor(reactor: Reactor) {
        this.reactor = reactor;
    }

    abstract iniciar(): void;
}