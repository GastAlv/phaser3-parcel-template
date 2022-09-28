import Phaser from "phaser";
import Button from "../js/button";

export default class SeleccionFaccion extends Phaser.Scene
{
    constructor(){
        super('SeleccionFaccion')
    }

    create() {
        const menuSeleccionFaccion = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'elegirFaccion')
        const botonVolver = new Button(this, 70, 60, 'botonVolver', '', 0,  () => this.scene.start('MainMenu'), 0.75)

        const botonListoS = new Button(this, 400, 600, 'botonListo', '', 0,  () => this.scene.start('SeleccionPersonaje'), 0.30)
        const botonListoV = new Button(this, 800, 600, 'botonListo', '', 0,  () => this.scene.start('SeleccionPersonaje'), 0.30)
    
    }
}
