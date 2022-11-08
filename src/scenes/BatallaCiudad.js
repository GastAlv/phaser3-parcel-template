import Phaser from "phaser";
import { BotonSencillo } from "../js/button";
import { Personaje, escuchaDeHabilidades, convertirClase} from "../js/Personaje";
import { sharedInstance} from './EventCenter'

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
        console.log(this.personajes)

        this.personajeIzquierda = this.personajes.find((personaje)=>{
            return personaje.tipo === 'Samurai'
        })
        this.personajeDerecha = this.personajes.find((personaje)=>{
            return personaje.tipo === 'Vikingo'
        })
    }  
    create() {
        console.log("estas en ciudad")
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'escenarioCiudad').setScale(1.135)
        new BotonSencillo({scene:this, x:70, y:60, texture:'botonVolver', text:'', size:0,  callback:() => {this.scene.start('MainMenu'), this.scene.stop('Ui'), this.scene.pause('Mochila'), this.scene.stop('BatallaCiudad')}, scale:0.75})

        
        
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
            id: this.personajeIzquierda.id,
            clase:this.personajeIzquierda.clase
        });
        this.personajeDeDerecha = new Personaje({
            scene: this,
            x: 750,
            y: 270,
            vida:  this.personajeDerecha.vida,
            sprite:  this.personajeDerecha.sprite,
            poderes:  this.personajeDerecha.poderes,
            velocidad:  this.personajeDerecha.velocidad,
            defensa:  this.personajeDerecha.defensa,
            spriteSheet: this.personajeDerecha.spriteSheet,
            estaVivo:  this.personajeDerecha.estaVivo,
            tipo:  this.personajeDerecha.tipo,
            id:  this.personajeDerecha.id,
            clase:this.personajeDerecha.clase
        })
        
        this.registry.events.on('Samurai poder1', ()=>{
            escuchaDeHabilidades(this.personajeDeIzquierda.poderes[0].tipo, 0, this.personajeDeIzquierda, this.personajeDeDerecha)
        })
        this.registry.events.on('Samurai poder2', ()=>{
            escuchaDeHabilidades(this.personajeDeIzquierda.poderes[1].tipo, 1, this.personajeDeIzquierda, this.personajeDeDerecha)
        })
        this.registry.events.on('Samurai poder3', ()=>{
            escuchaDeHabilidades(this.personajeDeIzquierda.poderes[2].tipo, 2, this.personajeDeIzquierda, this.personajeDeDerecha)
        })
        this.registry.events.on('Samurai poder4', ()=>{
            escuchaDeHabilidades(this.personajeDeIzquierda.poderes[3].tipo, 3, this.personajeDeIzquierda, this.personajeDeDerecha)
        })
        sharedInstance.on('Samurai usar objeto', (tipoDeHabilidad, index = null)=>{
            //index=null ya que los objetos por ahora no se les envia el index del poder que modifican
            this.habilidad = tipoDeHabilidad
            escuchaDeHabilidades(tipoDeHabilidad, 0, this.personajeDeIzquierda, this.personajeDeDerecha);
        })

        
        this.registry.events.on('Vikingo poder1', ()=>{
            escuchaDeHabilidades(this.personajeDeDerecha.poderes[0].tipo, 0, this.personajeDeDerecha, this.personajeDeIzquierda)
        })
        this.registry.events.on('Vikingo poder2', ()=>{
            escuchaDeHabilidades(this.personajeDeDerecha.poderes[1].tipo, 1, this.personajeDeDerecha, this.personajeDeIzquierda)
        })
        this.registry.events.on('Vikingo poder3', ()=>{
            escuchaDeHabilidades(this.personajeDeDerecha.poderes[2].tipo, 2, this.personajeDeDerecha, this.personajeDeIzquierda)
        })
        this.registry.events.on('Vikingo poder4', ()=>{
            escuchaDeHabilidades(this.personajeDeDerecha.poderes[3].tipo, 3, this.personajeDeDerecha, this.personajeDeIzquierda)
        })
         //Evento solo para usar el inventario Vikingo
         sharedInstance.on('Vikingo usar objeto', (tipoDeHabilidad, index = null)=>{
            //index=null ya que los objetos por ahora no se les envia el index del poder que modifican
            this.habilidad = tipoDeHabilidad
            escuchaDeHabilidades(tipoDeHabilidad, 0, this.personajeDeDerecha, this.personajeDeIzquierda);
        });
        
        const objeto = {
            personajes: this.personajes,
            crear:false,
        };
        this.scene.moveAbove('BatallaCiudad', 'Ui')
        this.scene.run('Ui', objeto)

    }

    update()
    {
        if(this.personajeDeIzquierda.estaVivo === false){
            //GANO EL VIKINGO
            let idSiguienteEscena = 1
            this.personajeDeDerecha.setGano(true)
            this.personajesActuales = [convertirClase(this.personajeDeIzquierda),convertirClase(this.personajeDeDerecha)]
            console.log(this.personajesActuales)
            this.registry.events.emit('pruebaEnvio1', this.personajesActuales, idSiguienteEscena)
            this.scene.stop('Ui')
            // removerEscucha();
            this.registry.events.removeListener('Samurai poder1')
this.registry.events.removeListener('Samurai poder2')
this.registry.events.removeListener('Samurai poder3')
this.registry.events.removeListener('Samurai poder4')
this.registry.events.removeListener('Vikingo poder1')
this.registry.events.removeListener('Vikingo poder2')
this.registry.events.removeListener('Vikingo poder3')
this.registry.events.removeListener('Vikingo poder4')

            // this.registry.events.emit('resetear-ui')
            // this.scene.stop('BatallaCiudad')
            this.scene.start('SeleccionPersonaje')
        }
        if(this.personajeDeDerecha.estaVivo === false){
            //GANO EL SAMURAI
            let idSiguienteEscena = 3
            this.personajeDeIzquierda.setGano(true)
            this.personajesActuales = [convertirClase(this.personajeDeIzquierda),convertirClase(this.personajeDeDerecha)]
            console.log(this.personajesActuales)
            this.registry.events.emit('pruebaEnvio1', this.personajesActuales, idSiguienteEscena)
            this.scene.stop('Ui')
            // removerEscucha();
            this.registry.events.removeListener('Samurai poder1')
this.registry.events.removeListener('Samurai poder2')
this.registry.events.removeListener('Samurai poder3')
this.registry.events.removeListener('Samurai poder4')
this.registry.events.removeListener('Vikingo poder1')
this.registry.events.removeListener('Vikingo poder2')
this.registry.events.removeListener('Vikingo poder3')
this.registry.events.removeListener('Vikingo poder4')

            // this.registry.events.emit('resetear-ui')
            // this.scene.stop('BatallaCiudad')
            this.scene.start('SeleccionPersonaje')
        }
    }
}
