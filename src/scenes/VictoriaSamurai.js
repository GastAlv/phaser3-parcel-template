import Phaser from 'phaser'
import {BotonSencillo} from '../js/button';
import { getPhrase } from '../services/translations';


// Manejador de eventos centralizados para comunicacion de componentes

// Importacion
//import { sharedInstance as events } from './EventCenter'

// Emisor de mensaje de difusion
// Recibe el nombre del mensaje y los valores de parametro
// events.emit('health-changed', this.health)

// Receptor de mensaje, por ejemplo escena de UI
// Recibe el nombre del mensaje y una funcion callback a ejecutar
// events.on('health-changed', this.handleHealthChanged, this)


export default class VictoriaSamurai extends Phaser.Scene
{
	constructor()
	{
		super('VictoriaSamurai')
	}
    init(data){
        this.sonidos = data.sonidos
        this.languaje = data.language
    }
    create()
    {
        // this.sonidos.MainMenuSonido.pause()
        let victoriaSamurai = this.add.image( this.cameras.main.centerX , this.cameras.main.centerY , 'victoriaSamurai');
        victoriaSamurai.setScale(1.25)

        new BotonSencillo({scene:this, x:900, y:600, texture:'botonMarco', text:getPhrase('VOLVER AL MENU'), size:40,  callback:() => {this.scene.start('MainMenu'), {languaje: this.languaje, sonidos:this.sonidos}}, scale:0.4, callbackHover:()=>{}, callbackOut:()=>{}})

    }
}
