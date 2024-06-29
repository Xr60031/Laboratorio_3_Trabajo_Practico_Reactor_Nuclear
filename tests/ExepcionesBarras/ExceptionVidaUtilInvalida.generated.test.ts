import ExceptionVidaUtilInvalida from '../../src/SistemaDeRegulacionTermica/ExceptionsBarras/ExceptionVidaUtilInvalida';

describe('ExceptionVidaUtilInvalida', () => {
  let instance : ExceptionVidaUtilInvalida;

  beforeEach(() => {
    instance = new ExceptionVidaUtilInvalida();
  });

  it('instance should be an instanceof ExceptionVidaUtilInvalida', () => {
    expect(instance instanceof ExceptionVidaUtilInvalida).toBeTruthy();
  });

  it('Sin parametro devuelve el mensaje + 0', () => {
    expect(instance.getMessage()).toBe("El siguiente valor ingresado no es valido: " + 0);
  });
  it('Con parametro devuelve el mensaje + la vida util pasada', () => {
    const vUtil = 22;
    instance = new ExceptionVidaUtilInvalida(vUtil);
    expect(instance.getMessage()).toBe("El siguiente valor ingresado no es valido: " + vUtil);
  });

});