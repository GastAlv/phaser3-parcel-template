import Phaser from "phaser";
import {BotonSencillo, Button} from "../js/button";
import { getPhrase } from "../services/translations";

export default class SeleccionFaccion extends Phaser.Scene
{
    listo1;
    listo2;
    #languaje;
    constructor(){
        super('SeleccionFaccion')
    }

    init(data){
        this.sonidos = data.sonidos
        this.#languaje = data.language
    }
    create() {
        this.sonidos.MainMenuSonido.resume()
        
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'elegirFaccion')

        new BotonSencillo({scene:this, x:70, y:60, texture:'botonVolver', text:'', size:0,  callback:() => this.scene.start('MainMenu', {sonidos:this.sonidos, languaje:this.#languaje}), scale:0.75, callbackHover:()=>{this.sonidos.HoverBoton.play()}, callbackOut:()=>{this.sonidos.HoverBoton.pause()}})

        new BotonSencillo({scene:this, x:330, y:630, texture:'botonListo', text:getPhrase('LISTO'), size:50,  callback:() => {this.listo1 = true}, scale:0.70, callbackHover:()=>{this.sonidos.HoverBoton.play()}, callbackOut:()=>{this.sonidos.HoverBoton.pause()}})
        new BotonSencillo({scene:this, x:950, y:630, texture:'botonListo', text:getPhrase('LISTO'), size:50,  callback:() => {this.listo2 = true}, scale:0.70, callbackHover:()=>{this.sonidos.HoverBoton.play()}, callbackOut:()=>{this.sonidos.HoverBoton.pause()}})
    
    }
    update(){
        if(this.listo1 && this.listo2 === true){
            this.scene.start('SeleccionPersonaje', {sonidos:this.sonidos, languaje:this.#languaje})
        }
    }
}
