
import Phaser from "phaser";
import { Button } from "../js/button";
import { sharedInstance as events } from './EventCenter'
import { convertirClase } from "../js/Personaje";
import VictoriaSamurai from "./VictoriaSamurai";

export default class SeleccionPersonaje extends Phaser.Scene
{
    botonListo1;
    botonListo2;
    #samuraiPeon
    #samuraiCaballo
    #samuraiReina
    #vikingoPeon
    #vikingoCaballo
    #vikingoReina
    per1;
    per2;
    peleadores = [];
    personajesActuales = [];
    listMuertos = [];
    primerEscena = true
    
    

    actualizarPersonajes = false;
    muerto = 0;

    constructor(){
        super('SeleccionPersonaje')
    }
    init(data){
        this.actualizacionPersonajes = data.personaje
        this.registry.events.on('pruebaEnvio1', (personajes, idSiguienteEscena)=> {
            this.primerEscena = false;
            this.actualizarPersonajes = true
            this.cambiarEscena = true
            this.siguienteEscena = idSiguienteEscena

            // lista para filtrar al personaje muerto
            this.nuevoMuerto = personajes.find((personaje)=>{
                return personaje.estaVivo === false
            })
            this.listMuertos.push(this.nuevoMuerto)

            // lista para filtrar al personaje vivo

            this.peleadores = personajes.filter((personaje)=>{
                return personaje.estaVivo === true
            })
            console.log(this.peleadores)
            // this.peleadores = [new SistemaClaseObjeto({clase:this.peleadores})]
            this.peleadores = [convertirClase(this.peleadores)]

            if(this.listMuertos.length === 5)
            {
                if(this.peleadores[0].tipo === 'samurai')
                {
                    this.scene.start('VictoriaSamurai')
                } else {
                    this.scene.start('VictoriaVikingo')
                }                               

            }

            console.log(this.peleadores)
        });
    }

