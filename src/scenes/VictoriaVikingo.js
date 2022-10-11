import Phaser from 'phaser'
import Button from '../js/button';


// Manejador de eventos centralizados para comunicacion de componentes

// Importacion
//import { sharedInstance as events } from './EventCenter'

// Emisor de mensaje de difusion
// Recibe el nombre del mensaje y los valores de parametro
// events.emit('health-changed', this.health)

// Receptor de mensaje, por ejemplo escena de UI
// Recibe el nombre del mensaje y una funcion callback a ejecutar
// events.on('health-changed', this.handleHealthChanged, this)


export default class VictoriaVikingo extends Phaser.Scene
{
	constructor()
	{
		super('VictoriaVikingo')
	}


    create()
    {
        const victoriaVikingo = this.add.image( this.cameras.main.centerX , this.cameras.main.centerY , 'victoriaVikingo');
        victoriaVikingo.setScale(1.25)
        


        // const botonVolver = new Button(this, 750, 205, 'botonMarco', 'VOLVER AL MENU', 80, () => this.scene.start('MainMenu'), 0.67);

    }
}
