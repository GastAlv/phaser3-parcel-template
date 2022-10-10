
import Phaser from "phaser";
import { Button } from "../js/button";
import { sharedInstance as events } from './EventCenter'
import { Personaje } from "../js/Personaje";

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
        });
    }

    create() {
    
        console.log("estas en seleccion:)")
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'pta').setScale(1.13)
        new Button(this, 70, 60, 'botonVolver', '', 0,  () => this.scene.start('Juego'), 0.75)
        
        this.#vikingoPeon = {
            vida: 100,
            sprite: 'personajePeonVikingo',
            poderes: [],
            velocidad: 5,
            defensa: 5,
            estaVivo: true,
            tipo: 'vikingo',
            id: 1
        };

        this.#vikingoCaballo = new Personaje({
            vida: 100,
            sprite: 'personajeCaballoVikingo',
            poderes: [],
            velocidad: 8,
            defensa: 7,
            estaVivo: true,
            tipo: 'vikingo',
            id: 2
        });
        this.#vikingoReina = new Personaje({
            vida: 100,
            sprite: 'personajeReinaVikingo',
            poderes: [],
            velocidad: 8,
            defensa: 7,
            estaVivo: true,
            tipo: 'vikingo',
            id: 3
        });
        
        this.#samuraiPeon = new Personaje({
            vida: 100,
            sprite: 'personajePeonSamurai',
            poderes: [],
            velocidad: 5,
            defensa: 5,
            estaVivo: true,
            tipo: 'samurai',
            id: 11
        });
        this.#samuraiCaballo = new Personaje({
            vida: 100,
            sprite: 'personajeCaballoSamurai',
            poderes: [],
            velocidad: 8,
            defensa: 7,
            estaVivo: true,
            tipo: 'samurai',
            id: 22
        });
        this.#samuraiReina = new Personaje({
            vida: 100,
            sprite: 'personajeReinaSamurai',
            poderes: [],
            velocidad: 8,
            defensa: 7,
            estaVivo: true,
            tipo: 'samurai',
            id: 33
        });
        // Manejador de eventos centralizados para comunicacion de componentes
            // Importacion
            //import { sharedInstance as events } from './EventCenter'
            // Emisor de mensaje de difusion
            // Recibe el nombre del mensaje y los valores de parametro
            // events.emit('health-changed', this.health)
            // Receptor de mensaje, por ejemplo escena de UI
            // Recibe el nombre del mensaje y una funcion callback a ejecutar
            // events.on('health-changed', this.handleHealthChanged, this)


        this.botonPeonVikingo = new Button(this, 731, 542, 'personajePeonVikingo', "", 0, () => {this.peleadores.push(this.botonPeonVikingo.obj), this.botonListo1 = true}, 0.5, this.#vikingoPeon)

        this.botonCaballoVikingo = new Button(this, 840, 542, 'personajeCaballoVikingo', '', 0, () => {this.peleadores.push(this.botonCaballoVikingo.obj),  this.botonListo1 = true}, 0.5, this.#vikingoCaballo)
        this.botonReinaVikingo = new Button(this, 975, 542, 'personajeReinaVikingo', '', 0, () => {this.peleadores.push(this.botonReinaVikingo.obj), this.botonListo1 = true}, 0.5, this.#vikingoReina)

        this.botonPeonSamurai = new Button(this, 540, 542, 'personajePeonSamurai', "", 0, () => {this.peleadores.push(this.botonPeonSamurai.obj),  this.botonListo2 = true}, 0.5, this.#samuraiPeon)
        
        this.botonCaballoSamurai = new Button(this, 440, 542, 'personajeCaballoSamurai', '', 0, () => {this.peleadores.push(this.botonCaballoSamurai.obj),  this.botonListo2 = true}, 0.5, this.#samuraiCaballo)
        this.botonReinaSamurai = new Button(this, 300, 542, 'personajeReinaSamurai', '', 0, () => {this.peleadores.push(this.botonReinaSamurai.obj), this.botonListo2 = true}, 0.5, this.#samuraiReina)
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
                case 2 : this.scene.start("BatallaCiudad", objeto)
                break
                case 3 : this.scene.start("BatallaPuente", objeto)
                break
                case 4 : this.scene.start("BatallaBosque", objeto)
                break
            }
            // if (this.cambiarEscena === true){
                
            //     // const indiceDeEscenas = {
            //     //     // 1 : this.scene.start("BatallaCastillo", objeto),
            //     //     2 : this.scene.start("BatallaCiudad", objeto),
            //     //     3 : this.scene.start("BatallaPuente", objeto),
            //     //     4 : this.scene.start("BatallaBosque", objeto),
            //     //     // 5 : this.scene.start("BatallaCosta", objeto),
            //     // }
            //     // return indiceDeEscenas[this.siguienteEscena]
            // }
            
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

