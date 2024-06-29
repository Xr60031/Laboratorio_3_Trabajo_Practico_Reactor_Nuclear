import ExceptionSistemaYaApagado from '../../src/SistemaDeRegulacionTermica/ExceptionsBarras/ExceptionSistemaYaApagado';

describe('ExceptionSistemaYaApagado', () => {
  let instance : ExceptionSistemaYaApagado;

  beforeEach(() => {
    instance = new ExceptionSistemaYaApagado();
  });

  it('instance should be an instanceof ExceptionSistemaYaApagado', () => {
    expect(instance instanceof ExceptionSistemaYaApagado).toBeTruthy();
  });

  it('should have a method getMessage()', () => {
    expect(instance.getMessage()).toBe("El sistema ya se encuentra apagado");
  });
});