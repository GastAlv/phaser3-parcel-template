import Phaser from "phaser";
import { getPhrase } from '../services/translations'
import { BotonSencillo } from "../js/Buttons/BotonSencillo";
import { Tecla } from "../js/Tecla";

export default class Ayuda extends Phaser.Scene
{
    #language
    volumenBarAncho = 300;
    valor = .5;
    constructor()
    {
        super('Ayuda')
        
    }
    init(data){
        this.sonidos = data.sonidos
        this.#language = data.language
    }
    create(){
        this.add.image(this.cameras.main.centerX , this.cameras.main.centerY , 'escenarioAyuda');
        new BotonSencillo({scene:this, x:70, y:60, texture:'botonVolver', text:'', size:0,  callback:() => {this.scene.start('MainMenu', { language: this.#language, sonidos:this.sonidos})}, scale:0.75, callbackHover:()=>{this.sonidos.HoverBoton.play()}, callbackOut:()=>{this.sonidos.HoverBoton.pause()}})
    
        let style = {
            fontSize: '40px',
            fontFamily: 'asian',
            color: '#000',
            border: 5 ,
            wordWrap: { width: 300 },
        }
        this.add.text(this.cameras.main.centerX , 50, getPhrase('TECLAS Y CONTROLES'), style).setOrigin(.5)
        // this.add.text(this.cameras.main.centerX , 50, 'TECLAS Y CONTROLES', style).setOrigin(.5)
        //Ayuda samurai
        this.add.image(this.cameras.main.centerX-(this.cameras.main.centerX/2), this.cameras.main.centerY-(this.cameras.main.centerY/2), 'samuraiIcono')
        new Tecla({scene:this, x:330, y:300, textura:'teclaIcono', texto:'W', tamaño:'40px'})
        new Tecla({scene:this, x:260, y:365, textura:'teclaIcono', texto:'A', tamaño:'40px'})
        new Tecla({scene:this, x:330, y:365, textura:'teclaIcono', texto:'S', tamaño:'40px'})
        new Tecla({scene:this, x:400, y:365, textura:'teclaIcono', texto:'D', tamaño:'40px'})
        style.fontSize = '20px';
        this.add.text(370 , 280, getPhrase('DEZPLAZATE POR LAS HABILIDADES Y EL INVENTARIO DEL SAMURAI'), style)
        // this.add.text(370 , 300, 'DEZPLAZATE POR LAS HABILIDADES DEL SAMURAI', style)
        new Tecla({scene:this, x:260, y:430, textura:'teclaIcono', texto:'Q', tamaño:'40px', textoExplicativo:getPhrase('ABRE EL INVENTARIO DEL SAMURAI')})
        new Tecla({scene:this, x:260, y:495, textura:'teclaIcono', texto:'E', tamaño:'40px', textoExplicativo:getPhrase('CIERRA EL INVENTARIO DEL SAMURAI')})


        //Ayuda vikingo
        this.add.image(this.cameras.main.centerX+(this.cameras.main.centerX/2), this.cameras.main.centerY-(this.cameras.main.centerY/2), 'vikingoIcono')
        new Tecla({scene:this, x:750, y:300, textura:'ratonIcono', texto:'', tamaño:'40px', textoExplicativo:getPhrase('CON EL RATON PUEDES DESPLAZARTE POR TODAS LAS HABILIDADES E INVENTARIO DEL VIKINGO')})
    }
}