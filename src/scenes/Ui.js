
import Phaser from 'phaser'
import { Button } from '../js/button';
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

        new Button(this, 180, 525, 'botonesAtaque', 0, 'ATAQUE RAPIDO', 40, ()=>{this.registry.events.emit('ataca el samurai')}, 1.2)
        new Button(this, 480, 525, 'botonesAtaque', 1,'ATAQUE RAPIDO', 40, ()=>{this.registry.events.emit('ataca el samurai2')}, 1.2)
        new Button(this, 180, 620, 'botonesAtaque', 2,'POTENCIAR', 40, ()=>{this.registry.events.emit('potencia ataque samurai')}, 1.2)
        new Button(this, 480, 620, 'botonesAtaque', 3,'POTENCIAR', 40, ()=>{this.registry.events.emit('potencia armadura samurai')}, 1.2)


        new Button(this, 1100, 525, 'botonesAtaque', 0,'ATAQUE RAPIDO', 40, ()=>{this.registry.events.emit('ataca el vikingo')}, 1.2)
        new Button(this, 850, 525, 'botonesAtaque', 1,'ATAQUE RAPIDO', 40, ()=>{this.registry.events.emit('ataca el vikingo2')}, 1.2)
        new Button(this, 1100, 620, 'botonesAtaque', 2,'POTENCIAR', 40, ()=>{this.registry.events.emit('potencia ataque vikingo')}, 1.2)
        new Button(this, 850, 620, 'botonesAtaque', 3,'POTENCIAR', 40, ()=>{this.registry.events.emit('potencia armadura vikingo')}, 1.2)
        
    }
}
