import Phaser from 'phaser'
import { sharedInstance } from '../scenes/EventCenter'
import {Inventario, Item } from './button'
import { Random } from "random-js";
const random = new Random()
export default class Mochila extends Phaser.Scene
{
    objetosDelVikingo = [];
    objetosDelSamurai = []
    enQueLugarGuardar={
        Samurai: this.objetosDelSamurai,
        Vikingo: this.objetosDelVikingo,
    }
    todosLosObjetos = ['Curar','Atacar','Revivir', 'Escudo divino', 'Choque de escarcha', 'Miedo', 'Golpe bajo', 'Maldicion de las sombras', 'Golpe mortal', 'Ceguera y preparacion', 'Viento furioso', 'Voluntad de los renegados', 'Piromano'];
    //listaDeTodosLosObjetos, se encarga de almacenar todos los objetos que hay en en juego. Cada objeto tiene un nombre:es el valor que le vamos a pasar a la funcion escuchaDeHabilidades de Personaje.js, textureIndex:es el index que tiene el objeto en el spritesheet.
    listaDeTodosLosObjetos = [{nombre:'Curar', textureIndex:1},{nombre:'Atacar', textureIndex:2},{nombre:'Revivir', textureIndex:3},{nombre:'Escudo divino', textureIndex:4},{nombre:'Choque de escarcha', textureIndex:5},{nombre:'Miedo', textureIndex:6},{nombre:'Golpe bajo', textureIndex:7},]

    constructor(){
        super('Mochila')
    }
    init(){}
    create(){
        this.inventarioSamurai = new Inventario({scene:this, ubicacionInicio:{x:40,y:480}, ubicacionFinal:{x:450,y:300}, tipo:'Samurai'});
        
        this.inventarioVikingo = new Inventario({scene:this, ubicacionInicio:{x:1240,y:480}, ubicacionFinal:{x:850,y:300}, tipo:'Vikingo'});

        this.registry.events.on('desactivar mochila', (queMochilaDesactivo)=>{
            (queMochilaDesactivo === 'Samurai')?[this.inventarioSamurai.desactivarMochila(), this.inventarioVikingo.activarMochila()]:[this.inventarioVikingo.desactivarMochila(), this.inventarioSamurai.activarMochila()];
        })
        //prueba de un monoevento que evalua quien lo suelta. para no crear dos eventos 
        this.registry.events.on('botin soltado', (quienLoGana)=>{
            this.crearObjetos({deQuienEsLaMochila: quienLoGana, cuantosObjetosCrear:1})
        });

        this.registry.events.on('abrir mochila samurai', ()=>{
            this.inventarioSamurai.abrirMochila()
        });
        this.registry.events.on('cerrar mochila samurai', ()=>{
            this.inventarioSamurai.cerrarMochila()
        });
    }
    update(){}
    crearObjetos({deQuienEsLaMochila, cuantosObjetosCrear}){
        // console.log(this.listDeTodosLosObjetos[random.integer(0, 6)])
        
        for (let index = 1; index <= cuantosObjetosCrear; index++) {
            let x,
            y
            this.objeto = this.listaDeTodosLosObjetos[random.integer(0, 3)];
            let {nombre, textureIndex} = this.objeto;
            // this.nombreDelObjeto = this.objeto.nombre
            // this.objetoIndexEnSpritesheet = this.objeto.textureIndex;
            (deQuienEsLaMochila === 'Vikingo')?[x = 440, y = random.integer(200,250)]:[x = 730, y = random.integer(200,250)];
            const objetoActuial = this.enQueLugarGuardar[deQuienEsLaMochila].push(new Item({scene:this, x:x, y:y, texture:'lootUno', nombreDelObjeto: nombre, paraQuien: deQuienEsLaMochila, idEnSpritesheet: textureIndex}))
            this.enQueLugarGuardar[deQuienEsLaMochila][objetoActuial-1].soltarItem()
        }
    }
    
}