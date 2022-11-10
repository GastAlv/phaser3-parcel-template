import Phaser from "phaser"
import { sharedInstance } from "../scenes/EventCenter";
import { getPhrase } from "../services/translations";
import { ManejadorDeSonidos } from "./ManejadorDeSonidos";


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

export function loadFont(name, url) {
    var newFont = new FontFace(name, `url(${url})`);
    newFont.load().then(function (loaded) {
        document.fonts.add(loaded);
    }).catch(function (error) {
        return error;
    });
}

export class Inventario{
    //ESTE INVENTARIO SOLO MUESTRA 6 ITEMS
    apertura;
    //el espacio usado es 1 pero este es el primero que se va a ocupar. si se pone 0 se tendria que poner 0 en la funcion dondeGuardar()
    espacioUsadoDeInventario = 1;

    tipoObjetoUno;
    tipoObjetoDos;
    tipoObjetoTres;
    tipoObjetoCuatro;
    tipoObjetoCinco;
    tipoObjetoSeis;

    items = []
    selectedButtonIndex = 0;

    espacioOcupadoUno = false;
    espacioOcupadoDos = false;
    espacioOcupadoTres = false;
    espacioOcupadoCuatro = false;
    espacioOcupadoCinco = false;
    espacioOcupadoSeis = false;
    espacio = [this.espacioOcupadoUno, this.espacioOcupadoDos, this.espacioOcupadoTres, this.espacioOcupadoCuatro, this.espacioOcupadoCinco, this.espacioOcupadoSeis];

    

