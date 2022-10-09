
import Phaser from "phaser";
import { Button } from "../js/button";
import { sharedInstance as events } from './EventCenter'

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
    cofreM = [];
    events = events;
    

    actualizarPersonajes = false;
    muerto = 0;
    constructor(){
        super('SeleccionPersonaje')
    }
    init(data){

        // this.registry.events.on('pepe', (agua) => {
        //     this.botella = agua
        //     console.log(agua)
        // })

        this.arrayJugadores = data.arrayJugadores

        
        

        //console.log(personaje1, personaje2)
        //evento para colocar en false los listos cada vez que se vuelva a esta escena
        this.registry.events.on('actualizacion', (personajeMuerto, estado, arrayJugadores)=> {
            
            this.arrayJugadores = arrayJugadores

            this.peleadores = estado;
           
            // console.log('Esto son los peleadores del combate: ', this.peleadores)
            this.actualizarPersonajes = true;
            this.muerto = personajeMuerto

            // console.log('AAAA: ', this.peleadores[0].estaVivo)
            this.var = {};
            const jugadorPalmo = this.peleadores.find((jugador)=>jugador.estaVivo === false)

            
            if(this.peleadores[0].estaVivo === false){
                this.var =  this.peleadores.shift();
                this.botonListo1 = this.botonListo2;
                this.botonListo2 = this.botonListo1;
                if(jugadorPalmo){
                    this.peleadores = this.peleadores.filter((jugador) => jugador !== jugadorPalmo) 
                    
                }

            } //else {
            //     this.var = this.peleadores.pop();
            //     this.botonListo1 = false;
            //     this.botonListo2 = true;
            //     if(jugadorPalmo){
            //         this.peleadores = this.peleadores.filter((jugador) => jugador !== jugadorPalmo) 
                    
            //     }
            // }
            
            this.filtro = this.arrayJugadores.find((personaje)=> personaje.id === this.var.id)
            
            

            
            const  index2 = this.arrayJugadores.indexOf(this.filtro)
            this.arrayJugadores[index2] = this.var
            this.cofreM.push(this.arrayJugadores[index2])
            //console.log(index2)
            // console.log( this.arrayJugadores[index2])
            this.arraydeJugadores = this.arrayJugadores.filter((jugador)=>jugador.estaVivo === true)
            
            
            // console.log('ESTE ES EL GANADOR: ', this.peleadores)

            
        })
    }

    create() {

        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'pta').setScale(1.13)
        new Button(this, 70, 60, 'botonVolver', '', 0,  () => this.scene.start('Juego'), 0.75)
        

        
        this.#vikingoPeon = {
            vida: 100,
            sprite: 'personajePeonVikingo',
            poderes: [],
            velocidad: 5,
            defensa: 5,
            estaVivo: true,
            id: 1
        };
        this.#vikingoCaballo = {
            vida: 100,
            sprite: 'personajeCaballoVikingo',
            poderes: [],
            velocidad: 8,
            defensa: 7,
            estaVivo: true,
            id: 2
        };
        this.#vikingoReina = {
            vida: 100,
            sprite: 'personajeReinaVikingo',
            poderes: [],
            velocidad: 8,
            defensa: 7,
            estaVivo: true,
            id: 3
        };
        
        this.#samuraiPeon = {
            vida: 100,
            sprite: 'personajePeonSamurai',
            poderes: [],
            velocidad: 5,
            defensa: 5,
            estaVivo: true,
            id: 11
        };
        this.#samuraiCaballo = {
            vida: 100,
            sprite: 'personajeCaballoSamurai',
            poderes: [],
            velocidad: 8,
            defensa: 7,
            estaVivo: true,
            id: 22
        };
        this.#samuraiReina = {
            vida: 100,
            sprite: 'personajeReinaSamurai',
            poderes: [],
            velocidad: 8,
            defensa: 7,
            estaVivo: true,
            id: 33
        };


        // Manejador de eventos centralizados para comunicacion de componentes

            // Importacion
            //import { sharedInstance as events } from './EventCenter'

            // Emisor de mensaje de difusion
            // Recibe el nombre del mensaje y los valores de parametro
            // events.emit('health-changed', this.health)

            // Receptor de mensaje, por ejemplo escena de UI
            // Recibe el nombre del mensaje y una funcion callback a ejecutar
            // events.on('health-changed', this.handleHealthChanged, this)

        this.arrayJugadores = [this.#samuraiCaballo, this.#samuraiPeon, this.#samuraiReina, this.#vikingoCaballo, this.#vikingoPeon, this.#vikingoReina]


        this.botonPeonVikingo = new Button(this, 731, 542, 'personajePeonVikingo', "", 0, () => {this.peleadores.push(this.botonPeonVikingo.obj), this.botonListo1 = true}
        , 0.5, this.#vikingoPeon)

                    
        

        this.botonCaballoVikingo = new Button(this, 840, 542, 'personajeCaballoVikingo', '', 0, () => {this.peleadores.push(this.botonCaballoVikingo.obj),  this.botonListo1 = true}, 0.5, this.#vikingoCaballo)
        this.botonReinaVikingo = new Button(this, 975, 542, 'personajeReinaVikingo', '', 0, () => {this.peleadores.push(this.botonReinaVikingo.obj), this.botonListo1 = true}, 0.5, this.#vikingoReina)

        
        this.botonPeonSamurai = new Button(this, 540, 542, 'personajePeonSamurai', "", 0, () => {this.peleadores.push(this.botonPeonSamurai.obj),  this.botonListo2 = true}, 0.5, this.#samuraiPeon)
        
        this.botonCaballoSamurai = new Button(this, 440, 542, 'personajeCaballoSamurai', '', 0, () => {this.peleadores.push(this.botonCaballoSamurai.obj),  this.botonListo2 = true}, 0.5, this.#samuraiCaballo)
        this.botonReinaSamurai = new Button(this, 300, 542, 'personajeReinaSamurai', '', 0, () => {this.peleadores.push(this.botonReinaSamurai.obj), this.botonListo2 = true}, 0.5, this.#samuraiReina)
        
        
        //this.botonPeonSamurai.desactivarEntrada()
    }
    update(){

        if(this.botonListo1 && this.botonListo2)
        {
            //const personajes = [ this.#vikingoPeon]
            // let personajes = this.peleadores;

            this.botonListo1 = false
            this.botonListo2 = false
            const objeto = {
                personajes: this.peleadores,
                arrayJugadores : this.arrayJugadores
            }
            this.scene.start('Juego', objeto )
            //console.log(personajes)
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
            for (let jugadorMuerto of this.cofreM) {
                if(jugadorMuerto.estaVivo === false){
                    let boton = indice[jugadorMuerto.id]
                    boton.desactivarEntrada()
                }
            }
            // const boton = indice[this.muerto]
            // boton.desactivarEntrada()
            // if(this.peleadores[0].estaVivo === false){
            //     this.peleadores.shift()
            // }else{
            //     this.peleadores.pop()
            // }
        }
    }
}
