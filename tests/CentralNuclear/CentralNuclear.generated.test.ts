import CentralNuclear from "../../src/CentralNuclear/CentralNuclear";
import { CONVERSION_TERMICA_A_ELECTRICA } from "../../src/Constantes";
import ConstructorCentralNuclear from "../../src/Constructor";

describe('CentralNuclear', () => {
  let instance: CentralNuclear;
  let cons: ConstructorCentralNuclear;

  beforeEach(() => {
    cons = new ConstructorCentralNuclear();
    instance = cons.crearCentral();
    instance.iniciarReactor()
  });


  describe("actualizar()", () => {

    it("es llamado por el notificador", () => {

      const spy = jest.spyOn(instance, "actualizar");
      instance.generarEnergia(3);
      expect(spy).toHaveBeenCalledTimes(3);
    });
    it("Modifica los datos", () => {
      instance.getDatosFuncionamiento().temperatura = 0;
      const dato = instance.getDatosFuncionamiento().temperatura;
      instance.generarEnergia(1);
      expect(instance.getDatosFuncionamiento().temperatura).toBeGreaterThan(dato);
    });
  });

  it('generarEnergia() deberia devolver la energia acumulada', () => {

    const horascorridas: number = 1;
    const energiaRetornada: number = CONVERSION_TERMICA_A_ELECTRICA((horascorridas * 100) + 2100);
    const i = instance.generarEnergia(horascorridas);
    expect(i).toBe(energiaRetornada);

  });

  it("setTemperaturaReactor() pone la temperatura indicada", () => {
    const temperaturaCargada = 300;
    instance.generarEnergia(0, temperaturaCargada)
    expect(instance.getDatosFuncionamiento().temperatura).toBe(temperaturaCargada);
  });








});