    constructor(props){
        const {scene:scene, ubicacionInicio = {}, ubicacionFinal = {}, tipo: tipo} = props;
        this.scene = scene
        this.ubicacionInicio = ubicacionInicio;
        this.ubicacionFinal = ubicacionFinal;

        
        //MOCHILA CERRADA
        // this.contenedorMochila = scene.add.container(this.ubicacionInicio.x, this.ubicacionInicio.y)
        this.mochilaCerrada = new BotonSencillo({scene:scene, x:this.ubicacionInicio.x, y:this.ubicacionInicio.y, texture:'mochilaCerrada', text:'', size:0, callback:()=>{this.abrirMochila()}, scale:1, callbackHover:()=>{}, callbackOut:()=>{}});
        this.notificacionObjetos = this.scene.add.text(this.ubicacionInicio.x, (this.ubicacionInicio.y - 60), '0', {fontFamily: 'Arial', fonstSize:30, fontWeight: 'bold'});
        // this.contenedorMochila.add([this.mochilaCerrada, this.notificacionObjetos]);
        //MOCHILA ABIERTA
        this.contenedor = scene.add.container(this.ubicacionInicio.x, this.ubicacionInicio.y).setScale(.5)
        this.imgMochila = scene.add.image(0, 0,'mochilaAbierta').setOrigin(.5)
        this.tipo = tipo;
        this.evento = tipo +' usar objeto'
        
        this.item1 = scene.add.image(-50,-60,'empty', 1).setInteractive({useHandCursor: true}).setOrigin(0, 0).on('pointerdown', ()=>{this.usarObjeto({espacioOcupado:this.espacioOcupadoUno, tipoDeObjeto:this.tipoObjetoUno, item: this.item1, indexDelEspacio:1})}).on('pointerover', ()=>{console.log(this.tipoObjetoUno);})
        this.item2 = scene.add.image(30,-60,'empty', 2).setInteractive({useHandCursor: true}).setOrigin(0, 0).on('pointerdown', ()=>{(this.espacioOcupadoDos === true)?[sharedInstance.emit(this.evento, this.tipoObjetoDos), this.objetoUsado(this.item2, 2)]:console.log('Espacio vacio');}).on('pointerover', ()=>{console.log(this.tipoObjetoDos);})
        this.item3 = scene.add.image(-50, 0,'empty', 3).setInteractive({useHandCursor: true}).setOrigin(0, 0).on('pointerdown', ()=>{(this.espacioOcupadoTres === true)?[sharedInstance.emit(this.evento, this.tipoObjetoTres), this.objetoUsado(this.item3, 3)]:console.log('Espacio vacio');}).on('pointerover', ()=>{console.log(this.tipoObjetoTres);})
        this.item4 = scene.add.image(30, 0,'empty', 4).setInteractive({useHandCursor: true}).setOrigin(0, 0).on('pointerdown', ()=>{(this.espacioOcupadoCuatro === true)?[sharedInstance.emit(this.evento, this.tipoObjetoCuatro), this.objetoUsado(this.item4, 4)]:console.log('Espacio vacio');}).on('pointerover', ()=>{console.log(this.tipoObjetoCuatro);})
        this.item5 = scene.add.image(-50, 60,'empty', 2).setInteractive({useHandCursor: true}).setOrigin(0, 0).on('pointerdown', ()=>{(this.espacioOcupadoCinco === true)?[sharedInstance.emit(this.evento, this.tipoObjetoCinco), this.objetoUsado(this.item5, 5)]:console.log('Espacio vacio');}).on('pointerover', ()=>{console.log(this.tipoObjetoCinco);})
        this.item6 = scene.add.image(30, 60,'empty', 1).setInteractive({useHandCursor: true}).setOrigin(0, 0).on('pointerdown', ()=>{(this.espacioOcupadoSeis === true)?[sharedInstance.emit(this.evento, this.tipoObjetoSeis), this.objetoUsado(this.item6, 6)]:console.log('Espacio vacio');}).on('pointerover', ()=>{console.log(this.tipoObjetoSeis);})
        this.selector = scene.add.image(0, 0, 'marcoSelector').setScale(.33).setOrigin(0, 0)
        this.items.push(this.item1)
        this.items.push(this.item2)
        this.items.push(this.item3)
        this.items.push(this.item4)
        this.items.push(this.item5)
        this.items.push(this.item6)

        this.cruz = scene.add.image(0, 0, 'crus').setInteractive({useHandCursor: true}).on("pointerdown", () => this.cerrarMochila()).setScale(.3).setOrigin(2.5,2.5)
        this.contenedor.add([this.imgMochila, this.item1, this.item2, this.item3, this.item4, this.item5, this.item6, this.cruz, this.selector])
        // this.contenedor.add([this.imgMochila, this.cruz])
        this.contenedor.visible = false
        this.cruz.visible = false
        this.sonidos = new ManejadorDeSonidos({scene:scene, volumen:1, loop:false})

        sharedInstance.on('mover selector', (ADondeMover)=>{
            this.selectNextButton(ADondeMover);
        });
        

        sharedInstance.on('actualizar notificacion', (notificacion, AQueMochila)=>{
            (AQueMochila === this.tipo)?this.notificacionObjetos.setText(notificacion):null;
            
        });
        //QUE PASA CUANDO LA MOCHILA ESTA LLENA Y SE QUIERE AGREGAR OTRO PODER
        sharedInstance.on('inventario lleno', ()=>{
            console.log('INVENTARIO LLENO');

        });
        //-----------------------------------------------------------------------
        sharedInstance.on('agregar item', (texture, MochilaDeQuien, nombreDelObjeto)=>{
            // console.log(dondeGuardarElTipo);
            (this.espacioUsadoDeInventario === 1)?this.tipoObjetoUno = nombreDelObjeto:null;
            (this.espacioUsadoDeInventario === 2)?this.tipoObjetoDos = nombreDelObjeto:null;
            (this.espacioUsadoDeInventario === 3)?this.tipoObjetoTres = nombreDelObjeto:null;
            (this.espacioUsadoDeInventario === 4)?this.tipoObjetoCuatro = nombreDelObjeto:null;
            (this.espacioUsadoDeInventario === 5)?this.tipoObjetoCinco = nombreDelObjeto:null;
            (this.espacioUsadoDeInventario === 6)?this.tipoObjetoSeis = nombreDelObjeto:null;
            // dondeGuardarElTipo[this.espacioUsadoDeInventario];
            const ocuparEspacio = {
                1:this.espacioOcupadoUno = true,
                2:this.espacioOcupadoDos = true,
                3:this.espacioOcupadoTres = true,
                4:this.espacioOcupadoCuatro = true,
                5:this.espacioOcupadoCinco = true,
                6:this.espacioOcupadoSeis = true,
            };
            (MochilaDeQuien === this.tipo)?[ocuparEspacio[this.espacioUsadoDeInventario]/*, dondeGuardarElTipo[this.espacioUsadoDeInventario]*/]:null;

            (this.espacioUsadoDeInventario === 7)?sharedInstance.emit('inventario lleno'):[(MochilaDeQuien === this.tipo)?[this.dondeGuardar(this.espacioUsadoDeInventario, texture), sharedInstance.emit('actualizar notificacion', this.espacioUsadoDeInventario, MochilaDeQuien), this.espacioUsadoDeInventario++]:null];
        });
        sharedInstance.on('objeto usado', (indexEspacio)=>{
            this.vaciarEspacio = {
                1:this.espacioOcupadoUno = false,
                2:this.espacioOcupadoDos = false,
                3:this.espacioOcupadoTres = false,
                4:this.espacioOcupadoCuatro = false,
                5:this.espacioOcupadoCinco = false,
                6:this.espacioOcupadoSeis = false,
            };
            console.log('el objeto es el ', indexEspacio,this.vaciarEspacio[indexEspacio])
        });
    }
    selectButton(index)
    {
        const currentButton = this.items[this.selectedButtonIndex]

        // set the current selected button to a white tint
        currentButton.clearTint()

        const item = this.items[index]

        // set the newly selected button to a green tint
        item.setTint(0xabaaf3)

        // move the hand cursor to the right edge
        this.selector.x = item.x
        this.selector.y = item.y

        // store the new selected index
        this.selectedButtonIndex = index
    }
    selectNextButton(change = 1)
    {
        let index = this.selectedButtonIndex + change

        // wrap the index to the front or end of array
        if (index >= this.items.length)
        {
            index = 0
        }
        else if (index < 0)
        {
            index = this.items.length - 1
        }
        this.selectButton(index)
    }
    setEspacio(indexEspacio){
        console.log(this.espacio);
        (indexEspacio === 1)?this.espacioOcupadoUno = false:null;
        (indexEspacio === 2)?this.espacioOcupadoDos = false:null;
        (indexEspacio === 3)?this.espacioOcupadoTres = false:null;
        (indexEspacio === 4)?this.espacioOcupadoCuatro = false:null;
        (indexEspacio === 5)?this.espacioOcupadoCinco = false:null;
        (indexEspacio === 6)?this.espacioOcupadoSeis = false:null;
        console.log(this.espacio)
    }
    cerrarMochila(){
        sharedInstance.emit('abrir o cerrar la mochila', false)
        this.contenedor.x = this.ubicacionInicio.x;
        this.contenedor.y = this.ubicacionInicio.y;
        this.contenedor.visible = false;
        this.contenedor.setScale(.1)
        this.cruz.visible = false
        this.mochilaCerrada.activarEntrada();
    }

