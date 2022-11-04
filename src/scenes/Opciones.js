import Phaser from "phaser";
import languages from "../enums/languages";
import { BotonSencillo } from "../js/button";
import { getTranslations, getPhrase } from '../services/translations'

export default class Opciones extends Phaser.Scene
{
    #language
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
        
        new BotonSencillo({scene:this, x:70, y:60, texture:'botonVolver', text:'', size:0,  callback:() => this.scene.start('MainMenu', { language: this.#language }), scale:0.75, callbackHover:()=>{this.sonidos.HoverBoton.play()}, callbackOut:()=>{this.sonidos.HoverBoton.pause()}})
        
        this.add.text(500, 200, 'VOLUMEN', {fontSize:50, color:'#000', fontFamily:'asian'})
        new BotonSencillo({scene:this, x:810, y:200, texture:'botonMarco',text:'BAJAR VOLUMEN', size:45,callback:() =>{}, scale:.3, callbackHover:()=>{this.sonidos.HoverBoton.play()}, callbackOut:()=>{this.sonidos.HoverBoton.pause()}})
        new BotonSencillo({scene:this, x:1150, y:200, texture:'botonMarco',text:'SUBIR VOLUMEN', size:45,callback:() =>{}, scale:.3, callbackHover:()=>{this.sonidos.HoverBoton.play()}, callbackOut:()=>{this.sonidos.HoverBoton.pause()}})
        
        this.add.text(500, 400, 'SELECCIONA\n TU IDIOMA', {fontSize:50, color:'#000', fontFamily:'asian'})
        const buttonEspañol = new BotonSencillo({scene:this, x:820, y:450, texture:'españolAR', text:'ESPAÑOL', size:50,  color:'#1c80e3', callback:() =>{getTranslations('es-AR')}, scale:1, callbackHover:()=>{this.sonidos.HoverBoton.play()}, callbackOut:()=>{this.sonidos.HoverBoton.pause()}})
        const buttonIngles = new BotonSencillo({scene:this, x:1100, y:450, texture:'inglesUK', text:'INGLES', size:50,  color:'#1c80e3', callback:() =>{ getTranslations('en-UK')}, scale:1, callbackHover:()=>{this.sonidos.HoverBoton.play()}, callbackOut:()=>{this.sonidos.HoverBoton.pause()}})
        const buttonAleman = new BotonSencillo({scene:this, x:820, y:600, texture:'alemanDE', text:'ALEMAN', size:50,  color:'#1c80e3', callback:() =>{getTranslations('de-DE')}, scale:1, callbackHover:()=>{this.sonidos.HoverBoton.play()}, callbackOut:()=>{this.sonidos.HoverBoton.pause()}})
        const buttonPortuguez = new BotonSencillo({scene:this, x:1100, y:600, texture:'portuguezPR', text:'PORTUGUEZ', size:50,  color:'#1c80e3', callback:() =>{getTranslations('pt-BR')}, scale:1, callbackHover:()=>{this.sonidos.HoverBoton.play()}, callbackOut:()=>{this.sonidos.HoverBoton.pause()}})
    }
}