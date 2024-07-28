import Phaser from "phaser"
import { sharedInstance } from "../../scenes/EventCenter";
import { loadFont } from "../Funciones/LoadFont";

export class BotonHabilidades /*extends Phaser.GameObjects.Sprite*/ {
    constructor(scene, x, y, texture, callback, indexDeSprite, infoHabilidad, xTexto, yTexto, handler){
        // super(scene, x, y, texture, callback)
        let evento;
        //({ useHandCursor: true }) agregar parametro para que sea false y el vikingo no le funcione el mouse/puntero
        // (handler === false)? evento = handler:;
        this.img = scene.add.sprite(x, y, texture, indexDeSprite)
        .setInteractive({ useHandCursor: handler })
        .on("pointerdown", () => callback())
        .on("pointerover", ()=> {this.img.setScale(1 + 0.08), this.mostrarInformacion()})
        .on("pointerout", ()=> {this.img.setScale(1), this.ocultarInformacion()})
        // this.contenedor = scene.add.container(x, y-(y/5.5))
        // sharedInstance.emit('mostrar texto boton', infoHabilidad)
        this.img.visible = true;

        this.textoInformacion = scene.add.text(xTexto, yTexto, infoHabilidad,{
            fontSize: '25px',
            fontFamily: 'asian',
            color: '#FFF',
            // align: 'center',
            // backgroundColor: '#434443',
            wordWrap: { width: 430 },
            // padding: {
            //     y: 10,
            //     x: 5
            // },
            // border: 5 ,
            // shadow: {
            //     color: '#2916e9',
            //     fill: true,
            //     offsetX: 2,
            //     offsetY: 2,
            //     blur: 8
            // }
        })
        // this.contenedor.add([this.textoInformacion])
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