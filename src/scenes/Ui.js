
import Phaser from 'phaser'
import { BotonHabilidades } from '../js/button';
import { sharedInstance } from './EventCenter';
import { Random } from "random-js";
import { getPhrase } from '../services/translations';
const random = new Random()
export default class Ui extends Phaser.Scene
{
    jugadorActual;
    turnoDerecha;
    turnoIzquierda;
    block;
    cursors;
    buttons = [];
	selectedButtonIndex = 0;
    contar1 = null;
    contar2 = null;
    turnoAtacar = 0;
    turnoAtacar2 = 0;
    sangradoVikingo = false;
    sangradoSamurai = false;
    numero = 15;
    colorBarDerecha;
    colorBarIzquierda;
    variableSuma = 0;
    combateNormal = true

    mochilaNormales = false;
    colorTituloTurno = '#5b5d5a';
    
    // colorEstatico = 0x3a3a3a;
    
	constructor()
	{
        super({key :'Ui'});
	}
    init(data){
        // this.cursors = this.input.keyboard.createCursorKeys()
        this.jugadores = data.personajes;
        this.crearMochilas = data.crear;
        this.sonidos = data.sonidos;
        console.log(this.jugadores)

        this.personajeIzquierda = this.jugadores.find((personaje)=>{
            return personaje.tipo === getPhrase('Samurai')
        });
        this.personajeDerecha = this.jugadores.find((personaje)=>{
            return personaje.tipo === getPhrase('Vikingo')
        });
        // console.log(this.personajeDerecha.poderes)
        this.enterBase = this.input.keyboard;
        this.enter = this.enterBase.addKey(13);
        // this.colorBarDerecha = 0x009B5C;
        // this.colorBarIzquierda = 0x3a3a3a;
        this.sangradoVikingo = false
        this.sangradoSamurai = false
        this.contar1 = false;
        this.contar2 = false;
        this.turnoAtacar = 0;
        this.evaluaQueColor(this.personajeDerecha);
        this.evaluaQueColor(this.personajeIzquierda);

        // this.botonIzquierda1  = new BotonHabilidades(this, 180, 525, this.personajeIzquierda.spriteSheet, ()=>{this.registry.events.emit('Samurai poder1'), this.cambiarTurno()}, 0, this.personajeIzquierda.poderes[0].info);
        // this.botonIzquierda2  = new BotonHabilidades(this, 300, 525, this.personajeIzquierda.spriteSheet, ()=>{this.registry.events.emit('Samurai poder2'), this.cambiarTurno()}, 1, this.personajeIzquierda.poderes[1].info);
        // this.botonIzquierda3  = new BotonHabilidades(this, 180, 650, this.personajeIzquierda.spriteSheet, ()=>{this.registry.events.emit('Samurai poder3'), this.cambiarTurno()}, 2, this.personajeIzquierda.poderes[2].info);
        // this.botonIzquierda4 = new BotonHabilidades(this, 300, 650, this.personajeIzquierda.spriteSheet, ()=>{this.registry.events.emit('Samurai poder4'), this.cambiarTurno()}, 3, this.personajeIzquierda.poderes[3].info);
        
        // this.botonDerecha1  = new BotonHabilidades(this, 1100, 525, this.personajeDerecha.spriteSheet, ()=>{this.registry.events.emit('Vikingo poder1'), this.cambiarTurno()}, 4, this.personajeDerecha.poderes[0].info);
        // this.botonDerecha2  = new BotonHabilidades(this, 980, 525, this.personajeDerecha.spriteSheet, ()=>{this.registry.events.emit('Vikingo poder2'), this.cambiarTurno()}, 5, this.personajeDerecha.poderes[1].info);
        // this.botonDerecha3  = new BotonHabilidades(this, 1100, 650, this.personajeDerecha.spriteSheet, ()=>{this.registry.events.emit('Vikingo poder3'), this.cambiarTurno()}, 6, this.personajeDerecha.poderes[2].info);
        // this.botonDerecha4 = new BotonHabilidades(this, 980, 650, this.personajeDerecha.spriteSheet, ()=>{this.registry.events.emit('Vikingo poder4'), this.cambiarTurno()}, 7, this.personajeDerecha.poderes[3].info);

        this.scene.moveAbove('Ui', 'Mochila');
        // this.scene.launch('Mochila')
        (this.crearMochilas === true)?[this.scene.launch('Mochila'), console.log('se lanzo la escena'), this.crearMochilas = false]:[this.scene.run('Mochila'), console.log('se corre la escena')];
    }
    preload(){
        
    }
    create()
    {
        this.add.image(410, 65, 'FondoVida')
        this.add.image(930, 65, 'FondoVida')
        this.vidaDerechaWidht = 300;
        this.vidaIzquierdaWidht = -300;
        this.actualVidaDerecha = this.vidaDerechaWidht;
        this.actualVidaIzquierda = this.vidaIzquierdaWidht;
        
        this.graficosDerecha = this.add.graphics();
        this.vidaBarDerecha = new Phaser.Geom.Rectangle((this.cameras.main.centerX+(this.cameras.main.centerX /4.2)), 50, this.vidaDerechaWidht, 30);

        this.graficosIzquierda = this.add.graphics()
        this.vidaBarIzquierda = new Phaser.Geom.Rectangle((this.cameras.main.centerX / 1.2), 50, this.vidaIzquierdaWidht, 30);
        this.modificaLasBarrasDeVidaDeInicio(this.personajeDerecha)
        this.modificaLasBarrasDeVidaDeInicio(this.personajeIzquierda)
        

        // this.add.image( this.cameras.main.centerX , 580, 'interfaz');
        this.botonIzquierda1  = new BotonHabilidades(this, 80, 640, this.personajeIzquierda.spriteSheet, ()=>{this.registry.events.emit('Samurai poder1'), this.cambiarTurno()}, 0, this.personajeIzquierda.poderes[0].info, 80, 500);      
        this.botonIzquierda2  = new BotonHabilidades(this, 220, 640, this.personajeIzquierda.spriteSheet, ()=>{this.registry.events.emit('Samurai poder2'), this.cambiarTurno()}, 1, this.personajeIzquierda.poderes[1].info, 80, 500);
        this.botonIzquierda3  = new BotonHabilidades(this, 360, 640, this.personajeIzquierda.spriteSheet, ()=>{this.registry.events.emit('Samurai poder3'), this.cambiarTurno()}, 2, this.personajeIzquierda.poderes[2].info, 80, 500);
        this.botonIzquierda4 = new BotonHabilidades(this, 500, 640, this.personajeIzquierda.spriteSheet, ()=>{this.registry.events.emit('Samurai poder4'), this.cambiarTurno()}, 3, this.personajeIzquierda.poderes[3].info, 80, 500);
        
        // this.buttons.push(this.botonIzquierda1)
        // this.buttons.push(this.botonIzquierda2)
        // this.buttons.push(this.botonIzquierda3)
        // this.buttons.push(this.botonIzquierda4)
        // this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        // this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        // this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        // this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        // this.botonIzquierda1.on('selected', () => {
        //     this.registry.events.emit('Samurai poder1');
        //     clearInterval(this.intervalo);
        //     this.registry.events.emit('temporizador derecha');
        // })
        // this.botonIzquierda2.on('selected', () => {
        //     this.registry.events.emit('Samurai poder2')
        //     clearInterval(this.intervalo)
        //     this.registry.events.emit('temporizador derecha')
        // })
        // this.botonIzquierda3.on('selected', () => {
        //     this.registry.events.emit('Samurai poder3')
        //     clearInterval(this.intervalo)
        //     this.registry.events.emit('temporizador derecha')
        // })
        // this.botonIzquierda4.on('selected', () => {
        //     this.registry.events.emit('Samurai poder4')
        //     clearInterval(this.intervalo)
        //     this.registry.events.emit('temporizador derecha')
        // })
        this.botonDerecha1  = new BotonHabilidades(this, 1200, 640, this.personajeDerecha.spriteSheet, ()=>{this.registry.events.emit('Vikingo poder1'), this.cambiarTurno()}, 4, this.personajeDerecha.poderes[0].info, 760, 500);
        this.botonDerecha2  = new BotonHabilidades(this, 1060, 640, this.personajeDerecha.spriteSheet, ()=>{this.registry.events.emit('Vikingo poder2'), this.cambiarTurno()}, 5, this.personajeDerecha.poderes[1].info, 760, 500);
        this.botonDerecha3  = new BotonHabilidades(this, 920, 640, this.personajeDerecha.spriteSheet, ()=>{this.registry.events.emit('Vikingo poder3'), this.cambiarTurno()}, 6, this.personajeDerecha.poderes[2].info, 760, 500);
        this.botonDerecha4 = new BotonHabilidades(this, 780, 640, this.personajeDerecha.spriteSheet, ()=>{this.registry.events.emit('Vikingo poder4'), this.cambiarTurno()}, 7, this.personajeDerecha.poderes[3].info, 760, 500);

        //Cremos el Temporizadores
        this.estiloCSS = {fontFamily:'asian', fontSize:35, backgroundColor: this.colorTituloTurno};
        this.tituloTemporizador = this.add.text((this.cameras.main.centerX ) , 520, '', this.estiloCSS).setOrigin(.5)
        this.tiempo = this.add.text(this.cameras.main.centerX, 560, this.numero, this.estiloCSS).setOrigin(.5)

        sharedInstance.on('cambiar color titulo', (color)=>{
            this.tituloTemporizador.setStyle({backgroundColor: color})
            this.tiempo.setStyle({backgroundColor: color})
        })
        //-------------------------------------------------
        //actualizan las barras de vida
        sharedInstance.on('actualiza Vida Vikingo', (vida)=>{
            this.actualVidaDerechaTexto = Math.round(vida);
            (vida <= 0)?this.actualVidaDerechaTexto = 0:null;
            // (this.actualVidaDerechaTexto>= this.personajeDerecha.vidaBase)?this.actualVidaDerechaTexto = this.personajeDerecha.vidaBase:this.actualVidaDerechaTexto = Math.round(vida);
            

            this.vidaBarDerecha.width = this.reglaDeTres(vida, this.vidaDerechaWidht);
            
            (vida <= (this.personajeDerecha.vida*.5))?this.colorBarDerecha = 0xe6da00:null;
            (vida <= (this.personajeDerecha.vida*.25))?this.colorBarDerecha = 0xe51c1a:null;

            (vida <= 0)?this.vidaBarDerecha.width = this.reglaDeTres(0, this.vidaDerechaWidht):null;
            
            this.registry.events.emit('Evaluar vivos', vida, 'Samurai');
            // console.log(vida)
            // console.log('llego el mensaje', vida)
        });
        sharedInstance.on('actualiza Vida Samurai', (vida)=>{
            this.actualVidaIzquierdaTexto = Math.round(vida);
            (vida <= 0)?this.actualVidaIzquierdaTexto = 0:null;
            // (this.actualVidaDerechaTexto>= this.personajeDerecha.vidaBase)?this.actualVidaDerechaTexto = this.personajeDerecha.vidaBase:this.actualVidaDerechaTexto = Math.round(vida);

            this.vidaBarIzquierda.width = this.reglaDeTres(vida, this.vidaIzquierdaWidht);


            (vida <= (this.personajeIzquierda.vida*.5))?this.colorBarIzquierda = 0xe6da00:null;
            (vida <= (this.personajeIzquierda.vida*.25))?this.colorBarIzquierda = 0xe51c1a:null;
            (vida <= 0)?this.vidaBarIzquierda.width = this.reglaDeTres(0, this.vidaIzquierdaWidht):null;
            this.registry.events.emit('Evaluar vivos', vida, 'Vikingo');
            
        });
        this.registry.events.on('detener timer y todo los pads', ()=>{
            this.timedEvent.paused = true;
            // this.tituloTemporizador.setText('0');
            // this.tiempo.setText('0');
            this.bloquearPad('derecha');
            this.bloquearPad('izquierda');
            this.registry.events.emit('desactivar mochila', 'Samurai');
            this.registry.events.emit('desactivar mochila', 'Vikingo');
        });
        //---------------------------------------------------------------------
        //cursor para el pad de los samurais
        // this.buttonSelector = this.add.image(180, 525, 'block').setScale(.25)//.setOrigin(0).body.allowGravity = false;
       
        sharedInstance.on('turno vigente', (dano, tipo) => {
        (tipo === 'Samurai')?[this.contar1 = true]:this.contar2 = true;
        // (tipo === 'Samurai')?this.turnoAtacar2++:this.contar2 = true;
            this.dano = dano
            //
        })

        //Eventos que Activan los temporizadores
        this.registry.events.on('temporizador izquierda',()=>{
            this.turnoDerecha = true;
            this.turnoIzquierda = false;
            //Este if suma el primer turno y avanza al siquiente turno para el enemigo ya que lo vuelve true

            if(this.contar1 === true){
                this.turnoDerecha = true;
                this.turnoIzquierda = false;
                this.turnoAtacar2 = 2;
                console.log('TURNO2');
            }
            //Este if realiza el ataque cuando pasaron 2 turnos
            if(this.turnoAtacar2 === 2){
                this.turnoDerecha = true;
                this.turnoIzquierda = false;
                sharedInstance.emit('recibir ataqueCargado', this.dano, this.personajeDerecha.tipo)
                this.turnoAtacar2++;
                console.log('TURNO de ATAQUE Y PASA')
                // this.contar1 = false
            }
            //Este if es para actualizar los valores de la variables, para así volver al combate normal despues de ejecutar el ataque con carga
            if(this.turnoAtacar2 === 3){
                console.log('ataca y pasa');
                this.turnoDerecha = true;
                this.turnoIzquierda = false;
                this.turnoAtacar2 = 0
                this.contar1 = false;
                this.cambiarTurno()
                return
            }
            //Este if es el combate normal
            if(this.contar1 !== true){
                this.jugadorActual = getPhrase('TURNO SAMURAI')
                this.tituloTemporizador.setText(this.jugadorActual)
                this.desbloquearPad('izquierda')
                this.bloquearPad('derecha')
            }
            this.registry.events.emit('desactivar mochila', 'Vikingo')
        });
        this.registry.events.on('temporizador derecha', ()=>{
            this.turnoDerecha = false;
            this.turnoIzquierda = true;

            if(this.contar2 === true){
                this.turnoDerecha = false;
                this.turnoIzquierda = true;
                this.turnoAtacar = 2;
                console.log('TURNO2');
            }
            //Este if realiza el ataque cuando pasaron 2 turnos
            if(this.turnoAtacar === 2){
                this.turnoDerecha = false;
                this.turnoIzquierda = true;
                sharedInstance.emit('recibir ataqueCargado', this.dano, this.personajeIzquierda.tipo)
                this.turnoAtacar++
                console.log('TURNO de ATAQUE Y PASA')
            }
            //Este if es para actualizar los valores de la variables, para así volver al combate normal despues de ejecutar el ataque con carga
            if(this.turnoAtacar === 3)
            {
                console.log('ataca y pasa');
                this.turnoDerecha = false;
                this.turnoIzquierda = true;
                this.turnoAtacar = 0
                this.contar2 = false;
                this.cambiarTurno()
                return
            }
            if(this.contar2 !== true)
            {
            this.jugadorActual = getPhrase('TURNO VIKINGO')
            this.tituloTemporizador.setText(this.jugadorActual)
            this.desbloquearPad('derecha')
            this.bloquearPad('izquierda')
            }
            this.registry.events.emit('desactivar mochila', 'Samurai')
        });
        //-------------------------------------------------------
        sharedInstance.on('curar sangrado vikingo', ()=>{
            this.sangradoVikingo = false;
            this.dano = null;
            this.tipo = null;
        });
        sharedInstance.on('sangra Vikingo',(dano, tipo)=>{
            console.log('empieza a sangrar el vikingo');
            // (tipo === 'Samurai')?this.sangrar = true:null;
            this.sangradoVikingo = true;
            this.dano = dano;
            this.tipo = tipo;
            // (this.sangrar === true)?sharedInstance.emit('sangrado 1', this.dano, this.tipo):null;
        });
        sharedInstance.on('curar sangrado samurai', ()=>{
            this.sangradoSamurai = false;
            this.dano = null;
            this.tipo2 = null;
        });
        sharedInstance.on('sangra Samurai',(dano, tipo)=>{
            console.log('empieza a sangrar el samurai');
            // (tipo === 'Vikingo')?this.sangrar2 = true:null;
            this.sangradoSamurai = true,
            this.dano = dano;
            this.tipo2 = tipo;
            // (this.sangrar2 === true)?sharedInstance.emit('sangrado 2', this.dano, this.tipo2):null;
        });

        //EVENTO ROBAR TURNO:
        sharedInstance.on('robar-turno', ()=>{
                this.cambiarTurno();
        });

        //Evalu quien sigue
        // this.registry.events.on('quien sigue',()=>{
        //     // console.log('quien sigue');
        //     if (this.turnoDerecha === true){
        //         this.registry.events.emit('temporizador derecha');
        //         // this.turnoDerecha = false;
        //         // this.turnoIzquierda = true;
        //         (this.sangrar === true)?sharedInstance.emit('sangrado 1', this.dano, this.tipo):null;
        //         // console.log('sigue el vikingo')
        //     }else if(this.turnoIzquierda === true){
        //         this.registry.events.emit('temporizador izquierda');
        //         // this.turnoDerecha = true;
        //         // this.turnoIzquierda = false;
        //         (this.sangrar2 === true)?sharedInstance.emit('sangrado 2', this.dano, this.tipo2):null;
        //         // console.log('sigue el samurai')
        //     }
        // });
        //Evalua quien empieza
       
        if(this.personajeDerecha.velocidad === this.personajeIzquierda.velocidad){
            //si el numero es <= 5 empieza el vikingo sino el samurai
            this.primero = (Math.round(random.integer(1, 10)));
            // (this.primero <= 5)?[this.turnoDerecha = false,this.turnoIzquierda = true, this.registry.events.emit('quien sigue')]:[this.turnoDerecha = true,this.turnoIzquierda = false, this.registry.events.emit('quien sigue')];
            (this.primero <= 5)?[this.registry.events.emit('temporizador derecha')]:[this.registry.events.emit('temporizador izquierda')];
        }else if (this.personajeDerecha.velocidad < this.personajeIzquierda.velocidad){
            this.turnoDerecha = true;
            this.turnoIzquierda = false;
            // this.registry.events.emit('temporizador izquierda')
            // clearInterval(this.intervalo), 
            this.registry.events.emit('temporizador izquierda')
            console.log('empieza el samurai')
        }else if(this.personajeDerecha.velocidad > this.personajeIzquierda.velocidad){
            this.turnoDerecha = false;
            this.turnoIzquierda = true;
            // this.registry.events.emit('temporizador derecha')
            // clearInterval(this.intervalo), 
            this.registry.events.emit('temporizador derecha')
            console.log('empieza el vikingo')
        }
        // this.selectButton(0)

        //Vida que se actualiza
        this.textoVidaDerecha = this.add.text(this.cameras.main.centerX+(this.cameras.main.centerX/1.7), 50, `${this.personajeDerecha.vida}`, {fontFamily:'asian', fontSize:25});

        this.textoVidaIzquierda = this.add.text(this.cameras.main.centerX/2.5, 50,  `${this.personajeIzquierda.vida}`, {fontFamily:'asian', fontSize:25});
        //Vida total sin actualizarce
        this.textoVidaDerechaTotal = this.add.text(this.cameras.main.centerX+(this.cameras.main.centerX/1.55), 50, `/${this.personajeDerecha.vida}`, {fontFamily:'asian', fontSize:20});

        this.textoVidaIzquierdaTotal = this.add.text(this.cameras.main.centerX/2.2, 50, `/${this.personajeIzquierda.vida}`, {fontFamily:'asian', fontSize:20});

        this.timedEvent = this.time.addEvent({delay:1000, callback: ()=>{this.numero--,(this.numero === 0)? [this.cambiarTurno(), this.sonidos.Reloj.pause()]:null; (this.numero === 5)?[console.log('Alamra Poco tiempo'), this.sonidos.Reloj.play(), sharedInstance.emit('cambiar color titulo','#ff0100')]:null;}, loop:true});
        
 
    }
    update(){
        //Actualizar numero de temporizador

        
        
        this.tiempo.setText(this.numero)
        
        this.graficosDerecha.clear();
        this.graficosIzquierda.clear()

        
        this.graficosDerecha.fillRectShape(this.vidaBarDerecha).fillStyle(this.colorBarIzquierda);
        this.graficosIzquierda.fillRectShape(this.vidaBarIzquierda).fillStyle(this.colorBarDerecha);
        
        this.textoVidaDerecha.setText(this.actualVidaDerechaTexto)
        
        this.textoVidaIzquierda.setText(this.actualVidaIzquierdaTexto)
        
        
        

        //controles con las flechitas
        // const upJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.up)
		// const downJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.down)
        // const leftJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.left)
		// const rightJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.right)
		// const spaceJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.space)
        //controles con W-A-S-D
		// const upJustPressed = Phaser.Input.Keyboard.JustDown(this.keyW)
		// const downJustPressed = Phaser.Input.Keyboard.JustDown(this.keyS)
        // const leftJustPressed = Phaser.Input.Keyboard.JustDown(this.keyA)
		// const rightJustPressed = Phaser.Input.Keyboard.JustDown(this.keyD)
		// const enterJustPressed = Phaser.Input.Keyboard.JustDown(this.enter)
		// if (upJustPressed)
		// {
		// 	this.selectNextButton(-2)
		// }
		// else if (downJustPressed)
		// {
		// 	this.selectNextButton(2)
		// }
		// else if (enterJustPressed)
		// {
		// 	this.confirmSelection()
		// }
        // else if(leftJustPressed){
        //     this.selectNextButton(-1)
        // }
        // else if(rightJustPressed){
        //     this.selectNextButton(1)
        // }
    }
    suma(){
        return this.variableSuma++;
    }
    cambiarTurno(){
        this.numero = 15;
        this.sonidos.Reloj.pause()
        sharedInstance.emit('cambiar color titulo','#5b5d5a');
        (this.turnoDerecha === true)?[this.registry.events.emit('temporizador derecha'), (this.sangradoVikingo  ===  true)?sharedInstance.emit('sangrado 1', this.dano, this.tipo):null]
        :[this.registry.events.emit('temporizador izquierda'), (this.sangradoSamurai === true)?sharedInstance.emit('sangrado 2', this.dano, this.tipo2):null];
        // (this.sangrar  ===  true)?sharedInstance.emit('sangrado 1', this.dano, this.tipo):null;
        // (this.sangrar2 === true)?sharedInstance.emit('sangrado 2', this.dano, this.tipo):null;
    }

