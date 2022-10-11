import Phaser from "phaser";
import { Button } from "../js/button";
import { Personaje } from "../js/Personaje";
import Poder from "../js/Poderes";
import { sharedInstance as events } from './EventCenter'

export default class BatallaBosque extends Phaser.Scene
{
    jugador1;
    jugador2;
    jugadores = [];
    

    
    constructor(){
        super('BatallaBosque')
    }

    init(data)
    {
        this.personajes = data.personajes
        
        console.log(this.personajes[0] instanceof Object)
        console.log(this.personajes[1] instanceof Object)

        this.personajeIzquierda = this.personajes.find((personaje)=>{
            return personaje.tipo === 'samurai'
        })
        this.personajeDerecha = this.personajes.find((personaje)=>{
            return personaje.tipo === 'vikingo'
        })
        // console.log(this.personajeDerecha.poderes)

        
    }  
    create() {
        console.log("estas en bosque")
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'escenarioBosque').setScale(1.135)
        new Button(this, 70, 60, 'botonVolver', '', 0,  () => this.scene.start('MainMenu'), 0.75)

        
        this.personajeDeIzquierda = new Personaje({
            scene: this,
            x: this.personajeIzquierda.x,
            y: this.personajeIzquierda.y,
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
        // this.personajeDeIzquierda.img.anims.play('peonSamuraiAtaque')
        // this.personajeDeIzquierda.img.anims.play(this.personajeDeIzquierda.poderes[0].nombre);
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
        this.scene.moveAbove('BatallaBosque', 'Ui')
        this.scene.launch('Ui', this.personajes)

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
        // console.log(this.personajeDeIzquierda.sprite)

        

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
        console.log(this.personajeDeIzquierda.poderes[0].nombre)


    }

    update()
    {
        if(this.personajeDeIzquierda.estaVivo === false){
            //GANO EL VIKINGO
            let idSiguienteEscena = 3
            this.personajeDeDerecha.setGano(true)
            this.personajesActuales = [this.personajeDeIzquierda, this.personajeDeDerecha]
            console.log(this.personajesActuales)
            this.registry.events.emit('pruebaEnvio1', this.personajesActuales, idSiguienteEscena)
            this.scene.start('SeleccionPersonaje')
            this.scene.stop('Ui')
        }
        if(this.personajeDeDerecha.estaVivo === false){
            //GANO EL SAMURAI
            let idSiguienteEscena = 5
            this.personajeDeIzquierda.setGano(true)
            this.personajesActuales = [this.personajeDeIzquierda, this.personajeDeDerecha]
            console.log(this.personajesActuales)
            this.registry.events.emit('pruebaEnvio1', this.personajesActuales, idSiguienteEscena)
            this.scene.start('SeleccionPersonaje')
            this.scene.stop('Ui')
        }
    }
}
