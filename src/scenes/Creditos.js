import Phaser from "phaser";
import Button, { BotonSencillo } from "../js/button";


export default class Creditos extends Phaser.Scene
{
	constructor()
	{
		super('Creditos')
	}



    create()
    {
        const fondoCreditos = this.add.image( this.cameras.main.centerX , this.cameras.main.centerY , 'creditos');
        const botonVolver = new BotonSencillo(this, 70, 60, 'botonVolver', '', 0,  () => {this.scene.start('MainMenu'), this.registry.events.emit('resumen audio')}, 0.64)

        // const botonCreditos = new BotonSencillo(this, 760, 478,'botonMarco', 'CREDITOS', 60, () => this.scene.start('MainMenu'), 0.43);




    }
}
