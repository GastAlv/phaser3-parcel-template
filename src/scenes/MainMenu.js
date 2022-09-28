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


export default class MainMenu extends Phaser.Scene
{
	constructor()
	{
		super('MainMenu')
	}



    create()
    {
        //const menuFondo = this.add.image( this.cameras.main.centerX , this.cameras.main.centerY , 'menuInicio');

        // const buttonJugar = new Button(this, 750, 205, 'JUGAR', 80, () => this.scene.start('SelecFacc'), 0.67);
        // const buttonAyuda = new Button(this, 756, 348, 'AYUDA', 70, () => this.scene.start('Ayuda'), 0.50);
        const botonCreditos = new Button(this, 760, 478, 'botonMarco', 'CREDITOS', 60, () => this.scene.start('Creditos'), 0.43);
        
        
      /*   const {width, height } = this.scale

        const button = this.add. rectangle (width * 0.5, height * 0.55, 150, 75, 0xffffff )
            .setInteractive()
            .on (Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.scene.start('Creditos')

            })



        this.add.text(button.x, button.y, 'CREDITOS', { 
            color: '#000000'
        })
 */

    }
}
