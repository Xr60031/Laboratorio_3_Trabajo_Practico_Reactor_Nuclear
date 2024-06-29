import ExceptionSinBarras from '../../src/SistemaDeRegulacionTermica/ExceptionsBarras/ExceptionSinBarras';

describe('ExceptionSinBarras', () => {
  let instance: ExceptionSinBarras;

  beforeEach(() => {
    instance = new ExceptionSinBarras();
  });

  it('instance should be an instanceof ExceptionSinBarras', () => {
    expect(instance instanceof ExceptionSinBarras).toBeTruthy();
  });

  it('should have a method getMessage()', () => {
    expect(instance.getMessage()).toBe("No hay barras para realizar la acción");
  });
});