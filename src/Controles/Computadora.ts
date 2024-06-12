import SistemaDeRegulacionTermica from "../SistemaDeRegulacionTermica/ClasesAbstractas/SistemaDeRegulacionTermica";
import { AlertaTemperatura } from "../Comunicaciones/AlertaTemperatura";
import { TEMPERATURA_CRITICO } from "../Constantes";
import Suscriptor from "../Interfaces/Suscriptor";
import SensorTermico from "../Generadores/Reactor/SensorTermico";
import Notificador from "../Interfaces/Notificador";

export default class Computadora implements Notificador, Suscriptor {
    private suscribersReguladorTermico!: Array<SistemaDeRegulacionTermica>;
    private sistemaRegulacionTermica: SistemaDeRegulacionTermica;

    constructor(sistemaDeRegulacionTermica: SistemaDeRegulacionTermica) {
        this.sistemaRegulacionTermica = sistemaDeRegulacionTermica;
        this.suscribe(this.sistemaRegulacionTermica);
    }

    suscribir(suscriptor: Suscriptor): void {
        throw new Error("Method not implemented.");
    }

    desuscribir(suscriptor: Suscriptor): void {
        throw new Error("Method not implemented.");
    }

    notificar(): void {
        throw new Error("Method not implemented.");
    }

    public actualizar(notificador: SensorTermico): void {
        this.verificarTemperatura(notificador.getTemperatura());
    }

    public verificarTemperatura(temperatura: number): void {
        if (temperatura >= TEMPERATURA_CRITICO) {
            this.activarModoEnfriamiento();
        } else {
            this.desactivarModoEnfriamiento();
        }
    }

    private activarModoEnfriamiento(): void {
        this.suscribersReguladorTermico.forEach((element) => {
            // Como obtiene la temperatura numérica la computadora?
            // -Eze
            // element.verificadorParaEncender();
        });
    }

    private desactivarModoEnfriamiento(): void {
        this.suscribersReguladorTermico.forEach((element) => {
            element.apagarSistema();
        });
    }

    public suscribe(
        sistemaDeRegulacionTermica: SistemaDeRegulacionTermica
    ): void {
        this.suscribersReguladorTermico.push(sistemaDeRegulacionTermica);
    }

    public unsubscribe(
        sistemaDeRegulacionTermica: SistemaDeRegulacionTermica
    ): void {
        let iterador = 0;
        while (
            sistemaDeRegulacionTermica !=
            this.suscribersReguladorTermico[iterador]
        ) {
            iterador++;
        }
        this.suscribersReguladorTermico.splice(iterador, 1);
    }
}
