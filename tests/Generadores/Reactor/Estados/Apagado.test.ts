import Apagado from "../../../../src/Generadores/Reactor/Estados/Apagado";
import * as Mocks from "./mocks";
import NoHayCombustibleExcepcion from "../../../../src/Generadores/Reactor/Combustible/ExcepcionesCombustible/NoHayCombustibleExcepcion";
import AccionInvalidaException from "../../../../src/Generadores/Reactor/ExcepcionesReactor/AccionInvalidaException";

describe("Apagado tests", () => {

    let apagado:Apagado;

    beforeEach(()=>{
        apagado = new Apagado();
        apagado.setReactor(Mocks.ReactorMock);
    })

    describe("Iniciar reactor", ()=>{
        apagado.iniciar();
        // Para que este en normal deberia Datos en todo momento saber que esta en 1???
    })

    describe("Se intenta iniciar el reactor cuando no hay combustible", ()=>{
        Mocks.ReactorMock.getCombustible=jest.fn().mockReturnValueOnce(false);
        try{
            apagado.iniciar();
        }
        catch(SinCombustible){
            expect(SinCombustible).toBeInstanceOf(NoHayCombustibleExcepcion);
        }
    })

    describe("Se intenta detener el reactor cuando se encuentra detenido", ()=>{
        try{
            apagado.detener();
        }
        catch(AccionInvalida){
            expect(AccionInvalidaException).toBeInstanceOf(AccionInvalidaException);
        }
    })

    describe("Se procesa la energia termica", ()=>{
        apagado.procesarEnergiaTermica();
    })



    /*
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

    public procesarEnergiaTermica(): void {
        this.reducirEnergiaTermica();

        if (TEMPERATURA_CRITICO >= this.reactor.getEnergiaTermica()) {
            this.iniciar();
        }
    }
    */
})