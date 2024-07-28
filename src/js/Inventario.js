import Phaser from "phaser"
import { sharedInstance } from "../scenes/EventCenter";
import {BotonSencillo}from "../js/Buttons/BotonSencillo"
import {ManejadorDeSonidos}from "../js/ManejadorDeSonidos"

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