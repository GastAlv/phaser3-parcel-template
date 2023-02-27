import Phaser from 'phaser'
import { BotonHabilidades} from '../js/button';
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
	constructor()
	{
        super({key :'Ui'});
	}
    init(data){
        this.cursors = this.input.keyboard.createCursorKeys()
        this.jugadores = data.personajes;
        this.crearMochilas = data.crear;
        this.sonidos = data.sonidos;
        this.personajeIzquierda = this.jugadores.find((personaje)=>{
            return personaje.tipo === 'Samurai'
        });
        this.personajeDerecha = this.jugadores.find((personaje)=>{
            return personaje.tipo === 'Vikingo'
        });
        this.sangradoVikingo = false
        this.sangradoSamurai = false
        this.contar1 = false;
        this.contar2 = false;
        this.turnoAtacar = 0;
        this.evaluaQueColor(this.personajeDerecha);
        this.evaluaQueColor(this.personajeIzquierda);
        this.add.rectangle(this.cameras.main.centerX, 620, 1280, 250, 0x585658)
        this.botonSamurai1  = new BotonHabilidades(this, 80, 640, this.personajeIzquierda.spriteSheet, ()=>{this.registry.events.emit('Samurai poder0'), this.cambiarTurno()}, 0, this.personajeIzquierda.poderes[0].info, 80, 500, false);      
        this.botonSamurai2  = new BotonHabilidades(this, 220, 640, this.personajeIzquierda.spriteSheet, ()=>{this.registry.events.emit('Samurai poder1'), this.cambiarTurno()}, 1, this.personajeIzquierda.poderes[1].info, 80, 500, false);
        this.botonSamurai3  = new BotonHabilidades(this, 360, 640, this.personajeIzquierda.spriteSheet, ()=>{this.registry.events.emit('Samurai poder2'), this.cambiarTurno()}, 2, this.personajeIzquierda.poderes[2].info, 80, 500, false);
        this.botonSamurai4 = new BotonHabilidades(this, 500, 640, this.personajeIzquierda.spriteSheet, ()=>{this.registry.events.emit('Samurai poder3'), this.cambiarTurno()}, 3, this.personajeIzquierda.poderes[3].info, 80, 500, false);
        this.botonVikingo1  = new BotonHabilidades(this, 1200, 640, this.personajeDerecha.spriteSheet, ()=>{this.registry.events.emit('Vikingo poder0'), this.cambiarTurno()}, 4, this.personajeDerecha.poderes[0].info, 760, 500, true);
        this.botonVikingo2  = new BotonHabilidades(this, 1060, 640, this.personajeDerecha.spriteSheet, ()=>{this.registry.events.emit('Vikingo poder1'), this.cambiarTurno()}, 5, this.personajeDerecha.poderes[1].info, 760, 500, true);
        this.botonVikingo3  = new BotonHabilidades(this, 920, 640, this.personajeDerecha.spriteSheet, ()=>{this.registry.events.emit('Vikingo poder2'), this.cambiarTurno()}, 6, this.personajeDerecha.poderes[2].info, 760, 500, true);
        this.botonVikingo4 = new BotonHabilidades(this, 780, 640, this.personajeDerecha.spriteSheet, ()=>{this.registry.events.emit('Vikingo poder3'), this.cambiarTurno()}, 7, this.personajeDerecha.poderes[3].info, 760, 500, true);

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

    

        //Cremos el Temporizadores
        this.estiloCSS = {fontFamily:'asian', fontSize:'35px', backgroundColor: this.colorTituloTurno};
        this.tituloTemporizador = this.add.text((this.cameras.main.centerX ) , 520, '', this.estiloCSS).setOrigin(.5)
        this.tiempo = this.add.text(this.cameras.main.centerX, 560, this.numero, this.estiloCSS).setOrigin(.5)

        sharedInstance.on('cambiar color titulo', (color)=>{
            this.tituloTemporizador.setStyle({backgroundColor: color})
            this.tiempo.setStyle({backgroundColor: color})
        })
        sharedInstance.on('actualiza Vida Vikingo', (vida)=>{
            this.actualVidaDerechaTexto = Math.round(vida);
            (vida <= 0)?this.actualVidaDerechaTexto = 0:null;
            this.vidaBarDerecha.width = this.reglaDeTres(vida, this.vidaDerechaWidht);
            (vida <= (this.personajeDerecha.vida*.5))?this.colorBarDerecha = 0xe6da00:null;
            (vida <= (this.personajeDerecha.vida*.25))?this.colorBarDerecha = 0xe51c1a:null;
            (Math.round(vida) < 0)?this.vidaBarDerecha.width = this.reglaDeTres(0, this.vidaDerechaWidht):null;
            (Math.round(vida) < 0)?[console.log('LA vida V es',vida), this.registry.events.emit('Evaluar vivos', vida, 'Samurai')]:null;
        });
        sharedInstance.on('actualiza Vida Samurai', (vida)=>{
            this.actualVidaIzquierdaTexto = Math.round(vida);
            (vida <= 0)?this.actualVidaIzquierdaTexto = 0:null;
            this.vidaBarIzquierda.width = this.reglaDeTres(vida, this.vidaIzquierdaWidht);
            (vida <= (this.personajeIzquierda.vida*.5))?this.colorBarIzquierda = 0xe6da00:null;
            (vida <= (this.personajeIzquierda.vida*.25))?this.colorBarIzquierda = 0xe51c1a:null;
            (Math.round(vida) < 0)?this.vidaBarIzquierda.width = this.reglaDeTres(0, this.vidaIzquierdaWidht):null;

            (Math.round(vida) < 0)?[console.log('LA vida S es',vida), this.registry.events.emit('Evaluar vivos', vida, 'Vikingo')]:null;
        });
        this.registry.events.on('detener timer y todo los pads', ()=>{
            this.timedEvent.paused = true;
            // this.turnoDerecha = false;
            let intervalo = setTimeout(()=>{this.bloquearPad('derecha');
            this.bloquearPad('izquierda');
            clearInterval(intervalo)
            },1)
        });
        sharedInstance.on('turno vigente', (dano, tipo) => {
        (tipo === 'Samurai')?[this.contar1 = true]:this.contar2 = true;
        // (tipo === 'Samurai')?this.turnoAtacar2++:this.contar2 = true;
            this.dano = dano
            //
        })
        
        //Eventos que Activan los temporizadores
        this.registry.events.on('temporizador izquierda',()=>{
            // this.abrirMochila = false;
            this.turnoDerecha = true;
            this.turnoIzquierda = false;
            if(this.contar1 === true){
                this.turnoDerecha = true;
                this.turnoIzquierda = false;
                this.turnoAtacar2 = 2;
            }
            if(this.turnoAtacar2 === 2){
                this.turnoDerecha = true;
                this.turnoIzquierda = false;
                sharedInstance.emit('recibir ataqueCargado', this.dano, this.personajeDerecha.tipo)
                this.turnoAtacar2++;
            }
            if(this.turnoAtacar2 === 3){
                this.turnoDerecha = true;
                this.turnoIzquierda = false;
                this.turnoAtacar2 = 0
                this.contar1 = false;
                this.cambiarTurno()
                return
            }
            if(this.contar1 !== true){
                this.jugadorActual = getPhrase('TURNO SAMURAI')
                this.tituloTemporizador.setText(this.jugadorActual)
                this.desbloquearPad('izquierda')
                this.bloquearPad('derecha')
            }
        });
        this.registry.events.on('temporizador derecha', ()=>{
            this.turnoDerecha = false;
            this.turnoIzquierda = true;
            if(this.contar2 === true){
                this.turnoDerecha = false;
                this.turnoIzquierda = true;
                this.turnoAtacar = 2;
            }
            if(this.turnoAtacar === 2){
                this.turnoDerecha = false;
                this.turnoIzquierda = true;
                sharedInstance.emit('recibir ataqueCargado', this.dano, this.personajeIzquierda.tipo)
                this.turnoAtacar++
                console.log('TURNO de ATAQUE Y PASA')
            }
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
        sharedInstance.on('robar-turno', ()=>{
                this.cambiarTurno();
        });
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
        this.textoVidaDerecha = this.add.text(this.cameras.main.centerX+(this.cameras.main.centerX/1.7), 50, `${this.personajeDerecha.vida}`, {fontFamily:'asian', fontSize:25});
        this.textoVidaIzquierda = this.add.text(this.cameras.main.centerX/2.5, 50,  `${this.personajeIzquierda.vida}`, {fontFamily:'asian', fontSize:25});
        this.textoVidaDerechaTotal = this.add.text(this.cameras.main.centerX+(this.cameras.main.centerX/1.55), 50, `/${this.personajeDerecha.vida}`, {fontFamily:'asian', fontSize:20});
        this.textoVidaIzquierdaTotal = this.add.text(this.cameras.main.centerX/2.2, 50, `/${this.personajeIzquierda.vida}`, {fontFamily:'asian', fontSize:20});

        this.timedEvent = this.time.addEvent({delay:1000, callback: ()=>{this.numero--,(this.numero === 0)? [this.cambiarTurno()]:null; (this.numero === 5)?[console.log('Alamra Poco tiempo'), sharedInstance.emit('cambiar color titulo','#ff0100')]:null;}, loop:true});
        
        //cursor para el pad de los samurais
        
        // this.buttonSelector = this.add.image(0, 0, 'marcoSelector')//.setOrigin(0.5)//.body.allowGravity = false;
        // console.log(this.buttonSelector.x, this.buttonSelector.y);
        // this.selectButton(0)
        // console.log(this.buttonSelector.x, this.buttonSelector.y);
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
            this.botonSamurai1.desactivarEntrada();
            this.botonSamurai2.desactivarEntrada();
            this.botonSamurai3.desactivarEntrada();
            this.botonSamurai4.desactivarEntrada();
        }else if(cual === 'derecha'){
            this.botonVikingo1.desactivarEntrada();
            this.botonVikingo2.desactivarEntrada();
            this.botonVikingo3.desactivarEntrada();
            this.botonVikingo4.desactivarEntrada();
        }
    }
    desbloquearPad(cual){
        if(cual === 'izquierda'){
            this.botonSamurai1.activarEntrada();
            this.botonSamurai2.activarEntrada();
            this.botonSamurai3.activarEntrada();
            this.botonSamurai4.activarEntrada();
        }else if(cual === 'derecha'){
            this.botonVikingo1.activarEntrada();
            this.botonVikingo2.activarEntrada();
            this.botonVikingo3.activarEntrada();
            this.botonVikingo4.activarEntrada();
        }
        
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
