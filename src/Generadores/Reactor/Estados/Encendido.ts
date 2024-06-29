import Estado from "./Estado";

export default abstract class Encendido extends Estado {
    protected abstract controlarEstado(): void;
    protected abstract absorcionEnergiaTermica(energiaTermica: number): number;

    public procesarEnergiaTermica(): void {
        if (!this.reactor.getCombustible().tieneCombustible()) {
            this.detener();
        }
        else {
            let energiaTermica = this.reactor.getEnergiaTermica() + this.reactor.getAdicionalEnergia();

            energiaTermica = this.absorcionEnergiaTermica(energiaTermica);

            this.reactor.setEnergiaTermica(energiaTermica);

            this.reactor.getSensorTermico().medir(energiaTermica);

            this.controlarEstado();
        }
    }
}