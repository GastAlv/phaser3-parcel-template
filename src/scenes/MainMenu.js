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
        const menuFondo = this.add.image( this.cameras.main.centerX , this.cameras.main.centerY , 'menuInicio');
        


        const buttonJugar = new Button(this, 750, 205, 'botonMarco', 'JUGAR', 80, () => this.scene.start('SeleccionFaccion'), 0.67);
        // const buttonAyuda = new Button(this, 756, 348, 'AYUDA', 70, () => this.scene.start('Ayuda'), 0.50);
        const botonCreditos = new Button(this, 760, 478, 'botonMarco', 'CREDITOS', 60, () => this.scene.start('Creditos'), 0.43);
        
        const botonOpciones = new Button(this, 1210, 60, 'botonOpciones', '', 0, () => this.scene.start('Creditos'), 0.72);
        

    }
}
