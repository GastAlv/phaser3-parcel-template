
import Phaser from 'phaser'
import { BotonHabilidades } from '../js/button';
import { sharedInstance } from './EventCenter';
export default class Ui extends Phaser.Scene
{
    jugadorActual;
    turnoDerecha;
    turnoIzquierda;
    block;
    
	constructor()
	{
		super({key :'Ui'});
	}
    init(data){
        this.cursors = this.input.keyboard.createCursorKeys()

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
    preload(){
        
    }
    create()
    {
        

        console.log(this.personajeDerecha.velocidad)
        console.log(this.personajeIzquierda.velocidad)
        this.vidaDerechaWidht = -300;
        this.vidaIzquierdaWidht = 300;
        this.actualVidaDerecha = this.vidaDerechaWidht;
        this.actualVidaIzquierda = this.vidaIzquierdaWidht;


        this.graphics = this.add.graphics({
            fillStyle: {color:0x009B5C}
        });
        this.vidaBarDerecha = new Phaser.Geom.Rectangle(1050, 50, this.vidaDerechaWidht, 30);
        this.vidaBarIzquierda = new Phaser.Geom.Rectangle(200, 50, this.vidaIzquierdaWidht, 30);
        //this.add.image( this.cameras.main.centerX , 580, 'interfaz');

        this.botonIzquierda1  = new BotonHabilidades(this, 180, 525, this.personajeIzquierda.spriteSheet, ()=>{this.registry.events.emit('ataca el samurai'), this.registry.events.emit('temporizador derecha'), clearInterval(this.intervalo)}, 0)  ;      

        this.botonIzquierda2  = new BotonHabilidades(this, 300, 525, this.personajeIzquierda.spriteSheet, ()=>{this.registry.events.emit('ataca el samurai2'), this.registry.events.emit('temporizador derecha'), clearInterval(this.intervalo)}, 1);

        this.botonIzquierda3  = new BotonHabilidades(this, 180, 650, this.personajeIzquierda.spriteSheet, ()=>{this.registry.events.emit('potencia ataque samurai'), this.registry.events.emit('temporizador derecha'), clearInterval(this.intervalo)}, 2);

        this.botonIzquierda4 = new BotonHabilidades(this, 300, 650, this.personajeIzquierda.spriteSheet, ()=>{this.registry.events.emit('activa armadura samurai'), this.registry.events.emit('temporizador derecha'), clearInterval(this.intervalo)}, 3);
        
    

        this.botonDerecha1  = new BotonHabilidades(this, 1100, 525, this.personajeDerecha.spriteSheet, ()=>{this.registry.events.emit('ataca el vikingo'), this.registry.events.emit('temporizador izquierda'), clearInterval(this.intervalo)}, 4);

        this.botonDerecha2  = new BotonHabilidades(this, 980, 525, this.personajeDerecha.spriteSheet, ()=>{this.registry.events.emit('ataca el vikingo2'), this.registry.events.emit('temporizador izquierda'), clearInterval(this.intervalo)}, 5);

        this.botonDerecha3  = new BotonHabilidades(this, 1100, 650, this.personajeDerecha.spriteSheet, ()=>{this.registry.events.emit('potencia ataque vikingo'), this.registry.events.emit('temporizador izquierda'), clearInterval(this.intervalo)}, 6);

        this.botonDerecha4 = new BotonHabilidades(this, 980, 650, this.personajeDerecha.spriteSheet, ()=>{this.registry.events.emit('activa armadura vikingo'), this.registry.events.emit('temporizador izquierda'), clearInterval(this.intervalo)}, 7);



        //Cremos el Temporizadores
        this.tituloTemporizador = this.add.text(500,500, '')
        this.tiempo = this.add.text(690,500, this.numero)   
        //-------------------------------------------------
        //actualizan las barras de vida
        sharedInstance.on('actualiza Vida Vikingo', (vida)=>{
            this.actualVidaDerecha = vida
            this.vidaBarDerecha.width = this.reglaDeTres(vida, this.vidaDerechaWidht);
            console.log(vida)
            console.log('llego el mensaje', vida)
        });
        sharedInstance.on('actualiza Vida Samurai', (vida)=>{
            //this.actualVidaIzquierda = vida
            this.vidaBarIzquierda.width = vida * this.vidaIzquierdaWidht / 100;
        });
        //---------------------------------------------------------------------
        //Eventos que Activan los temporizadores
        this.registry.events.on('temporizador izquierda',()=>{
            this.turnoDerecha = true;
            this.turnoIzquierda = false;
            this.jugadorActual = 'turno Samurai'
            this.tituloTemporizador.setText(this.jugadorActual)
            this.Temporizador()
            this.desbloquearPad('izquierda')
            this.bloquearPad('derecha')
        });
        this.registry.events.on('temporizador derecha', ()=>{
            this.turnoDerecha = false;
            this.turnoIzquierda = true;
            this.jugadorActual = 'turno Vikingo'
            this.tituloTemporizador.setText(this.jugadorActual)
            this.Temporizador()
            this.desbloquearPad('derecha')
            this.bloquearPad('izquierda')
        });
        //-------------------------------------------------------
        //Evalu quien sigue
        this.registry.events.on('quien sigue',()=>{
            console.log('quien sigue');
            (this.turnoDerecha) ? this.registry.events.emit('temporizador derecha') : this.registry.events.emit('temporizador izquierda');
        });

        //Evalua quien empieza
        if (this.personajeDerecha.velocidad > this.personajeIzquierda.velocidad){
            this.turnoDerecha = true;
            this.turnoIzquierda = false;
            this.registry.events.emit('quien sigue')
        }else{
            this.turnoDerecha = false;
            this.turnoIzquierda = true;
            this.registry.events.emit('quien sigue')
        }

        this.block = this.physics.add.image(180, 525, 'block').setOrigin(0).body.allowGravity = false;

    }

    update(){
        // this.block.setVelocity(0);
        //Actualizar numero de temporizador
        this.tiempo.setText(this.numero)
        
        if(this.numero === 11){
            clearInterval(this.intervalo)
            this.registry.events.emit('quien sigue')
        }
        this.graphics.clear();
        this.graphics.fillRectShape(this.vidaBarDerecha);
        this.graphics.fillRectShape(this.vidaBarIzquierda);

        if (this.cursors.left.isDown)
        {
            this.block.setVelocityX(-100)
        }
        else if (this.cursors.right.isDown)
        {
            this.block.setVelocityX(100)
        }
        if (this.cursors.up.isDown)
        {
            this.block.setVelocityY(-100)
        }
        else if (this.cursors.down.isDown)
        {
            this.block.setVelocityY(100)
        }


    }

    Temporizador(){
        this.numero = 0;
        this.intervalo = setInterval(()=>{
            this.numero++
         }, 1000);
    }
    reglaDeTres(vida, lifeWidht) {
        return vida * lifeWidht / 100;
    }
    bloquearPad(cual){
        if(cual === 'izquierda'){
            this.botonIzquierda1.desactivarEntrada()
            this.botonIzquierda2.desactivarEntrada()
            this.botonIzquierda3.desactivarEntrada()
            this.botonIzquierda4.desactivarEntrada()
        }else if(cual === 'derecha'){
            this.botonDerecha1.desactivarEntrada()
            this.botonDerecha2.desactivarEntrada()
            this.botonDerecha3.desactivarEntrada()
            this.botonDerecha4.desactivarEntrada()
        }
        
    }

    desbloquearPad(cual){
        if(cual === 'izquierda'){
            this.botonIzquierda1.activarEntrada()
            this.botonIzquierda2.activarEntrada()
            this.botonIzquierda3.activarEntrada()
            this.botonIzquierda4.activarEntrada()
        }else if(cual === 'derecha'){
            this.botonDerecha1.activarEntrada()
            this.botonDerecha2.activarEntrada()
            this.botonDerecha3.activarEntrada()
            this.botonDerecha4.activarEntrada()
        }
        
    }
}
