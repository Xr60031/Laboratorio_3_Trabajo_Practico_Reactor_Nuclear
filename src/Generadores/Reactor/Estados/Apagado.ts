import Estado from "./Estado";

export default class Apagado extends Estado {
    

    public iniciar(): void {
        
    }

    public generarEnergiaTermica(): number {
        const temperatura: number = this.reactor.getSensorTermico().medir();
        const energiaTermica: number = temperatura * 8 - 140;
        return this.reactor.getSistemaDeRegulacionTermica().getEnergiaTermica(energiaTermica);
    }
}