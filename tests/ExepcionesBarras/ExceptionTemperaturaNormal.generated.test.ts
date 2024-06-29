import ExceptionTemperaturaNormal from '../../src/SistemaDeRegulacionTermica/ExceptionsBarras/ExceptionTemperaturaNormal';

describe('ExceptionTemperaturaNormal', () => {
  let instance: ExceptionTemperaturaNormal;

  beforeEach(() => {
    instance = new ExceptionTemperaturaNormal();
  });

  it('instance should be an instanceof ExceptionTemperaturaNormal', () => {
    expect(instance instanceof ExceptionTemperaturaNormal).toBeTruthy();
  });

  it('Sin parametros devuelve el mensaje + 0', () => {
    expect(instance.getMessage()).toBe("La temperatura del reactor se encuentra normal, no se realizaron medidas, temperatura: " + 0);
  });
  it('Con parametros devuelve el mensaje + el parametro', () => {
    const temperatura = 520;
    instance = new ExceptionTemperaturaNormal(temperatura);
    expect(instance.getMessage()).toBe("La temperatura del reactor se encuentra normal, no se realizaron medidas, temperatura: " + temperatura);
  });

});