
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
    contar;
    turnoAtacar = 0;
    sangrar = false;
    sangrar2 = false;
    
	constructor()
	{
		super({key :'Ui'});
	}
    init(data){
        this.cursors = this.input.keyboard.createCursorKeys()

        this.jugadores = data;
        // console.log(this.jugadores)
        this.personajeIzquierda = this.jugadores.find((personaje)=>{
            return personaje.tipo === 'Samurai'
        });
        this.personajeDerecha = this.jugadores.find((personaje)=>{
            return personaje.tipo === 'Vikingo'
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

        this.botonIzquierda1  = new BotonHabilidades(this, 180, 525, this.personajeIzquierda.spriteSheet, ()=>{this.registry.events.emit('Samurai poder1'), this.registry.events.emit('temporizador derecha'), clearInterval(this.intervalo)}, 0)  ;      

        this.botonIzquierda2  = new BotonHabilidades(this, 300, 525, this.personajeIzquierda.spriteSheet, ()=>{this.registry.events.emit('Samurai poder2'), this.registry.events.emit('temporizador derecha'), clearInterval(this.intervalo)}, 1);

        this.botonIzquierda3  = new BotonHabilidades(this, 180, 650, this.personajeIzquierda.spriteSheet, ()=>{this.registry.events.emit('Samurai poder3'), this.registry.events.emit('temporizador derecha'), clearInterval(this.intervalo)}, 2);

        this.botonIzquierda4 = new BotonHabilidades(this, 300, 650, this.personajeIzquierda.spriteSheet, ()=>{this.registry.events.emit('Samurai poder4'), this.registry.events.emit('temporizador derecha'), clearInterval(this.intervalo)}, 3);
        this.buttons.push(this.botonIzquierda1)
        this.buttons.push(this.botonIzquierda2)
        this.buttons.push(this.botonIzquierda3)
        this.buttons.push(this.botonIzquierda4)
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        this.botonIzquierda1.on('selected', () => {
            this.registry.events.emit('Samurai poder1');
            this.registry.events.emit('temporizador derecha');
            clearInterval(this.intervalo);
        })
        this.botonIzquierda2.on('selected', () => {
            this.registry.events.emit('Samurai poder2')
            this.registry.events.emit('temporizador derecha')
            clearInterval(this.intervalo)
        })
        this.botonIzquierda3.on('selected', () => {
            this.registry.events.emit('Samurai poder3')
            this.registry.events.emit('temporizador derecha')
            clearInterval(this.intervalo)
        })
        this.botonIzquierda4.on('selected', () => {
            this.registry.events.emit('Samurai poder4')
            this.registry.events.emit('temporizador derecha')
            clearInterval(this.intervalo)
        })

        this.botonDerecha1  = new BotonHabilidades(this, 1100, 525, this.personajeDerecha.spriteSheet, ()=>{this.registry.events.emit('Vikingo poder1'), this.registry.events.emit('temporizador izquierda'), clearInterval(this.intervalo)}, 4);

        this.botonDerecha2  = new BotonHabilidades(this, 980, 525, this.personajeDerecha.spriteSheet, ()=>{this.registry.events.emit('Vikingo poder2'), this.registry.events.emit('temporizador izquierda'), clearInterval(this.intervalo)}, 5);

        this.botonDerecha3  = new BotonHabilidades(this, 1100, 650, this.personajeDerecha.spriteSheet, ()=>{this.registry.events.emit('Vikingo poder3'), this.registry.events.emit('temporizador izquierda'), clearInterval(this.intervalo)}, 6);

        this.botonDerecha4 = new BotonHabilidades(this, 980, 650, this.personajeDerecha.spriteSheet, ()=>{this.registry.events.emit('Vikingo poder4'), this.registry.events.emit('temporizador izquierda'), clearInterval(this.intervalo)}, 7);

        //Cremos el Temporizadores
        this.tituloTemporizador = this.add.text(500,500, '')
        this.tiempo = this.add.text(690,500, this.numero)
        //-------------------------------------------------
        //actualizan las barras de vida
        sharedInstance.on('actualiza Vida Vikingo', (vida)=>{
            this.actualVidaDerechaTexto = vida
            this.vidaBarDerecha.width = this.reglaDeTres(vida, this.vidaDerechaWidht);
            // console.log(vida)
            // console.log('llego el mensaje', vida)
        });
        sharedInstance.on('actualiza Vida Samurai', (vida)=>{
            this.actualVidaIzquierdaTexto = vida
            this.vidaBarIzquierda.width = this.reglaDeTres(vida, this.vidaIzquierdaWidht)
        });
        //---------------------------------------------------------------------
        //cursor para el pad de los samurais
        this.buttonSelector = this.add.image(180, 525, 'block').setScale(.25)//.setOrigin(0).body.allowGravity = false;


        sharedInstance.on('turno vigente', (dano) => {
            this.contar = true
            this.dano = dano
        })

        //Eventos que Activan los temporizadores
        this.registry.events.on('temporizador izquierda',()=>{
            //Este if suma el primer turno y avanza al siquiente turno para el enemigo ya que lo vuelve true
            if(this.contar){
                this.turnoAtacar++;
                this.turnoDerecha = true;
                this.turnoIzquierda = false;
            }
            //Este if realiza el ataque cuando pasaron 2 turnos
            if(this.turnoAtacar === 2){
                this.turnoDerecha = true;
                this.turnoIzquierda = false;
                sharedInstance.emit('recibir ataqueCargado', this.dano, this.personajeDerecha.tipo)
            }
            //Este if es para actualizar los valores de la variables, para así volver al combate normal despues de ejecutar el ataque con carga
            if(this.turnoAtacar === 3){
                this.turnoDerecha = true;
                this.turnoIzquierda = false;
                this.turnoAtacar = 0;
                this.contar = null
            }
            //Este if es el combate normal
            if(this.contar !== true){
                this.turnoDerecha = true;
                this.turnoIzquierda = false;
                this.jugadorActual = 'turno Samurai'
                this.tituloTemporizador.setText(this.jugadorActual)
                this.Temporizador()
                this.desbloquearPad('izquierda')
                this.bloquearPad('derecha')
            }
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
        sharedInstance.on('sangra Vikingo',(dano, tipo)=>{
            console.log('empieza a sangrar el vikingo');
            // (tipo === 'Samurai')?this.sangrar = true:null;
            this.sangrar = true
            this.dano = dano
            this.tipo = tipo;
        });
        sharedInstance.on('sangra Samurai',(dano, tipo)=>{
            console.log('empieza a sangrar el samurai');
            // (tipo === 'Vikingo')?this.sangrar2 = true:null;
            this.sangrar2 = true
            this.dano = dano
            this.tipo2 = tipo;
        });
        //Evalu quien sigue
        this.registry.events.on('quien sigue',()=>{
            console.log('quien sigue');
            if (this.turnoDerecha){
                this.registry.events.emit('temporizador derecha');
                (this.sangrar === true)?sharedInstance.emit('sangrado 1', this.dano, this.tipo):null;
            }else {
                this.registry.events.emit('temporizador izquierda');
                (this.sangrar2 === true)?sharedInstance.emit('sangrado 2', this.dano, this.tipo2):null;
            }
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

        sharedInstance.on('',()=>{
            
        })

        this.selectButton(0)

        //Vida que se actualiza
        this.textoVidaDerecha = this.add.text(1050, 50, `${this.personajeDerecha.vida}`)

        this.textoVidaIzquierda = this.add.text(200, 50,  `${this.personajeIzquierda.vida}`)
        //Vida total sin actualizarce
        this.textoVidaDerechaTotal = this.add.text(1020, 50, `${this.personajeDerecha.vida}/` )

        this.textoVidaIzquierdaTotal = this.add.text(170, 50, `${this.personajeIzquierda.vida}/`)
    }
    update(){
        //Actualizar numero de temporizador
        this.tiempo.setText(this.numero)
        
        if(this.numero === 11 || this.numero > 12){
            clearInterval(this.intervalo)
            this.registry.events.emit('quien sigue')
        }
        this.graphics.clear();
        this.graphics.fillRectShape(this.vidaBarDerecha);
        this.graphics.fillRectShape(this.vidaBarIzquierda);
        
        this.textoVidaDerecha.setText(this.actualVidaDerechaTexto)
        
        this.textoVidaIzquierda.setText(this.actualVidaIzquierdaTexto)


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
