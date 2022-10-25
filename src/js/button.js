import Phaser from "phaser"
import { sharedInstance } from "../scenes/EventCenter";







loadFont("asian", "assets/fuentes/OPTIAsian.otf");
export class BotonSencillo{
    constructor(scene, x, y, texture, text, size, callback, scale, objeto = null, eventoHover = null, eventoOut = null){
        this.scale = scale;
        this.activo = true;
        this.container = scene.add.container(x, y)
        this.img = scene.add.image(0, 0, texture)
        .setInteractive({ useHandCursor: true })
        .setScale(scale)
        .on("pointerdown", () => callback())
        .on("pointerover", ()=> {this.img.setScale(scale - 0.02), sharedInstance.emit(eventoHover,)})
        .on("pointerout", ()=> {this.img.setScale(scale), sharedInstance.emit(eventoOut)})
        this.txt = scene.add.text(0, 0, text, {fontSize: size})
        .setOrigin(0.5)
        .setStyle({fontFamily: 'asian'})
        this.container.add([this.img, this.txt])
    }
    desactivarEntrada(){
        this.img.removeInteractive()
        this.img.setTint(0x000000)
    }
}

export class Button
{
    constructor(scene, x, y, texture, text, size, callback, scale, objeto = null, eventoHover = null, eventoOut = null){
        
        this.obj = objeto
        this.informacion = [
            `${this.obj.clase} ${this.obj.tipo}`,
            '',
            '❤️ Vida: '+ this.obj.vida,
            '',
            '⚡ Velocidad: '+this.obj.velocidad,
            '',
            '🎯 Habilidades: ',
            this.obj.poderes[0].nombre,
            this.obj.poderes[1].nombre,
            this.obj.poderes[2].nombre,
            this.obj.poderes[3].nombre,
    ];
        this.scale = scale;
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
        this.container.add([this.img, this.txt])
    }
    desactivarEntrada(){
        this.img.removeInteractive()
        this.img.setTint(0x000000)
    }
}

export class BotonHabilidades extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, callback, indexDeSprite, infoHabilidad){
        super(scene, x, y, texture, callback)
        this.img = scene.add.image(x, y, texture, indexDeSprite)
        .setInteractive({ useHandCursor: true })
        .on("pointerdown", () => callback())
        .on("pointerover", ()=> {this.img.setScale(1 + 0.08), this.mostrarInformacion()})
        .on("pointerout", ()=> {this.img.setScale(1), this.ocultarInformacion()})
        this.contenedor = scene.add.container(x, y-(y/5.5))

        this.textoInformacion = scene.add.text(0, 0, infoHabilidad,{
            fontSize: '20px',
            fontFamily: 'Arial',
            color: '#000',
            align: 'center',
            backgroundColor: '#4f7abb',
            padding: {
                y: 10,
                x: 5
            },
            border: 5 ,
            shadow: {
                color: '#000000',
                fill: true,
                offsetX: 2,
                offsetY: 2,
                blur: 8
            }
        }).setOrigin(.5)
        this.contenedor.add([this.textoInformacion])
        this.textoInformacion.visible = false;
    }
    desactivarEntrada(){
        this.img.disableInteractive()
        this.img.setTint(0xFF0000)
    }
    activarEntrada(){
        this.img.setInteractive({ useHandCursor: true })
        this.img.clearTint()
    }
    mostrarInformacion(){
        this.textoInformacion.visible = true;
    }
    ocultarInformacion(){
        this.textoInformacion.visible = false;
    }

}

function loadFont(name, url) {
    var newFont = new FontFace(name, `url(${url})`);
    newFont.load().then(function (loaded) {
        document.fonts.add(loaded);
    }).catch(function (error) {
        return error;
    });
}
