
import Phaser from 'phaser'
import { BotonHabilidades } from '../js/button';
import { sharedInstance } from './EventCenter';
export default class Ui extends Phaser.Scene
{
	constructor()
	{
		super({key :'Ui'});
	}
    init(data){
        this.jugadores = data;
        // console.log(this.jugadores)
        this.personajeIzquierda = this.jugadores.find((personaje)=>{
            return personaje.tipo === 'samurai'
        });
        this.personajeDerecha = this.jugadores.find((personaje)=>{
            return personaje.tipo === 'vikingo'
        });
        // console.log(this.personajeDerecha.poderes)
        
    }


    create()
    {
        this.vidaDerechaWidht = 200;
        this.vidaIzquierdaWidht = 200;
        this.actualVidaDerecha = this.vidaDerechaWidht;
        this.actualVidaIzquierda = this.vidaIzquierdaWidht;


        this.graphics = this.add.graphics({
            fillStyle: {color:0x009B5C}
        });
        this.vidaBarDerecha = new Phaser.Geom.Rectangle(850, 50, this.vidaDerechaWidht, 30);
        this.vidaBarIzquierda = new Phaser.Geom.Rectangle(200, 50, this.vidaIzquierdaWidht, 30);
        this.add.image( this.cameras.main.centerX , 580, 'interfaz');

        new BotonHabilidades(this, 180, 525, this.personajeIzquierda.spriteSheet, ()=>{this.registry.events.emit('ataca el samurai')}, 0)  ;      

        new BotonHabilidades(this, 300, 525, this.personajeIzquierda.spriteSheet, ()=>{this.registry.events.emit('ataca el samurai2')}, 1);

        new BotonHabilidades(this, 180, 650, this.personajeIzquierda.spriteSheet, ()=>{this.registry.events.emit('potencia ataque samurai')}, 2);

        new BotonHabilidades(this, 300, 650, this.personajeIzquierda.spriteSheet, ()=>{this.registry.events.emit('activa armadura samurai')}, 3);


        new BotonHabilidades(this, 1100, 525, this.personajeDerecha.spriteSheet, ()=>{this.registry.events.emit('ataca el vikingo')}, 4);

        new BotonHabilidades(this, 980, 525, this.personajeDerecha.spriteSheet, ()=>{this.registry.events.emit('ataca el vikingo2')}, 5);

        new BotonHabilidades(this, 1100, 650, this.personajeDerecha.spriteSheet, ()=>{this.registry.events.emit('potencia ataque vikingo')}, 6);

        new BotonHabilidades(this, 980, 650, this.personajeDerecha.spriteSheet, ()=>{this.registry.events.emit('activa armadura vikingo')}, 7);

        sharedInstance.on('actualiza Vida Vikingo', (vida)=>{
            this.vidaBarDerecha.width = this.reglaDeTres(vida, this.vidaDerechaWidht);
            console.log(vida)
            console.log('llego el mensaje', vida)
        });

        sharedInstance.on('actualiza Vida Samurai', (vida)=>{
            this.vidaBarIzquierda.width = this.reglaDeTres(vida, this.vidaIzquierdaWidht);
        });
    }
    reglaDeTres(vida, lifeWidht) {
        return vida * lifeWidht / 100;
    }

    update(){
        this.graphics.clear();
        // this.vidaBarDerecha.width = Math.round(
        //     (Phaser.Math.Interpolation.CatmullRom([this.vidaBarDerecha.width, this.actualVidaDerecha],0.05))
        // );
        // this.vidaBarIzquierda.width = Math.round(
        //     (Phaser.Math.Interpolation.CatmullRom([this.vidaBarIzquierda.width, this.actualVidaIzquierda],0.05))
        // );
        this.graphics.fillRectShape(this.vidaBarDerecha);
        this.graphics.fillRectShape(this.vidaBarIzquierda);


    }
}
