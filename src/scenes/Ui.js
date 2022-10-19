
import Phaser from 'phaser'
import { BotonHabilidades } from '../js/button';
import { sharedInstance } from './EventCenter';
export default class Ui extends Phaser.Scene
{
    jugadorActual;
    turnoDerecha;
    turnoIzquierda;
    block;
    cursors;
    buttons = [];
	selectedButtonIndex = 0;
    
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
        this.enterBase = this.input.keyboard;
        this.enter = this.enterBase.addKey(13)
        
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
        this.buttons.push(this.botonIzquierda1)
        this.buttons.push(this.botonIzquierda2)
        this.buttons.push(this.botonIzquierda3)
        this.buttons.push(this.botonIzquierda4)
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        this.botonIzquierda1.on('selected', () => {
            this.registry.events.emit('ataca el samurai');
            this.registry.events.emit('temporizador derecha');
            clearInterval(this.intervalo);
        })
        this.botonIzquierda2.on('selected', () => {
            this.registry.events.emit('ataca el samurai2')
            this.registry.events.emit('temporizador derecha')
            clearInterval(this.intervalo)
        })
        this.botonIzquierda3.on('selected', () => {
            this.registry.events.emit('potencia ataque samurai')
            this.registry.events.emit('temporizador derecha')
            clearInterval(this.intervalo)
        })
        this.botonIzquierda4.on('selected', () => {
            this.registry.events.emit('activa armadura samurai')
            this.registry.events.emit('temporizador derecha')
            clearInterval(this.intervalo)
        })

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
        this.buttonSelector = this.add.image(180, 525, 'block')//.setOrigin(0).body.allowGravity = false;
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
            if (this.turnoDerecha){
                this.registry.events.emit('temporizador derecha')
            }else {
                this.registry.events.emit('temporizador izquierda');}
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

        this.selectButton(0)

        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            this.botonIzquierda1.off('selected')
            // ...
        })

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
        //controles con las flechitas
        // const upJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.up)
		// const downJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.down)
        // const leftJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.left)
		// const rightJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.right)
		// const spaceJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.space)
        //controles con W-A-S-D
		const upJustPressed = Phaser.Input.Keyboard.JustDown(this.keyW)
		const downJustPressed = Phaser.Input.Keyboard.JustDown(this.keyS)
        const leftJustPressed = Phaser.Input.Keyboard.JustDown(this.keyA)
		const rightJustPressed = Phaser.Input.Keyboard.JustDown(this.keyD)
		const enterJustPressed = Phaser.Input.Keyboard.JustDown(this.enter)
		if (upJustPressed)
		{
			this.selectNextButton(-2)
		}
		else if (downJustPressed)
		{
			this.selectNextButton(2)
		}
		else if (enterJustPressed)
		{
			this.confirmSelection()
		}
        else if(leftJustPressed){
            this.selectNextButton(-1)
        }
        else if(rightJustPressed){
            this.selectNextButton(1)
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
    selectButton(index)
    {
        const currentButton = this.buttons[this.selectedButtonIndex]

        // set the current selected button to a white tint
        currentButton.setTint(0xffffff)

        const button = this.buttons[index]

        // set the newly selected button to a green tint
        button.setTint(0x66ff7f)

        // move the hand cursor to the right edge
        this.buttonSelector.x = button.x + button.displayWidth * 0.5
        this.buttonSelector.y = button.y + 10

        // store the new selected index
        this.selectedButtonIndex = index
    }
    selectNextButton(change = 1)
    {
        let index = this.selectedButtonIndex + change

        // wrap the index to the front or end of array
        if (index >= this.buttons.length)
        {
            index = 0
        }
        else if (index < 0)
        {
            index = this.buttons.length - 1
        }

        this.selectButton(index)
    }
    confirmSelection()
    {
        // get the currently selected button
        const button = this.buttons[this.selectedButtonIndex]

        // emit the 'selected' event
        button.emit('selected')
    }
}
