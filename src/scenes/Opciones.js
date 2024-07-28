import Phaser from "phaser";
import { sharedInstance } from "./EventCenter";
import { FETCHED, FETCHING, READY, TODO } from '../enums/status'
import { getTranslations, getPhrase } from '../services/translations'
import { BotonSencillo } from "../js/Buttons/BotonSencillo";

export default class Opciones extends Phaser.Scene
{
    #lenguaje
    volumenBarAncho = 300;
    #wasChangedLanguage = TODO
    valor = .5;
    constructor()
    {
        super('Opciones')
    }
    init(data){
        this.sonidos = data.sonidos
        this.#lenguaje = data.lenguaje
    }
    create(){
        this.add.image( this.cameras.main.centerX , this.cameras.main.centerY , 'menuInicio');
        new BotonSencillo({scene:this, x:70, y:60, texture:'botonVolver', text:'', size:0,  callback:() => {this.scene.start('MainMenu', { language: this.#lenguaje, sonidos:this.sonidos})}, scale:0.75, callbackHover:()=>{this.sonidos.HoverBoton.play()}, callbackOut:()=>{this.sonidos.HoverBoton.pause()}})
        var barraDeVolumen = this.add.rectangle(820, 220, this.volumenBarAncho *this.valor, 5, 0x676766)
        sharedInstance.on('subir volumen', (valor)=>{
            (this.valor >= 0.99)?null:this.valor += valor;
            console.log(this.valor);
            (barraDeVolumen.width >= 299)?[console.log('El volumen es el maximo de phaser 3 :/'), barraDeVolumen.width = this.volumenBarAncho]:barraDeVolumen.width = this.volumenBarAncho*this.valor;
        })
        sharedInstance.on('bajar volumen', (valor)=>{
            (this.valor < 0.1)?this.valor = 0:this.valor -= valor;
            console.log(this.valor);
            if(barraDeVolumen.width <= 0){
                return barraDeVolumen.width = 0;
            }else{
                barraDeVolumen.width = this.volumenBarAncho*this.valor;
            }
            console.log(barraDeVolumen.width);
        })
        this.textoVolumen = this.add.text(500, 200, getPhrase('VOLUMEN'), {fontSize:50, color:'#000', fontFamily:'asian'})
        new BotonSencillo({scene:this, x:700, y:220, texture:'bajarVolumen',text:'', size:45,callback:() =>{sharedInstance.emit('bajar volumen', 0.1)}, scale:.3, callbackHover:()=>{this.sonidos.HoverBoton.play()}, callbackOut:()=>{this.sonidos.HoverBoton.pause()}})
        new BotonSencillo({scene:this, x:1110, y:220, texture:'subirVolumen',text:'', size:45,callback:() =>{sharedInstance.emit('subir volumen', 0.1)}, scale:.3, callbackHover:()=>{this.sonidos.HoverBoton.play()}, callbackOut:()=>{this.sonidos.HoverBoton.pause()}})
        this.textoLenguajes = this.add.text(530, 400, getPhrase('SELECCIONA TU IDIOMA'), {fontSize:50, color:'#000', fontFamily:'asian', wordWrap: { width: 200 }})
        new BotonSencillo({scene:this, x:820, y:450, texture:'españolAR', text:'', size:50,  color:'#1c80e3', callback:() =>{this.getTranslations('es-AR')}, scale:1, callbackHover:()=>{this.sonidos.HoverBoton.play()}, callbackOut:()=>{this.sonidos.HoverBoton.pause()}})
        new BotonSencillo({scene:this, x:1100, y:450, texture:'inglesUK', text:'', size:50,  color:'#1c80e3', callback:() =>{ this.getTranslations('en-UK')}, scale:1, callbackHover:()=>{this.sonidos.HoverBoton.play()}, callbackOut:()=>{this.sonidos.HoverBoton.pause()}})
        new BotonSencillo({scene:this, x:820, y:600, texture:'alemanDE', text:'', size:50,  color:'#1c80e3', callback:() =>{this.getTranslations('de-DE')}, scale:1, callbackHover:()=>{this.sonidos.HoverBoton.play()}, callbackOut:()=>{this.sonidos.HoverBoton.pause()}})
        new BotonSencillo({scene:this, x:1100, y:600, texture:'portuguezPR', text:'', size:50,  color:'#1c80e3', callback:() =>{this.getTranslations('pt-BR')}, scale:1, callbackHover:()=>{this.sonidos.HoverBoton.play()}, callbackOut:()=>{this.sonidos.HoverBoton.pause()}})
    }
    updateWasChangedLanguage = () => {
        this.#wasChangedLanguage = FETCHED
    };
    async getTranslations(language){
        this.#lenguaje = language;
        this.#wasChangedLanguage = FETCHING;
        await getTranslations(language, this.updateWasChangedLanguage)
    }
    update(){
        if(this.#wasChangedLanguage === FETCHED){
            this.#wasChangedLanguage = READY;
            this.textoVolumen.setText(getPhrase('VOLUMEN'))
            this.textoLenguajes.setText(getPhrase('SELECCIONA TU IDIOMA'))
        }
    }
}