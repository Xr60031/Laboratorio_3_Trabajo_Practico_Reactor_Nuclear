import CentralNuclear from "../../src/CentralNuclear/CentralNuclear";
import * as MOCK from "./Mocks"
import NoHayCombustibleExcepcion from "../../src/Generadores/Reactor/Combustible/ExcepcionesCombustible/NoHayCombustibleExcepcion";
import { CONVERSION_TEMPERATURA_A_TERMICA } from "../../src/Constantes";
import { before } from "node:test";
import ConstructorCentralNuclear from "../../src/Constructor";
import Reactor from "../../src/Generadores/Reactor/Reactor";
import SensorTermico from "../../src/Generadores/Reactor/SensorTermico";
describe('CentralNuclear', () => {
  let instance : CentralNuclear;

  beforeEach(() => {
    instance = CentralNuclear.getInstance(MOCK.ReactorMock, MOCK.GeneradorMock)
  });


  describe("metodo inicarReactor() ", () => {
    it('instances should be an instanceof CentralNuclear', () => {
      expect(instance instanceof CentralNuclear).toBeTruthy();
    
    });
    it('con combustible deberia llamar una vez a la funcion', () => {
    
      const spy = jest.spyOn(MOCK.ReactorMock, "iniciar")
      try {
        instance.iniciarReactor();
      } catch (NoHayCombustibleExcepcion) {
      
      }
      expect(spy).toHaveBeenCalledTimes(1)
    });
  });
  it('inicarReactor sin combustible tira error', () => {
    try {
      expect(() => {
        instance.iniciarReactor();
      }).toThrow(new NoHayCombustibleExcepcion("No hay combustible para iniciar el reactor."))
    } catch (error) {
      
    }
  });

  
  describe("metodo generarEnergia() ", () => {
    it('deberia correr la cantidad de horas ingresada', () => {
      const spy = jest.spyOn(MOCK.ReactorMock, "generarEnergiaTermica")
      instance.generarEnergia(5);
      expect(spy).toHaveBeenCalledTimes(5);
    
    });
    it('deberia devolver la energia acumulada', () => {
      const energiaRetornada : number= 4000;
      const horascorridas : number = 5
      MOCK.ReactorMock.generarEnergiaTermica = jest.fn().mockReturnValue(energiaRetornada)
      var i = instance.generarEnergia(horascorridas);
      expect(i).toBe(energiaRetornada * horascorridas);
    
    });
  });
  describe("metodo setTemperaturaReactor()", () => {
    it('no es llamado sin parametro', () => {
      const spy = jest.spyOn(MOCK.SensorMock, "medir")
      instance.generarEnergia(5);
      expect(spy).toHaveBeenCalledTimes(0);
    });
  
    it('corre si recibe un numero', () => {
      const spy = jest.spyOn(MOCK.SensorMock, "medir");
      const temperatura = 25;
      instance.generarEnergia(5, temperatura);
      expect(spy).toHaveLastReturnedWith(CONVERSION_TEMPERATURA_A_TERMICA(temperatura));
    });
  });


});