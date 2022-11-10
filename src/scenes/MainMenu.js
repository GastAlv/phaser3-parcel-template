import Phaser from 'phaser'
import { BotonSencillo} from '../js/button';
import { getPhrase } from '../services/translations'
export default class MainMenu extends Phaser.Scene
{
    #lenguaje
    Primera = true;
	constructor()
	{
		super('MainMenu')
	}
    init(data){
        this.#lenguaje = data.lenguaje;
        this.sonidos = data.sonidos;
    }
    create()
    {
        console.log(Math.round(.49))
        this.cameras.main.fadeIn(2000);
        this.sonidos.MainMenuSonido.play()
        this.add.image( this.cameras.main.centerX , this.cameras.main.centerY , 'menuInicio');
        new BotonSencillo({scene:this, x:750, y:205, texture:'botonMarco', text:getPhrase('JUGAR'), size:80, callback:() => {this.scene.start('SeleccionFaccion', {sonidos: this.sonidos, lenguaje:this.#lenguaje}), this.registry.events.emit('resetear listas para jugar de nuevo')}, scale:0.67, callbackHover:()=>{this.sonidos.HoverBoton.play()}, callbackOut:()=>{this.sonidos.HoverBoton.pause()}});        
        new BotonSencillo({scene:this, x:760, y:390, texture:'botonMarco', text:getPhrase('CREDITOS'), size:40, callback:() => {this.scene.start('Creditos', {sonidos: this.sonidos, lenguaje:this.#lenguaje})}, scale:0.57,  callbackHover:()=>{this.sonidos.HoverBoton.play()}, callbackOut:()=>{this.sonidos.HoverBoton.pause()}});
        new BotonSencillo({scene:this, x:1210, y:60, texture:'botonOpciones', text:'', size:0, callback:() => {this.scene.start('Opciones', {sonidos: this.sonidos, lenguaje: this.#lenguaje})}, scale:0.72, callbackHover:()=>{this.sonidos.HoverBoton.play()}, callbackOut:()=>{this.sonidos.HoverBoton.pause()}});
    }
}