    abrirMochila(){
        this.selectButton(0)
        sharedInstance.emit('abrir o cerrar la mochila', true)
        this.sonidos.AbrirInventario.play()
        this.contenedor.visible = true;
        this.cruz.visible = true;
        this.contenedor.setScale(1)
        this.apertura = this.scene.tweens.add({
            targets: this.contenedor,
            x: this.ubicacionFinal.x,
            y:this.ubicacionFinal.y,
            duration: 1000,
            ease: 'Power2',
            // completeDelay: 2000,
            scale:1,
            onComplete:()=>{console.log('acabeee')},
        });
        this.mochilaCerrada.desactivarEntrada()

    }
    desactivarMochila(){
        this.mochilaCerrada.desactivarEntrada()
        this.cerrarMochila()
    }
    activarMochila(){
        this.mochilaCerrada.activarEntrada()
    }
    dondeGuardar(index, sprite){
        (index === 1)?this.item1.setTexture(sprite, index):null;
        (index === 2)?this.item2.setTexture(sprite, index):null;
        (index === 3)?this.item3.setTexture(sprite, index):null;
        (index === 4)?this.item4.setTexture(sprite, index):null;
        (index === 5)?this.item5.setTexture(sprite, index):null;
        (index === 6)?this.item6.setTexture(sprite, index):null;
    }
    mostrarQueItemHay(){

    }
    objetoUsado(item ,indexEspacio){
        this.setEspacio(indexEspacio);
        item.setTexture('empty')
    }
    usarObjeto({espacioOcupado, tipoDeObjeto, item, indexDelEspacio}){
        
        (espacioOcupado === true)?[sharedInstance.emit(this.evento, tipoDeObjeto), this.objetoUsado(item, indexDelEspacio), this.sonidos.UsarInventarioConObjeto.play()]:[console.log('Espacio vacio'),this.sonidos.UsarInventarioSinObjeto.play()];
    }
}

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

export class Tecla{
    constructor(props){
        const {scene:scene, x:x, y:y, textura:textura, texto:texto, tamaño:tamaño, textoExplicativo:textoExplicativo} = props;

        this.contenedor = scene.add.container(x, y)
        this.img = scene.add.image(0, 0, textura)
        this.texto = scene.add.text(0,0,texto, {color:'#000000', fontFamily:'asian', fontSize:tamaño}).setOrigin(.5)
        this.textoExplicativo = scene.add.text(x+50,y-10,textoExplicativo, {color:'#000000', fontFamily:'asian', fontSize:'20px', wordWrap: { width: 300 },})
        this.contenedor.add([this.img, this.texto])
    }
}

export function CrearYPresioarTecla({scene:scene, teclaValor:teclaValor}){
    let keyCreada = scene.input.keyboard.addKey(teclaValor);

    const JustPressed = Phaser.Input.Keyboard.JustDown(keyCreada)

    return JustPressed
}