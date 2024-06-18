
import CentralNuclear from "../src/CentralNuclear/CentralNuclear";
import ConstructorCentralNuclear from "../src/Constructor";


describe('ConstructorCentralNuclear', () => {
  let instance : ConstructorCentralNuclear;

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
});