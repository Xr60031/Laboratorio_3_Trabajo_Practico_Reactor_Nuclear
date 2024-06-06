export default class Generador {
    public generarEnergiaElectrica(energiaTermica: number) {
        const energiaElectrica: number = energiaTermica * 1.75 - 3675;
        if(energiaElectrica > 0) return energiaElectrica;
        return 0;
    }
}