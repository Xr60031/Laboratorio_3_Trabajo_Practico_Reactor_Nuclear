import { TEMPERATURA_EMERGENCIA } from "../Constantes";
import SensorTermico from "../Generadores/Reactor/SensorTermico";
import Suscriptor from "../Interfaces/Suscriptor";
import { Resend } from "resend";

export default class GerenciaBurns implements Suscriptor {
    private _temperaturaReactor: number;
    private _nombre: string;
    private _email: string;
    private _mensaje: string;

    constructor(nombre: string, email: string) {
        this._temperaturaReactor = 0;
        this._nombre = nombre;
        this._email = email;
        this._mensaje = `Señor ${this._nombre}, el reactor ha sido apagado`;
    }

    public actualizar(notificador: SensorTermico): void {
        this._temperaturaReactor = notificador.getTemperatura();
        
        if (this._temperaturaReactor >= TEMPERATURA_EMERGENCIA) {
            this.notificar();
        }
    }

    public notificar(): void {

        const resend = new Resend(process.env.RESEND_API_KEY);
 
        const emailData = {
            from: 'administrador@PlantaNuclearSpringfield.com',
            to: this._email,
            subject: 'REACTOR: Estado',
            text: this._mensaje,
        };
            
        try {
            resend.emails.send(emailData);
            return console.log('Email enviado correctamente');
        } 
        
        catch (error) {
            console.error('Se produjo un error al enviar el Email', error.message);
        }     

    }
    
}