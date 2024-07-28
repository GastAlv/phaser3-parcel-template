import { sharedInstance } from "../scenes/EventCenter";
import {ManejadorDeSonidos}from "../js/ManejadorDeSonidos"

export class Item{
    constructor(props){
        const {scene:scene, x:x, y:y, texture: texture, nombreDelObjeto: nombreDelObjeto, paraQuien: paraQuien, idEnSpritesheet:idEnSpritesheet, descripcion: descripcion} = props;
        this.scene = scene;
        this.texture = texture;
        this.paraQuien = paraQuien;
        this.nombreDelObjeto = nombreDelObjeto;
        this.idEnSpritesheet = idEnSpritesheet;
        this.descripcion = descripcion;
        this.tween;
        this.MaxContenedor = this.scene.add.container(x, y)
        this.contenedor = scene.add.container(0,0);
        this.item = scene.add.image(0, 0, texture, this.idEnSpritesheet);
        this.item.setInteractive({useHandCursor: true}).on("pointerdown", () => {this.guardarItem()}).on('pointerover', ()=>{this.mostrarTexto()}).on('pointerout', ()=>{this.ocultarTexto()})
        // this.texto = this.scene.add.text((x+100), y+(90-30),'',{fontSize:20}).setOrigin()
        this.texto = this.scene.add.text(0, -30,'',{fontSize:20, fontFamily:'asian'}).setOrigin()
        this.contenedor.add([this.item, this.texto]);
        this.MaxContenedor.add([this.contenedor]);
        this.sonidos = new ManejadorDeSonidos({scene:this.scene, volumen:1, loop:false})
    }
    /*Se crearon dos contenedores devido que, al almacenar en uno tanto el texto como la imagen, colocaba todas las imagenes en las mismas posiciones.
    y se buscaba que el texto este arriba hasta cuando mientras el loot era soltado en caso de que el jugador coloque el puntero sobre el sprite
    otra solucion es darle al texto la misma x mas lo que le agrega el TWEEN y lo mismo la y (ejemplo linea 223 de button.js) pero si coloque el puntero sobre el sprite
    le iba a mostrar el texto en la posicion final del puntero.
    Creando dos contenedos, uno que almacene el sprite y el texto, y darle este mismo como target al TWEEN y almacenar ese mismo en otro contenedor se logra el objetivo
    */
    soltarItem(){
        let direccion;
        this.sonidos.DropObject.play();
        (this.paraQuien==='Samurai')?[direccion = -100]:[direccion = 100];
        this.tween = this.scene.tweens.add({
            targets: this.contenedor,
            props: {
                x: { value: direccion, duration: 2000, ease: 'Power2' },
                y: { value: 100, duration: 1500, ease: 'Bounce.easeOut' }
            },
            onComplete: ()=>{}
        });
        this.tween.seek(0.9);
    }
    guardarItem(){
        this.sonidos.GuardarObjeto.play()
        this.item.visible= false;
        sharedInstance.emit('agregar item',this.texture, this.paraQuien, this.nombreDelObjeto)
    }
    mostrarTexto(){
        this.texto.setText(this.descripcion)
    }
    ocultarTexto(){
        this.texto.setText('')
    }
}