    create() {

        console.log("estas en seleccion:)")
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'pta').setScale(1.13)
        new Button(this, 70, 60, 'botonVolver', '', 0,  () => this.scene.start('Juego'), 0.75)
        // this.add.image(500, 500, 'botonesAtaque', 2)
        this.#vikingoPeon = {
            vida: 100,
            sprite: 'personajePeonVikingo',
            poderes: [
                {nombre: 'peonVikingoAtaque', dano: 20, velocidad: 10},
                {nombre: 'ataqueEstandar', dano: 30, velocidad: 6},
                {nombre: 'gritoDeGuerra', dano: 0.2},
                {nombre: 'momentoHisteria', dano: 0.5}
            ],
            spriteSheet:'botonesAtaquePeon',
            velocidad: 5,
            defensa: false,
            tipo: 'vikingo',
            estaVivo: true,
            id: 1
        };

        this.#vikingoCaballo = {
            vida: 100,
            sprite: 'personajeCaballoVikingo',
            poderes: [
                {nombre: 'caballoVikingoAtaque', dano: 20, velocidad: 10},
                {nombre: 'ataqueEstandar', dano: 30, velocidad: 6},
                {nombre: 'gritoDeGuerra', dano: 0.2},
                {nombre: 'momentoHisteria', dano: 0.5}
            ],
            spriteSheet:'botonesAtaqueCaballo',
            velocidad: 8,
            defensa: false,
            tipo: 'vikingo',
            estaVivo: true,
            id: 2
        };
        this.#vikingoReina = {
            vida: 100,
            sprite: 'personajeReynaVikingo',
            poderes: [
                {nombre: 'reynaVikingoAtaque', dano: 20, velocidad: 10},
                {nombre: 'ataqueEstandar', dano: 30, velocidad: 6},
                {nombre: 'gritoDeGuerra', dano: 0.2},
                {nombre: 'momentoHisteria', dano: 0.5}
            ],
            spriteSheet:'botonesAtaqueReyna',
            velocidad: 8,
            defensa: false,
            tipo: 'vikingo',
            estaVivo: true,
            id: 3
        };
        
        this.#samuraiPeon = {
            vida: 100,
            sprite: 'personajePeonSamurai',
            poderes: [
                {nombre: 'peonSamuraiAtaque', dano: 20, velocidad: 10},
                {nombre: 'ataqueEstandar', dano: 30, velocidad: 6},
                {nombre: 'gritoDeGuerra', dano: 0.2},
                {nombre: 'momentoHisteria', dano: 0.5}
            ],
            spriteSheet:'botonesAtaquePeon',
            velocidad: 5,
            defensa: false,
            tipo: 'samurai',
            estaVivo: true,
            id: 11
        };
        this.#samuraiCaballo = {
            vida: 100,
            sprite: 'personajeCaballoSamurai',
            poderes: [
                {nombre: 'caballoSamuraiAtaque', dano: 20, velocidad: 10},
                {nombre: 'ataqueEstandar', dano: 30, velocidad: 6},
                {nombre: 'gritoDeGuerra', dano: 0.2},
                {nombre: 'momentoHisteria', dano: 0.5}
            ],
            spriteSheet:'botonesAtaqueCaballo',
            velocidad: 8,
            defensa: false,
            tipo: 'samurai',
            estaVivo: true,
            id: 22
        };
        this.#samuraiReina = {
            vida: 100,
            sprite: 'personajeReynaSamurai',
            poderes: [
                {nombre: 'reynaSamuraiAtaque', dano: 20, velocidad: 10},
                {nombre: 'ataqueEstandar', dano: 30, velocidad: 6},
                {nombre: 'gritoDeGuerra', dano: 0.2},
                {nombre: 'momentoHisteria', dano: 0.5}
            ],
            spriteSheet:'botonesAtaqueReyna',
            velocidad: 8,
            defensa: false,
            tipo: 'samurai',
            estaVivo: true,
            id: 33
        };
        this.botonPeonVikingo = new Button(this, 731, 542, 'seleccionPeonVikingo', "", 0, () => {this.peleadores.push(this.botonPeonVikingo.obj), this.botonListo1 = true}, 0.5, this.#vikingoPeon)

        this.botonCaballoVikingo = new Button(this, 840, 542, 'seleccionCaballoVikingo', '', 0, () => {this.peleadores.push(this.botonCaballoVikingo.obj),  this.botonListo1 = true}, 0.5, this.#vikingoCaballo)
        this.botonReinaVikingo = new Button(this, 975, 542, 'seleccionReinaVikingo', '', 0, () => {this.peleadores.push(this.botonReinaVikingo.obj), this.botonListo1 = true}, 0.5, this.#vikingoReina)

        this.botonPeonSamurai = new Button(this, 540, 542, 'seleccionPeonSamurai', "", 0, () => {this.peleadores.push(this.botonPeonSamurai.obj),  this.botonListo2 = true}, 0.5, this.#samuraiPeon)
        
        this.botonCaballoSamurai = new Button(this, 440, 542, 'seleccionCaballoSamurai', '', 0, () => {this.peleadores.push(this.botonCaballoSamurai.obj),  this.botonListo2 = true}, 0.5, this.#samuraiCaballo)
        this.botonReinaSamurai = new Button(this, 300, 542, 'seleccionReinaSamurai', '', 0, () => {this.peleadores.push(this.botonReinaSamurai.obj), this.botonListo2 = true}, 0.5, this.#samuraiReina)
    }
    update(){ 

        if(this.botonListo1 && this.botonListo2 === true)
        {
            this.botonListo1 = false
            this.botonListo2 = false
            this.actualizacionPersonajes === false

            const objeto = {
                personajes: this.peleadores
            }

            if(this.primerEscena === true){
                this.primerEscena = false
                this.scene.start('BatallaPuente', objeto)
            }

            switch(this.siguienteEscena){
                case 1 : this.scene.start('BatallaCastillo', objeto)
                break
                case 2 : this.scene.start("BatallaCiudad", objeto)
                break
                case 3 : this.scene.start("BatallaPuente", objeto)
                break
                case 4 : this.scene.start("BatallaBosque", objeto)
                break
                case 5 : this.scene.start('BatallaCosta', objeto)
                break
            }
        }

        if(this.actualizarPersonajes === true){
            const indice = {
                1 : this.botonPeonVikingo,
                2 : this.botonCaballoVikingo,
                3 : this.botonReinaVikingo,
                11 : this.botonPeonSamurai,
                22 : this.botonCaballoSamurai,
                33 : this.botonReinaSamurai,
            }
            for (let jugadorMuerto of this.listMuertos) {
                    let boton = indice[jugadorMuerto.id]
                    boton.desactivarEntrada()
                    if(jugadorMuerto.tipo === 'vikingo'){
                        this.botonListo1 = false;
                        this.botonListo2 = true;
                    }else if (jugadorMuerto.tipo === 'samurai'){
                        this.botonListo1 = true;
                        this.botonListo2 = false;
                    }
                }
        }
        //logica para cambiar la escena que inicia se crea un indice con una key que pertenece a cada escena/escenario, se le pasa el id que recibe el evento escucha en seleccion(esta misma escena),
        //se envio desde la escena del combate anterior hasta el evento
           
    }
}