    // robarTurno(tipo){
    //     (tipo === 'Samurai')?[this.turnoIzquierda = true, this.turnoDerecha = false]:[this.turnoIzquierda = false, this.turnoDerecha = true];
    //     console.log(tipo);
    //     this.cambiarTurno();
    //     }

    reglaDeTres(vida, lifeWidht) {
        return vida * lifeWidht / 100;
    }
    bloquearPad(cual){
        if(cual === 'izquierda'){
            this.botonIzquierda1.desactivarEntrada();
            this.botonIzquierda2.desactivarEntrada();
            this.botonIzquierda3.desactivarEntrada();
            this.botonIzquierda4.desactivarEntrada();
        }else if(cual === 'derecha'){
            this.botonDerecha1.desactivarEntrada();
            this.botonDerecha2.desactivarEntrada();
            this.botonDerecha3.desactivarEntrada();
            this.botonDerecha4.desactivarEntrada();
        }
        
    }
    desbloquearPad(cual){
        if(cual === 'izquierda'){
            this.botonIzquierda1.activarEntrada();
            this.botonIzquierda2.activarEntrada();
            this.botonIzquierda3.activarEntrada();
            this.botonIzquierda4.activarEntrada();
        }else if(cual === 'derecha'){
            this.botonDerecha1.activarEntrada();
            this.botonDerecha2.activarEntrada();
            this.botonDerecha3.activarEntrada();
            this.botonDerecha4.activarEntrada();
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
    evaluaQueColor(personaje){
        (personaje.vida > (personaje.vidaBase * 0.5))?[(personaje.tipo === 'Samurai')?this.colorBarIzquierda = 0x009B5C:this.colorBarDerecha = 0x009B5C]:null;
        (personaje.vida <= (personaje.vidaBase * 0.5))?[(personaje.tipo === 'Samurai')?this.colorBarIzquierda = 0xe6da00:this.colorBarDerecha = 0xe6da00]:null;
        (personaje.vida <= (personaje.vidaBase * 0.25))?[(personaje.tipo === 'Samurai')?this.colorBarIzquierda = 0xe51c1a:this.colorBarDerecha = 0xe51c1a]:null;
        
    }
    modificaLasBarrasDeVidaDeInicio(personaje){
        (personaje.tipo === 'Samurai')?[this.actualVidaIzquierdaTexto = personaje.vida, this.vidaBarIzquierda.width = this.reglaDeTres(personaje.vida, this.vidaIzquierdaWidht)]:
        [this.actualVidaDerechaTexto = personaje.vida, this.vidaBarDerecha.width = this.reglaDeTres(personaje.vida, this.vidaDerechaWidht)];
        
    }
}
