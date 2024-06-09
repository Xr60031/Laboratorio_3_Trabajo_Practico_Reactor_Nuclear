import Generador from "../../src/Generadores/GeneradorElectrico/Generador";
import { NoHayCombustibleExcepcion } from "../../src/Generadores/Reactor/Combustible/ExcepcionesCombustible/NoHayCombustibleExcepcion";
import Reactor from "../../src/Generadores/Reactor/Reactor";
import { SensorTermico } from "../../src/Generadores/Reactor/SensorTermico";

export const ReactorMock : Reactor = {

   estado : false,
   generarEnergiaTermica : jest.fn().mockReturnValue(10),
   iniciar : jest.fn(() => {
          throw new NoHayCombustibleExcepcion("Catch no implemenado CentralNuclear.iniciarReactor()");
        }),
        getSensorTermico : jest.fn(() => {
      return SensorMock
   })
} as any;
export const SensorMock : SensorTermico = {

   medir : jest.fn((n : number) => {
      return n
   })
}as any;

export const GeneradorMock : Generador = {
   generarEnergiaElectrica: function (energiaTermica: number): number {
      return energiaTermica;
   }
}as any;
