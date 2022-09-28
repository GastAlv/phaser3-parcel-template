import Phaser from "phaser";
import Button from "../js/button";


export default class Creditos extends Phaser.Scene
{
	constructor()
	{
		super('Creditos')
	}



    create()
    {
        const fondoCreditos = this.add.image( this.cameras.main.centerX , this.cameras.main.centerY , 'creditos');

        const botonCreditos = new Button(this, 760, 478,'botonMarco', 'CREDITOS', 60, () => this.scene.start('MainMenu'), 0.43);


        // const buttonJugar = new Button(this, 750, 205, 'JUGAR', 80, () => this.scene.start('SelecFacc'), 0.67);
        // const buttonAyuda = new Button(this, 756, 348, 'AYUDA', 70, () => this.scene.start('Ayuda'), 0.50);
        // const buttonOpciones = new Button(this, 760, 478, 'CREDITOS', 60, () => this.scene.start('Creditos'), 0.43);


    }
}
