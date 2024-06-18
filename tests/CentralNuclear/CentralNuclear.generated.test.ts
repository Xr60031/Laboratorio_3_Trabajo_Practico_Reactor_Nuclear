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

    

  
    it('generarEnergia() deberia devolver la energia acumulada', () => {
      instance.iniciarReactor()
      const energiaRetornada : number = 17.5;
      const horascorridas : number = 1;
      var i = instance.generarEnergia(horascorridas);
      expect(i).toBe(energiaRetornada);
        
    });


    
  describe("actualizar()", () => {
  
   it("es llamado por el notificador", () =>{
     instance.iniciarReactor();
     const spy = jest.spyOn(instance, "actualizar");
     instance.generarEnergia(3);
     expect(spy).toHaveBeenCalledTimes(3); 
    });
   it("Modifica los datos", () => {
     const dato = instance.getDatosFuncionamiento().temperatura;
     instance.generarEnergia(1);
     expect(instance.getDatosFuncionamiento().temperatura).toBeGreaterThan(dato);
    });
  });
  
  
});
  
