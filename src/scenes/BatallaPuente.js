import Phaser from "phaser";
import { Button } from "../js/button";
import { convertirClase, escuchaDeHabilidades, Personaje } from "../js/Personaje";
import { Habilidades } from "../js/Personaje";
import { sharedInstance } from "./EventCenter";
// import Poder from "../js/Poderes";

export default class BatallaPuente extends Phaser.Scene
{
    jugador1;
    jugador2;
    jugadores = [];
    

    
    constructor(){
        super('BatallaPuente')
    }

    init(data)
    {
        this.personajes = data.personajes
        console.log(this.personajes)

        this.personajeIzquierda = this.personajes.find((personaje)=>{
            return personaje.tipo == 'Samurai'
        })
        this.personajeDerecha = this.personajes.find((personaje)=>{
            return personaje.tipo == 'Vikingo'
        })

        sharedInstance.on('poderes Peon',()=>{
            this.personajeDerechoPoder1 = this.personajeDeDerecha.atacar(0, this.personajeDeIzquierda)
            this.personajeDerechoPoder1 = this.personajeDeIzquierda.atacar(0, this.personajeDeDerecha)
        })
    }  
    create() {
        console.log("estas en puente")

        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'escenarioPuente').setScale(1.135)
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
            x: 750,
            y: 275,
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
        console.log(this.personajeDeDerecha.vida)

        // this.poder1 = new Habilidades(this.personajeDeIzquierda, this.personajeDeIzquierda.sprite, this.personajeDeDerecha)
        
        this.registry.events.on('ataca el samurai', ()=>{
            // escuchaDeHabilidades(this.personajeDeIzquierda.poderes[0].tipo)
            (this.personajeDeIzquierda.poderes[0].tipo === 1)? this.personajeDeIzquierda.atacar(0, this.personajeDeDerecha):null;
            (this.personajeDeIzquierda.poderes[0].tipo === 2)? this.personajeDeIzquierda.doparHabilidad():null;
            (this.personajeDeIzquierda.poderes[0].tipo === 3)? this.personajeDeIzquierda.activarDefensa():null;
            (this.personajeDeIzquierda.poderes[0].tipo === 1)? this.personajeDeIzquierda.robarVida():null
        })
        this.registry.events.on('ataca el samurai2', ()=>{
            (this.personajeDeIzquierda.poderes[1].tipo === 1)? this.personajeDeIzquierda.atacar(0, this.personajeDeDerecha):null;
            (this.personajeDeIzquierda.poderes[1].tipo === 2)? this.personajeDeIzquierda.doparHabilidad():null;
            (this.personajeDeIzquierda.poderes[1].tipo === 3)? this.personajeDeIzquierda.activarDefensa():null;
            (this.personajeDeIzquierda.poderes[1].tipo === 1)? this.personajeDeIzquierda.robarVida():null
        })
        this.registry.events.on('potencia ataque samurai', ()=>{
            (this.personajeDeIzquierda.poderes[2].tipo === 1)? this.personajeDeIzquierda.atacar(0, this.personajeDeDerecha):null;
            (this.personajeDeIzquierda.poderes[2].tipo === 2)? this.personajeDeIzquierda.doparHabilidad():null;
            (this.personajeDeIzquierda.poderes[2].tipo === 3)? this.personajeDeIzquierda.activarDefensa():null;
            (this.personajeDeIzquierda.poderes[2].tipo === 1)? this.personajeDeIzquierda.robarVida():null
        })
        this.registry.events.on('activa armadura samurai', ()=>{
            (this.personajeDeIzquierda.poderes[3].tipo === 1)? this.personajeDeIzquierda.atacar(0, this.personajeDeDerecha):null;
            (this.personajeDeIzquierda.poderes[3].tipo === 2)? this.personajeDeIzquierda.doparHabilidad():null;
            (this.personajeDeIzquierda.poderes[3].tipo === 3)? this.personajeDeIzquierda.activarDefensa():null;
            (this.personajeDeIzquierda.poderes[3].tipo === 1)? this.personajeDeIzquierda.robarVida():null
        })

        
        // this.poder2 = new Habilidades(this.personajeDeDerecha, this.personajeDeDerecha.sprite, this.personajeDeIzquierda)
        
        this.registry.events.on('ataca el vikingo', ()=>{
            (this.personajeDeDerecha.poderes[0].tipo === 1)? this.personajeDeDerecha.atacar(0, this.personajeDeIzquierda):null;
        })
        this.registry.events.on('ataca el vikingo2', ()=>{
            (this.personajeDeDerecha.poderes[1].tipo === 2)? this.personajeDeDerecha.doparHabilidad(1, this.personajeDeDerecha.poderes[1].dano):null;
        })
        this.registry.events.on('potencia ataque vikingo', ()=>{
        })
        this.registry.events.on('activa armadura vikingo', ()=>{
        })

        this.scene.moveAbove('BatallaPuente', 'Ui')
        this.scene.launch('Ui', this.personajes)

    }

    update()
    {
        if(this.personajeDeIzquierda.estaVivo === false){
            //GANO EL VIKINGO
            let idSiguienteEscena = 2
            this.personajeDeDerecha.setGano(true)
            this.personajesActuales = [convertirClase(this.personajeDeIzquierda),convertirClase(this.personajeDeDerecha)]
            //this.personajesActuales = [this.personajeDeIzquierda, this.personajeDeDerecha]
            this.registry.events.emit('pruebaEnvio1', this.personajesActuales, idSiguienteEscena)
            this.scene.start('SeleccionPersonaje')
            this.scene.stop('Ui')
        }
        if(this.personajeDeDerecha.estaVivo === false){
            //GANO EL SAMURAI
            let idSiguienteEscena = 4
            this.personajeDeIzquierda.setGano(true)
            //this.personajesActuales = [this.personajeDeIzquierda, this.personajeDeDerecha]
            this.personajesActuales = [convertirClase(this.personajeDeIzquierda),convertirClase(this.personajeDeDerecha)]
            this.registry.events.emit('pruebaEnvio1', this.personajesActuales, idSiguienteEscena)
            this.scene.start('SeleccionPersonaje')
            this.scene.stop('Ui')
        }
    }
}
