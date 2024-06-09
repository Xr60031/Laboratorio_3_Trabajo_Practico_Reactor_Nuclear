import Generador from "../../../src/Generadores/GeneradorElectrico/Generador";
import Reactor from "../../../src/Generadores/Reactor/Reactor";
import CentralNuclear from "../../../src/CentralNuclear/CentralNuclear";

jest.mock("../Generadores/GeneradorElectrico/Generador");
jest.mock("../Generadores/Reactor/Reactor");

describe('CentralNuclear', () => {
  let instance;

  beforeEach(() => {
    instance = new CentralNuclear();
  });

  it('instance should be an instanceof CentralNuclear', () => {
    expect(instance instanceof CentralNuclear).toBeTruthy();
  });

  it('should have a static method getInstance()', () => {
    // CentralNuclear.getInstance(reactor,generador);
    expect(false).toBeTruthy();
  });

  it('should have a method generarEnergia()', () => {
    // instance.generarEnergia();
    expect(false).toBeTruthy();
  });
});