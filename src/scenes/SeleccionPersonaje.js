
import Phaser from "phaser";
import Button from "../js/button";

export default class SeleccionPersonaje extends Phaser.Scene
{
    botonListo1 = false
    botonListo2 = false
    #samuraiPeon
    #vikingoPeon
    

    constructor(){
        super('SeleccionPersonaje')
    }

    create() {
        const menuSeleccionFaccion = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'seleccionPersonaje')
        const botonVolver = new Button(this, 70, 60, 'botonVolver', '', 0,  () => this.scene.start('Juego'), 0.75)

        // const botonListoS = new Button(this, 400, 600, 'botonListo', '', 0,  () => this.scene.start('MainMenu'), 0.4)
        // const botonListoV = new Button(this, 1000, 600, 'botonListo', '', 0,  () => this.scene.start('MainMenu'), 0.4)
    

        this.#vikingoPeon = {
            vida: 100,
            tiempo: 15,
            sprite: 'personajePeonVikingo',
            poderes: [],
            velocidad: 8,
            defensa: 7,
            estaVivo: true
        };
        
        this.#samuraiPeon = {
            vida: 100,
            tiempo: 15,
            sprite: 'personajePeonSamurai',
            poderes: [],
            velocidad: 8,
            defensa: 7,
            estaVivo: true
        }

        const vikingoReyna = {
            vida: 100,
            tiempo: 15,
            sprite: '',
            poderes: [],
            velocidad: 8,
            defensa: 7,
            estaVivo: true
            
        }

        const botonPeonVikingo = new Button(this, 400, 400, 'botonMarco', '', 0, () => {this.botonListo1 = true}, 0.5)
        const botonPeonSamurai = new Button(this, 800, 400, 'botonMarco', '', 0, () => {this.botonListo2 = true}, 0.5)

    }
    update(){
            
        if(this.botonListo1 && this.botonListo2)
        {
            const personajes = [this.#samuraiPeon, this.#vikingoPeon]
            this.scene.start('Juego', {personajes} )

        }
    }
}
