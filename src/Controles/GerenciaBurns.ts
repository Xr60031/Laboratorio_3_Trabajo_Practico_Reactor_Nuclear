import { RESEND_API_KEY, TEMPERATURA_EMERGENCIA } from "../Constantes";
import SensorTermico from "../Generadores/Reactor/SensorTermico";
import Notificador from "../Interfaces/Notificador";
import Suscriptor from "../Interfaces/Suscriptor";

export default class GerenciaBurns implements Notificador, Suscriptor {
    private _suscriptoresGerencia: Suscriptor[];
    private _temperaturaReactor: number;
    private _nombre: string;
    private _email: string;
    private _mensaje: string;

    constructor(nombre: string, email: string) {
        this._suscriptoresGerencia = []; 
        this._temperaturaReactor = 0;
        this._nombre = nombre;
        this._email = email;
        this._mensaje = `Señor ${this._nombre}, el reactor ha sido apagado`;
    }

    public suscribir(suscriptor: Suscriptor): void {
        this._suscriptoresGerencia.push(suscriptor);
    }

    public desuscribir(suscriptor: Suscriptor): void {
        const indice = this._suscriptoresGerencia.indexOf(suscriptor);
        if (indice > -1) {
            this._suscriptoresGerencia.splice(indice, 1);
        }
    }

    public actualizar(notificador: SensorTermico): void {
        this._temperaturaReactor = notificador.getTemperatura();
        
        if (this._temperaturaReactor >= TEMPERATURA_EMERGENCIA) {
            this.notificar();
        }
    }

    public notificar(): void {
        const emailData = {
            from: 'administrador@PlantaNuclearSpringfield.com',
            to: this._email,
            subject: 'REACTOR: Estado',
            text: this._mensaje,
        };
            
        try {
            // Se envía un mail al Sr. Montgomery B.
            return console.log('Email enviado correctamente');
        } 
        
        catch (error) {
            console.error('Se produjo un error al enviar el Email', error.message);
        }     
    }

    public getSuscriptores(): Suscriptor[] {
        return this._suscriptoresGerencia;
    }

    public setSuscriptores(value: Suscriptor[]) {
        this._suscriptoresGerencia = value;
    }
    
}