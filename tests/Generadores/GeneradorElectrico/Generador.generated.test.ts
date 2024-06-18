import { CONVERSION_TERMICA_A_ELECTRICA } from '../../../src/Constantes';
import Generador from '../../../src/Generadores/GeneradorElectrico/Generador';

describe('Generador', () => {
  let instance : Generador;

  beforeEach(() => {
    instance = new Generador();
  });

  it('instance should be an instanceof Generador', () => {
    expect(instance instanceof Generador).toBeTruthy();
  });

  it('metodo generarEnergiaElectrica() devuelve 0 si recive 2100', () => {
    const i = instance.generarEnergiaElectrica(2100);
    expect(i).toBe(0);
  });
  it('metodo generarEnergiaElectrica() devuelve 0 si recive 2100', () => {
    const x = 1999
    const i = instance.generarEnergiaElectrica(x);
    expect(i).toBe(0);
  });
  it('metodo generarEnergiaElectrica() devuelve positivo si recive mas de 2100', () => {
    const x = 2300
    const i = instance.generarEnergiaElectrica(x);
    expect(i).toBe(CONVERSION_TERMICA_A_ELECTRICA(x));
  });
});