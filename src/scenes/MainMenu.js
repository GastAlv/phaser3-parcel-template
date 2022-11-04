import Phaser from 'phaser'
import { BotonSencillo, Item } from '../js/button';
import { ManejadorDeSonidos } from '../js/ManejadorDeSonidos';
import { getTranslations, getPhrase } from '../services/translations'
import keys from '../enums/keys';


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
    #language
    Primera = true;
	constructor()
	{
		super('MainMenu')
	}
    init(data){
        this.#language = data.language;
    }
    create()
    {
        const sonidos = new ManejadorDeSonidos({scene:this, volumen:1, loop:true});
        sonidos.MainMenuSonido.play()
        

        const menuFondo = this.add.image( this.cameras.main.centerX , this.cameras.main.centerY , 'menuInicio');
        


        const buttonJugar = new BotonSencillo({scene:this, x:750, y:205, texture:'botonMarco', text:getPhrase('JUGAR'), size:80, callback:() => {this.scene.start('SeleccionFaccion', {sonidos: sonidos, language:this.#language}), this.registry.events.emit('resetear listas para jugar de nuevo')}, scale:0.67, callbackHover:()=>{sonidos.HoverBoton.play()}, callbackOut:()=>{sonidos.HoverBoton.pause()}});
        // const buttonAyuda = new Button(this, 756, 348, 'AYUDA', 70, () => this.scene.start('Ayuda'), 0.50);
        const botonAyuda = new BotonSencillo({scene:this, x:760, y:350, texture:'botonMarco', text:getPhrase('AYUDA'), size:40, callback:() => {this.scene.start('Ayuda', {sonidos: sonidos, language:this.#language})}, scale:0.5,  callbackHover:()=>{sonidos.HoverBoton.play()}, callbackOut:()=>{sonidos.HoverBoton.pause()}});
        
        const botonCreditos = new BotonSencillo({scene:this, x:760, y:478, texture:'botonMarco', text:getPhrase('CREDITOS'), size:40, callback:() => {this.scene.start('Creditos', {sonidos: sonidos, language:this.#language})}, scale:0.43,  callbackHover:()=>{sonidos.HoverBoton.play()}, callbackOut:()=>{sonidos.HoverBoton.pause()}});
        
        const botonOpciones = new BotonSencillo({scene:this, x:1210, y:60, texture:'botonOpciones', text:'', size:0, callback:() => {this.scene.start('Opciones', {sonidos: sonidos, language: this.#language })}, scale:0.72, callbackHover:()=>{sonidos.HoverBoton.play()}, callbackOut:()=>{sonidos.HoverBoton.pause()}});
        
    }
}
