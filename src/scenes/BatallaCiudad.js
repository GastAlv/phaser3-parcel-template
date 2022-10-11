import Phaser from "phaser";
import { Button } from "../js/button";
import { Personaje } from "../js/Personaje";
import Poder from "../js/Poderes";
import { sharedInstance as events } from './EventCenter'

export default class BatallaCiudad extends Phaser.Scene
{
    jugador1;
    jugador2;
    jugadores = [];
    

    
    constructor(){
        super('BatallaCiudad')
    }

    init(data)
    {
        this.personajes = data.personajes

        this.personajeIzquierda = this.personajes.find((personaje)=>{
            return personaje.tipo === 'samurai'
        })
        this.personajeDerecha = this.personajes.find((personaje)=>{
            return personaje.tipo === 'vikingo'
        })
    }  
    create() {
        console.log("estas en ciudad")
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'escenarioCiudad').setScale(1.135)
        new Button(this, 70, 60, 'botonVolver', '', 0,  () => this.scene.start('MainMenu'), 0.75)

        
        
        this.personajeDeIzquierda = new Personaje({
            scene: this,
            x: 450,
            y: 270,
            vida: this.personajeIzquierda.vida,
            sprite: this.personajeIzquierda.sprite,
            poderes: this.personajeIzquierda.poderes,
            velocidad: this.personajeIzquierda.velocidad,
            defensa: this.personajeIzquierda.defensa,
            spriteSheet: this.personajeIzquierda.spriteSheet,
            estaVivo: this.personajeIzquierda.estaVivo,
            tipo: this.personajeIzquierda.tipo,
            id: this.personajeIzquierda.id
        });
        this.personajeDeDerecha = new Personaje({
            scene: this,
            x: this.personajeDerecha.x,
            y: this.personajeDerecha.y,
            vida:  this.personajeDerecha.vida,
            sprite:  this.personajeDerecha.sprite,
            poderes:  this.personajeDerecha.poderes,
            velocidad:  this.personajeDerecha.velocidad,
            defensa:  this.personajeDerecha.defensa,
            spriteSheet: this.personajeIzquierda.spriteSheet,
            estaVivo:  this.personajeDerecha.estaVivo,
            tipo:  this.personajeDerecha.tipo,
            id:  this.personajeDerecha.id
        })
        

        // const peonAtaqueRapido = new Poder({
        //     nombre: 'Ataque Rapido',
        //     dano: 60,
        //     tipo: 'damage'
        // })

        // const peonCuracion = new Poder({
        //     nombre: 'Curacion',
        //     dano: 30,
        //     tipo: 'curacion'
        // })
        // this.personajeDeDerecha.agregarPoder(peonAtaqueRapido)
        // this.personajeDeDerecha.agregarPoder(peonCuracion)

        // this.personajeDeIzquierda.agregarPoder(peonAtaqueRapido)
        // this.personajeDeIzquierda.agregarPoder(peonCuracion)
        
        // new Button(this, 400, 600, 'botonMarco', 'ataca a el samurai', 50,  () => {
        //     this.personajeDeDerecha.atacar(this.personajeDeDerecha, 0, this.personajeDeIzquierda)}, 0.5)

        // new Button(this, 800, 600, 'botonMarco', 'ataca a el vikingo', 50,  () => {
        //     this.personajeDeIzquierda.atacar(this.personajeDeIzquierda, 0, this.personajeDeDerecha)}, 0.5)

        //this.personajesActuales = [this.personajeDeIzquierda, this.personajeDeDerecha]
        this.registry.events.on('ataca el samurai', ()=>{
            this.personajeDeIzquierda.atacar(0, this.personajeDeDerecha)
            // console.log(this.personajeDeDerecha.poderes[0].dano)
        })
        this.registry.events.on('potencia ataque samurai', ()=>{
            this.personajeDeIzquierda.doparHabilidad(0, this.personajeDeIzquierda.poderes[2].dano)
            // console.log(this.personajeDeDerecha.poderes)
        })
        this.registry.events.on('activa armadura samurai', ()=>{
            this.personajeDeIzquierda.activarDefensa();
            console.log('este aca es el boton')
            // console.log(this.personajeDeDerecha.poderes)
        })

        

        this.registry.events.on('ataca el vikingo', ()=>{
            this.personajeDeDerecha.atacar(0, this.personajeDeIzquierda)
        })
        this.registry.events.on('potencia ataque vikingo', ()=>{
            this.personajeDeDerecha.doparHabilidad(0, this.personajeDeDerecha.poderes[2].dano)
        })
        this.registry.events.on('activa armadura vikingo', ()=>{
            this.personajeDeDerecha.activarDefensa();
            console.log('este aca es el boton')
        })
        this.scene.moveAbove('BatallaCiudad', 'Ui')
        this.scene.launch('Ui', this.personajes)

    }

    update()
    {
        if(this.personajeDeIzquierda.estaVivo === false){
            //GANO EL VIKINGO
            let idSiguienteEscena = 1
            this.personajeDeDerecha.setGano(true)
            this.personajesActuales = [this.personajeDeIzquierda, this.personajeDeDerecha]
            this.registry.events.emit('pruebaEnvio1', this.personajesActuales, idSiguienteEscena)
            this.scene.start('SeleccionPersonaje')
            this.scene.stop('Ui')
        }
        if(this.personajeDeDerecha.estaVivo === false){
            //GANO EL SAMURAI
            let idSiguienteEscena = 3
            this.personajeDeIzquierda.setGano(true)
            this.personajesActuales = [this.personajeDeIzquierda, this.personajeDeDerecha]
            this.registry.events.emit('pruebaEnvio1', this.personajesActuales, idSiguienteEscena)
            this.scene.start('SeleccionPersonaje')
            this.scene.stop('Ui')
        }
    }
}
