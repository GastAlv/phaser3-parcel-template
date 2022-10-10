
import Phaser from 'phaser'
import { BotonHabilidades } from '../js/button';
export default class Ui extends Phaser.Scene
{
	constructor()
	{
		super({key :'Ui'})
	}
    init(data){
        this.jugadores = data
        console.log(this.jugadores)
        this.personajeIzquierda = this.jugadores.find((personaje)=>{
            return personaje.tipo === 'samurai'
        })
        this.personajeDerecha = this.jugadores.find((personaje)=>{
            return personaje.tipo === 'vikingo'
        })
        // console.log(this.personajeDerecha.poderes)
        
    }


    create()
    {
        
        this.add.image( this.cameras.main.centerX , 580, 'interfaz')

        new BotonHabilidades(this, 180, 525, this.personajeIzquierda.spriteSheet, ()=>{this.registry.events.emit('ataca el samurai')}, 0)        

        new BotonHabilidades(this, 300, 525, this.personajeIzquierda.spriteSheet, ()=>{this.registry.events.emit('ataca el samurai2')}, 1)

        new BotonHabilidades(this, 180, 650, this.personajeIzquierda.spriteSheet, ()=>{this.registry.events.emit('potencia ataque samurai')}, 2)

        new BotonHabilidades(this, 300, 650, this.personajeIzquierda.spriteSheet, ()=>{this.registry.events.emit('activa armadura samurai')}, 3)


        new BotonHabilidades(this, 1100, 525, this.personajeDerecha.spriteSheet, ()=>{this.registry.events.emit('ataca el vikingo')}, 4)

        new BotonHabilidades(this, 980, 525, this.personajeDerecha.spriteSheet, ()=>{this.registry.events.emit('ataca el vikingo2')}, 5)

        new BotonHabilidades(this, 1100, 650, this.personajeDerecha.spriteSheet, ()=>{this.registry.events.emit('potencia ataque vikingo')}, 6)

        new BotonHabilidades(this, 980, 650, this.personajeDerecha.spriteSheet, ()=>{this.registry.events.emit('activa armadura vikingo')}, 7)

        console.log(this.personajeIzquierda.spriteSheet)
        
    }
}
