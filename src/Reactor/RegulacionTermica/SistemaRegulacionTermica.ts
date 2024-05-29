export abstract class SistemaRegulacionTermica {
    protected encendido: boolean;

    constructor() {
        this.encendido = false;
    }

    public encender(): void {
        this.encendido = true;
    }

    public apagar(): void {
        this.encendido = false;
    }

    public abstract controlarEnergiaTermica(energiaTermica: number): number;
}
