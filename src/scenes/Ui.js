
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
        
        this.add.image( this.cameras.main.centerX , this.cameras.main.centerY/ 1, 'interfaz')

        new BotonHabilidades(this, 180, 525, this.personajeIzquierda.spriteSheet, ()=>{this.registry.events.emit('ataca el samurai')}, 1, 0)

        new BotonHabilidades(this, 300, 525, this.personajeIzquierda.spriteSheet, ()=>{this.registry.events.emit('ataca el samurai2')}, 1, 1)

        new BotonHabilidades(this, 180, 650, this.personajeIzquierda.spriteSheet, ()=>{this.registry.events.emit('potencia ataque samurai')}, 1, 2)

        new BotonHabilidades(this, 300, 650, this.personajeIzquierda.spriteSheet, ()=>{this.registry.events.emit('potencia armadura samurai')}, 1, 3)


        new BotonHabilidades(this, 1100, 525, this.personajeDerecha.spriteSheet, ()=>{this.registry.events.emit('ataca el vikingo')}, 1, 4)

        new BotonHabilidades(this, 980, 525, this.personajeDerecha.spriteSheet, ()=>{this.registry.events.emit('ataca el vikingo2')}, 1, 5)

        new BotonHabilidades(this, 1100, 650, this.personajeDerecha.spriteSheet, ()=>{this.registry.events.emit('potencia ataque vikingo')}, 1, 6)

        new BotonHabilidades(this, 980, 650, this.personajeDerecha.spriteSheet, ()=>{this.registry.events.emit('potencia armadura vikingo')}, 1, 7)
        
    }
}
