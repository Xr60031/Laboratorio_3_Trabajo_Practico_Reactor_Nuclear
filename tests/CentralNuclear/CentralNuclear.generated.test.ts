import Generador from "../../src/Generadores/GeneradorElectrico/Generador";
import Reactor from "../../src/Generadores/Reactor/Reactor";
import CentralNuclear from "../../src/CentralNuclear/CentralNuclear";
import * as MOCK from "./mocks"
import { NoHayCombustibleExcepcion } from "../../src/Generadores/Reactor/Combustible/ExcepcionesCombustible/NoHayCombustibleExcepcion";
import { MODIFICADOR_TEMPERATURA_ENERGIA } from "../../src/Constantes";

describe('CentralNuclear', () => {
  let instance : CentralNuclear;

  beforeEach(() => {
    instance = CentralNuclear.getInstance(MOCK.ReactorMock, MOCK.GeneradorMock)
  });

  it('instances should be an instanceof CentralNuclear', () => {
    expect(instance instanceof CentralNuclear).toBeTruthy();
    
  });
  it('inicarReactor  con combustible deberia llamar una vez a la funcion', () => {
    
    const spy = jest.spyOn(MOCK.ReactorMock, "iniciar")
    try {
      instance.iniciarReactor();
    } catch (NoHayCombustibleExcepcion) {
      
    }
    expect(spy).toHaveBeenCalledTimes(1)
    

  });
  it('inicarReactor sin combustible tira error', () => {
    expect(() => {
      instance.iniciarReactor();
    }).toThrow(new NoHayCombustibleExcepcion("Catch no implemenado CentralNuclear.iniciarReactor()"))
  });

  

  it('metodo generarEnergia() deberia correr la cantidad de horas ingresada', () => {
    const spy = jest.spyOn(MOCK.ReactorMock, "generarEnergiaTermica")
    instance.generarEnergia(5);
    expect(spy).toHaveBeenCalledTimes(5);
    
  });
  it('metodo generarEnergia() deberia devolver la energia acumulada', () => {
    const energiaRetornada : number= 4000;
    const horascorridas : number = 5
    MOCK.ReactorMock.generarEnergiaTermica = jest.fn().mockReturnValue(energiaRetornada)
    var i = instance.generarEnergia(horascorridas);
    expect(i).toBe(energiaRetornada * horascorridas);
    
  });

  it('metodo setTemperaturaReactor() no es llamado sin parametro', () => {
    const spy = jest.spyOn(MOCK.SensorMock, "medir")
    instance.generarEnergia(5);
    expect(spy).toHaveBeenCalledTimes(0);
  })
  
  it('metodo setTemperaturaReactor() corre si recibe un numero', () => {
    const spy = jest.spyOn(MOCK.SensorMock, "medir")
    const temperatura = 25
    instance.generarEnergia(5, temperatura);
    expect(spy).toHaveLastReturnedWith(temperatura * MODIFICADOR_TEMPERATURA_ENERGIA);
  })
  
});