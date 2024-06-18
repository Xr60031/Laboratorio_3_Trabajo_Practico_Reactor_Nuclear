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
  let cons : ConstructorCentralNuclear;

  beforeEach(() => {
    cons = new ConstructorCentralNuclear();
    instance = cons.crearCentral();
  });

    

  
    it('deberia devolver la energia acumulada', () => {
      instance.iniciarReactor()
      const energiaRetornada : number = 17.5;
      const horascorridas : number = 1;
      var i = instance.generarEnergia(horascorridas);
      expect(i).toBe(energiaRetornada);
        
    });


    
  
  
  it("Actualizar() es llamado por el notificador", () =>{
     const spy = jest.spyOn(instance, "actualizar");
     instance.generarEnergia(2);
     expect(spy).toHaveBeenCalledTimes(2); 
     
  });
  
});
  
