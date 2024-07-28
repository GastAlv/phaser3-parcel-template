import Phaser from "phaser"
import { sharedInstance } from "../../scenes/EventCenter";
import { loadFont } from "../Funciones/LoadFont";

loadFont("asian", "assets/fuentes/OPTIAsian.otf");

export class BotonSencillo {
    constructor(props){
        const {scene:scene, x:x, y:y, texture:texture, text:text, size:size, callback:callback, scale:scale, objeto:objeto, eventoHover:eventoHover, callbackHover:callbackHover, eventoOut:eventoOut, callbackOut:callbackOut, color=null} = props

        this.scale = scale;
        this.activo = true;
        this.container = scene.add.container(x, y)
        this.img = scene.add.image(0, 0, texture)
        .setInteractive({ useHandCursor: true })
        .setScale(scale)
        .on("pointerdown", () => callback())
        .on("pointerover", ()=> {this.img.setScale(scale - 0.02), sharedInstance.emit(eventoHover), callbackHover()})
        .on("pointerout", ()=> {this.img.setScale(scale), sharedInstance.emit(eventoOut), callbackOut()})
        this.txt = scene.add.text(0, 0, text, {fontSize: size, color:color, fontFamily:'asian'})
        .setOrigin(0.5)
        this.container.add([this.img, this.txt])
    }
    desactivarEntrada(){
        this.img.removeInteractive()
        this.img.setTint(0x000000)
    }
    activarEntrada(){
        this.img.setInteractive({ useHandCursor: true })
        this.img.clearTint()
    }
}