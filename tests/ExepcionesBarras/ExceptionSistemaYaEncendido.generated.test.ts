import ExceptionSistemaYaEncendido from '../../src/SistemaDeRegulacionTermica/ExceptionsBarras/ExceptionSistemaYaEncendido';

describe('ExceptionSistemaYaEncendido', () => {
  let instance : ExceptionSistemaYaEncendido;

  beforeEach(() => {
    instance = new ExceptionSistemaYaEncendido();
  });

  it('instance should be an instanceof ExceptionSistemaYaEncendido', () => {
    expect(instance instanceof ExceptionSistemaYaEncendido).toBeTruthy();
  });

  it('should have a method getMessage()', () => {
    expect(instance.getMessage()).toBe("El sistema ya se encuentra encendido");
  });
});