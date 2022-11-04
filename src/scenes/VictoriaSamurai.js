import Phaser from 'phaser'
import {BotonSencillo, Button} from '../js/button';


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


    create()
    {
        const victoriaSamurai = this.add.image( this.cameras.main.centerX , this.cameras.main.centerY , 'victoriaSamurai');
        victoriaSamurai.setScale(1.25)


        new BotonSencillo(this, 900, 600, 'botonMarco', 'VOLVER AL MENU', 40, () => {this.scene.start('MainMenu')}, 0.4);


    }
}
