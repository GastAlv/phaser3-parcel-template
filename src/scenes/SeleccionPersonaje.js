import Phaser from "phaser";
import Button from "../js/button";

export default class SeleccionPersonaje extends Phaser.Scene
{
    constructor(){
        super('SeleccionPersonaje')
    }

    create() {
        const menuSeleccionFaccion = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'seleccionPersonaje')
        const botonVolver = new Button(this, 70, 60, 'botonVolver', '', 0,  () => this.scene.start('Juego'), 0.75)

        // const botonListoS = new Button(this, 400, 600, 'botonListo', '', 0,  () => this.scene.start('MainMenu'), 0.4)
        // const botonListoV = new Button(this, 1000, 600, 'botonListo', '', 0,  () => this.scene.start('MainMenu'), 0.4)
    
    }
}
