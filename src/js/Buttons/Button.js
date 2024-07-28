import { getPhrase } from "../../services/translations";
import { sharedInstance } from "../../scenes/EventCenter";

export class Button
{
    constructor(scene, x, y, texture, text, size, callback, scale, objeto = null, eventoHover = null, eventoOut = null){
        
        this.obj = objeto
        this.informacion = [
            `${getPhrase(this.obj.clase).toUpperCase()} ${getPhrase(this.obj.tipo).toUpperCase()} `+
            ` ❤️ ${getPhrase('VIDA')}: `+ this.obj.vida+
            ` ⚡ ${getPhrase('VELOCIDAD')}:`+ this.obj.velocidad
        ];
        this.scale = scale;
        this.texture = texture;
        this.activo = true;
        this.container = scene.add.container(x, y)
        this.img = scene.add.image(0, 0, texture)
        .setInteractive({ useHandCursor: true })
        .setScale(scale)
        .on("pointerdown", () => callback())
        .on("pointerover", ()=> {this.img.setScale(scale - 0.02), sharedInstance.emit(eventoHover, texture, this.informacion)})
        .on("pointerout", ()=> {this.img.setScale(scale), sharedInstance.emit(eventoOut)})
        this.txt = scene.add.text(0, 0, text, {fontSize: size})
        .setOrigin(0.5)
        .setStyle({fontFamily: 'asian'})
        this.textoDeEstado = scene.add.text(0,0,'', {fontSize:30, fontFamily:'asian', color:`#F00`}).setOrigin(.5)
        this.container.add([this.img, this.txt, this.textoDeEstado])
    }
    desactivarEntrada({cartelParaMostrarDesactivado:cartelParaMostrarDesactivado}){
        this.img.removeInteractive()
        this.img.setTint(0x000000)
        this.textoDeEstado.setText(cartelParaMostrarDesactivado)
    }
}