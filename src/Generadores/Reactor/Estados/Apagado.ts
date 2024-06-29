import DatosEnTodoMomento from "../../../CentralNuclear/DatosEnTodoMomento";
import { COMBUSTIBLE_INICIO_REACTOR, REDUCCION_TEMPERATURA_APAGADO, TEMPERATURA_CRITICO } from "../../../Constantes";
import NoHayCombustibleExcepcion from "../Combustible/ExcepcionesCombustible/NoHayCombustibleExcepcion";
import AccionInvalidaException from "../ExcepcionesReactor/AccionInvalidaException";
import Estado from "./Estado";
import Normal from "./Normal";

export default class Apagado extends Estado {
    public iniciar(): void {
        if (!this.reactor.getCombustible().tieneCombustible()) {
            throw new NoHayCombustibleExcepcion(
                "No hay combustible para iniciar el reactor."
            );
        }

        this.precalentarReactor();
        this.reactor.cambiarA(new Normal());
        DatosEnTodoMomento.getInstance().contarNormal();
    }


    public detener(): void {
        throw new AccionInvalidaException(
            "El reactor ya se encuentra detenido."
        );
    }

    public procesarEnergiaTermica(): void {
        this.reducirEnergiaTermica();

        if (TEMPERATURA_CRITICO >= this.reactor.getSensorTermico().getTemperatura()) {
            this.iniciar();
        }
    }

    private reducirEnergiaTermica(): void {
        let energiaTermica = this.reactor.getEnergiaTermica();
        energiaTermica -= REDUCCION_TEMPERATURA_APAGADO;
        if (0 > energiaTermica) {
            energiaTermica = 0;
        }
        this.reactor.setEnergiaTermica(energiaTermica);

        this.reactor.getSensorTermico().medir(energiaTermica);
    }

    private precalentarReactor() {
        this.reactor.consumirCombustible(this.reactor.getConsumoCombustible() * COMBUSTIBLE_INICIO_REACTOR);
    }
}