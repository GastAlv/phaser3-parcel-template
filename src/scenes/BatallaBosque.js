import Phaser from "phaser";
import { convertirClase, Personaje, escuchaDeHabilidades} from "../js/Personaje";
import { BotonSencillo } from "../js/button";
import { getPhrase } from "../services/translations";
export default class BatallaBosque extends Phaser.Scene
{
    jugador1;
    jugador2;
    jugadores = [];
    constructor(){
        super('BatallaBosque')
    }
    init(data)
    {
        this.datos = data;
        this.personajes = data.personajes;
        this.sonidos = data.sonidos;
        this.languaje = data.language
        this.personajeIzquierda = this.personajes.find((personaje)=>{
            return personaje.tipo === 'Samurai'
        })
        this.personajeDerecha = this.personajes.find((personaje)=>{
            return personaje.tipo === 'Vikingo'
        }) 
    }  
    create() {
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'escenarioBosque').setScale(1.135)
        new BotonSencillo({scene:this, x:70, y:60, texture:'botonVolver', text:'', size:0,  callback:() => {this.scene.start('MainMenu'), this.scene.stop('Ui'), this.scene.pause('Mochila'), this.scene.stop('BatallaBosque')}, scale:0.75, callbackHover: ()=>{}, callbackOut: ()=>{}})
        this.personajeDeIzquierda = new Personaje({
            scene: this,
            x: 450,
            y: 320,
            vida: this.personajeIzquierda.vida,
            sprite: this.personajeIzquierda.sprite,
            poderes: this.personajeIzquierda.poderes,
            velocidad: this.personajeIzquierda.velocidad,
            defensa: this.personajeIzquierda.defensa,
            spriteSheet: this.personajeIzquierda.spriteSheet,
            estaVivo: this.personajeIzquierda.estaVivo,
            tipo: this.personajeIzquierda.tipo,
            id: this.personajeIzquierda.id,
            clase:this.personajeDerecha.clase
        });
        this.personajeDeDerecha = new Personaje({
            scene: this,
            x: 750,
            y: 320,
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
        this.textGanador = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY/2, '', {fontSize:100, color:'#686cd6', fontFamily:'asian'}).setOrigin(.5)
        const objeto = {
            personajes: this.personajes,
            sonidos: this.sonidos,
        };
        this.scene.moveAbove('BatallaBosque', 'Ui');
        this.scene.launch('Ui', objeto);
        this.registry.events.on('victoria de combate', (ganador)=>{
            this.registry.events.emit('detener timer y todo los pads')
            this.textGanador.setText(`${getPhrase('GANA')} ${getPhrase(ganador).toUpperCase()}`);
            let timeOutParaSiguienteCombate = setTimeout(()=>{
                this.registry.events.emit('siguiente combate', ganador)
                clearTimeout(timeOutParaSiguienteCombate)
            }, 2000);
        });
       this.registry.events.on('Evaluar vivos', (vida, tipo)=>{
           (vida <= 0)?this.registry.events.emit('victoria de combate', tipo):null;
        });
        this.registry.events.on('siguiente combate', (ganador)=>{
            this.queEscenaSigue = {
                Vikingo:3,
                Samurai:5,
            };
            this.personajesActuales = [convertirClase(this.personajeDeIzquierda),convertirClase(this.personajeDeDerecha)];
            this.registry.events.emit('pruebaEnvio1', this.personajesActuales, this.queEscenaSigue[ganador]);
            this.scene.stop('Ui');
            this.scene.stop('BatallaBosque');
            this.scene.start('SeleccionPersonaje', {sonidos:this.sonidos, lenguaje: this.languaje});
            this.registry.events.removeListener('Samurai poder1');
            this.registry.events.removeListener('Samurai poder2');
            this.registry.events.removeListener('Samurai poder3');
            this.registry.events.removeListener('Samurai poder4');
            this.registry.events.removeListener('Vikingo poder1');
            this.registry.events.removeListener('Vikingo poder2');
            this.registry.events.removeListener('Vikingo poder3');
            this.registry.events.removeListener('Vikingo poder4');
            this.registry.events.removeListener('Evaluar vivos');
            this.registry.events.removeListener('siguiente combate');
            this.registry.events.removeListener('victoria de combate');
        });


    }

}
