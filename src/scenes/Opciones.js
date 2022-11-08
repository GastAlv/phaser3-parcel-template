import Phaser from "phaser";
import languages from "../enums/languages";
import { BotonSencillo } from "../js/button";
import { getTranslations, getPhrase } from '../services/translations'
import { sharedInstance } from "./EventCenter";

export default class Opciones extends Phaser.Scene
{
    #language
    volumenBarAncho = 300;
    valor = .5;
    constructor()
    {
        super('Opciones')
        
    }
    init(data){
        this.sonidos = data.sonidos
        this.#language = data.language
    }
    create(){
        this.add.image( this.cameras.main.centerX , this.cameras.main.centerY , 'menuInicio');
        
        new BotonSencillo({scene:this, x:70, y:60, texture:'botonVolver', text:'', size:0,  callback:() => {this.scene.start('MainMenu', { language: this.#language, sonidos:this.sonidos})}, scale:0.75, callbackHover:()=>{this.sonidos.HoverBoton.play()}, callbackOut:()=>{this.sonidos.HoverBoton.pause()}})
        var progress = this.add.rectangle(820, 220, this.volumenBarAncho *this.valor, 5, 0x676766)
        sharedInstance.on('subir volumen', (valor)=>{
            console.log(this.valor,valor);
            this.valor += valor;
            (progress.width >= this.volumenBarAncho)?[console.log('El volumen es el maximo de phaser 3 :/'), progress.width = this.volumenBarAncho]:progress.width = this.volumenBarAncho*this.valor;
        })
        sharedInstance.on('bajar volumen', (valor)=>{
            this.valor -= valor;
            console.log(this.valor,valor);
            (progress.width <= 0)?[console.log('El volumen es 0'), progress.width = 0]:progress.width = this.volumenBarAncho*this.valor;

        })
        this.add.text(500, 200, 'VOLUMEN', {fontSize:50, color:'#000', fontFamily:'asian'})
        new BotonSencillo({scene:this, x:700, y:220, texture:'bajarVolumen',text:'', size:45,callback:() =>{sharedInstance.emit('bajar volumen', 0.1)}, scale:.3, callbackHover:()=>{this.sonidos.HoverBoton.play()}, callbackOut:()=>{this.sonidos.HoverBoton.pause()}})
        new BotonSencillo({scene:this, x:1110, y:220, texture:'subirVolumen',text:'', size:45,callback:() =>{sharedInstance.emit('subir volumen', 0.1)}, scale:.3, callbackHover:()=>{this.sonidos.HoverBoton.play()}, callbackOut:()=>{this.sonidos.HoverBoton.pause()}})
        
        this.add.text(500, 400, 'SELECCIONA\n TU IDIOMA', {fontSize:50, color:'#000', fontFamily:'asian'})
        const buttonEspañol = new BotonSencillo({scene:this, x:820, y:450, texture:'españolAR', text:'', size:50,  color:'#1c80e3', callback:() =>{getTranslations('es-AR')}, scale:1, callbackHover:()=>{this.sonidos.HoverBoton.play()}, callbackOut:()=>{this.sonidos.HoverBoton.pause()}})
        const buttonIngles = new BotonSencillo({scene:this, x:1100, y:450, texture:'inglesUK', text:'', size:50,  color:'#1c80e3', callback:() =>{ getTranslations('en-UK')}, scale:1, callbackHover:()=>{this.sonidos.HoverBoton.play()}, callbackOut:()=>{this.sonidos.HoverBoton.pause()}})
        const buttonAleman = new BotonSencillo({scene:this, x:820, y:600, texture:'alemanDE', text:'', size:50,  color:'#1c80e3', callback:() =>{getTranslations('de-DE')}, scale:1, callbackHover:()=>{this.sonidos.HoverBoton.play()}, callbackOut:()=>{this.sonidos.HoverBoton.pause()}})
        const buttonPortuguez = new BotonSencillo({scene:this, x:1100, y:600, texture:'portuguezPR', text:'', size:50,  color:'#1c80e3', callback:() =>{getTranslations('pt-BR')}, scale:1, callbackHover:()=>{this.sonidos.HoverBoton.play()}, callbackOut:()=>{this.sonidos.HoverBoton.pause()}})
    }
}