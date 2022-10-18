import Phaser from "phaser";
import {Button} from "../js/button";

export default class SeleccionFaccion extends Phaser.Scene
{
    listo1;
    listo2
    constructor(){
        super('SeleccionFaccion')
    }

    create() {
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'elegirFaccion')

        new Button(this, 70, 60, 'botonVolver', '', 0,  () => this.scene.start('MainMenu'), 0.75)

        new Button(this, 400, 600, 'botonListo', '', 0,  () => {this.listo1 = true}, 0.30)
        new Button(this, 800, 600, 'botonListo', '', 0,  () => {this.listo2 = true}, 0.30)
    
    }
    update(){
        if(this.listo1 && this.listo2 === true){
            this.scene.start('SeleccionPersonaje')
        }
    }
}
