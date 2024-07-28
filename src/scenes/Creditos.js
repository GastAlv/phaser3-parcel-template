import Phaser from "phaser";
import { getPhrase } from "../services/translations";
import { BotonSencillo } from "../js/Buttons/BotonSencillo";


export default class Creditos extends Phaser.Scene
{
    #language;
	constructor()
	{
		super('Creditos')
	}

    init(data){
        this.#language = data.language;
        this.sonidos = data.sonidos;
    }

    create()
    {
        let style = {fontFamily: 'asian', fontSize:'30px'}
        const fondoCreditos = this.add.image( this.cameras.main.centerX , this.cameras.main.centerY , 'creditos');
        const botonVolver = new BotonSencillo({scene:this, x:70, y:60, texture:'botonVolver', text:'', size:0,  callback:() => {this.scene.start('MainMenu', { language: this.#language, sonidos:this.sonidos}), this.registry.events.emit('resumen audio')}, scale:0.64,  callbackHover:()=>{this.sonidos.HoverBoton.play()}, callbackOut:()=>{this.sonidos.HoverBoton.pause()}})
        this.add.text(305, 620, getPhrase('PROGRAMACIÓN'), style).setOrigin(.5)
        this.add.text(305, 660, getPhrase('ARTE'), style).setOrigin(.5)

        this.add.text(650, 620, getPhrase('PROGRAMACIÓN'), style).setOrigin(.5)
        this.add.text(650, 660, getPhrase('ARTE'), style).setOrigin(.5)

        this.add.text(970, 600, getPhrase('DISEÑO DE JUEGO'), style).setOrigin(.5)
        this.add.text(970, 630, getPhrase('ARTE'), style).setOrigin(.5)
        this.add.text(970, 670, getPhrase('MUSICA'), style).setOrigin(.5)


    }
}
