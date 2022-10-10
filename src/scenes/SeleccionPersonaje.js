
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
<<<<<<< HEAD
    cofreMuerto = [];
=======
    listMuertos = [];
    primerEscena = true
    
>>>>>>> cdabd37f79fe3829be4bb13a683e1ff1df856402
    

    actualizarPersonajes = false;
    muerto = 0;

    constructor(){
        super('SeleccionPersonaje')
    }
    init(data){
        this.actualizacionPersonajes = data.personaje

<<<<<<< HEAD
        // this.registry.events.on('pepe', (agua) => {
        //     this.botella = agua
        //     console.log(agua)
        // })

        this.arrayJugadores = data.arrayJugadores
        console.log(this.arraydeJugadores)
        
        

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

            this.cofreMuerto.push(this.var)
            //console.log(index2)
            // console.log( this.arrayJugadores[index2])
            
            // ARRAY JUGADORES SON TODOS LOS PERSONAJES DENTRO DEL ARRAY
            this.arraydeJugadores = this.arrayJugadores.filter((jugador)=>jugador.estaVivo === true)
            
            
            // console.log('ESTE ES EL GANADOR: ', this.peleadores)
=======
        this.registry.events.on('pruebaEnvio1', (personajes, idSiguienteEscena)=> {
            this.primerEscena = false;
            this.actualizarPersonajes = true
            this.cambiarEscena = true
            this.siguienteEscena = idSiguienteEscena
            

            // lista para filtrar al personaje muerto
            this.nuevoMuerto = personajes.find((personaje)=>{
                return personaje.estaVivo === false
            })
>>>>>>> cdabd37f79fe3829be4bb13a683e1ff1df856402

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
        this.add.image(500, 500, 'botonesAtaque', 4);
        this.#vikingoPeon = new Personaje({
            vida: 100,
            sprite: 'personajePeonVikingo',
            poderes: [
                {nombre: 'ataqueRapido', dano: 20, velocidad: 10},
                {nombre: 'ataqueEstandar', dano: 30, velocidad: 6},
                {nombre: 'gritoDeGuerra', dano: 0.2},
                {nombre: 'momentoHisteria', dano: 0.5}],
            velocidad: 5,
            defensa: 5,
            tipo: 'vikingo',
            estaVivo: true,
            tipo: 'vikingo',
            id: 1
        });

        this.#vikingoCaballo = new Personaje({
            vida: 100,
            sprite: 'personajeCaballoVikingo',
            poderes: [],
            velocidad: 8,
            defensa: 7,
            tipo: 'vikingo',
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
            tipo: 'vikingo',
            estaVivo: true,
            tipo: 'vikingo',
            id: 3
        });
        
        this.#samuraiPeon = new Personaje({
            vida: 100,
            sprite: 'personajePeonSamurai',
            poderes: [
                {nombre: 'ataqueRapido', dano: 20, velocidad: 10},
                {nombre: 'ataqueEstandar', dano: 30, velocidad: 6},
                {nombre: 'gritoDeGuerra', dano: 0.2},
                {nombre: 'momentoHisteria', dano: 0.5}
            ],
            velocidad: 5,
            defensa: 5,
            tipo: 'samurai',
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
            tipo: 'samurai',
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
            tipo: 'samurai',
            estaVivo: true,
            tipo: 'samurai',
            id: 33
        });
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
<<<<<<< HEAD
            for (let jugadorMuerto of this.cofreMuerto) {
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
=======
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
>>>>>>> cdabd37f79fe3829be4bb13a683e1ff1df856402
        }
        //logica para cambiar la escena que inicia se crea un indice con una key que pertenece a cada escena/escenario, se le pasa el id que recibe el evento escucha en seleccion(esta misma escena),
        //se envio desde la escena del combate anterior hasta el evento
           
    }
}

