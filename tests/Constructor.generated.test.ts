import CentralNuclear from "../src/CentralNuclear/CentralNuclear";
import { TEMPERATURA_CRITICO } from "../src/Constantes";
import ConstructorCentralNuclear from "../src/Constructor";
import ExceptionSinBarras from "../src/SistemaDeRegulacionTermica/ExceptionsBarras/ExceptionSinBarras";


describe('ConstructorCentralNuclear', () => {
  let instance: ConstructorCentralNuclear;

  beforeEach(() => {
    instance = new ConstructorCentralNuclear();
  });

  it('instance should be an instanceof ConstructorCentralNuclear', () => {
    expect(instance instanceof ConstructorCentralNuclear).toBeTruthy();
  });

  it("crearCentral() sin parametros deberia devolver una central", () => {
    let central = instance.crearCentral()
    expect(central instanceof CentralNuclear).toBeTruthy();
  });
  it("crearCentral() sin barras deberia lanzar error", () => {
    let central = instance.crearCentral();
    central.iniciarReactor();
    try {
      central.generarEnergia(1, TEMPERATURA_CRITICO + 10)
    } catch (error) {
      expect(error instanceof ExceptionSinBarras).toBeTruthy();
    }


  });
  it("crearCentral() con barras deberia funcionar correctamente", () => {
    let central = instance.crearCentral(10);
    central.iniciarReactor();
    try {
      const r = central.generarEnergia(1, TEMPERATURA_CRITICO + 10)
      expect(r).toBeInstanceOf(Number);
    } catch (error) {
      expect(error instanceof ExceptionSinBarras).toBeFalsy();
    }

    expect(central instanceof CentralNuclear).toBeTruthy();
  });

});