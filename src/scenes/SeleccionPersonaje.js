
import Phaser from "phaser";
import { Button , BotonEventos } from "../js/button";
import { Personaje } from "../js/Personaje";
import { sharedInstance } from "../scenes/EventCenter";


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

    actualizarPersonajes = false;
    muerto = 0;
    constructor(){
        super('SeleccionPersonaje')
    }
    init(data){

        this.arrayJugadores = data.arrayJugadores
        sharedInstance.on('pepe', (estado)=> {
            console.log(estado)
        })

    }

    create() {
        //this.scene.run('Juego')
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'pta').setScale(1.13)
        new Button(this, 70, 60, 'botonVolver', '', 0,  () => this.scene.start('Juego'), 0.75)
        
        this.#vikingoPeon = new Personaje({
            vida: 100,
            sprite: 'personajePeonVikingo',
            poderes: [],
            velocidad: 5,
            defensa: 5,
            estaVivo: true,
            id: 1
        });

        this.#vikingoCaballo = new Personaje({
            vida: 100,
            sprite: 'personajeCaballoVikingo',
            poderes: [],
            velocidad: 8,
            defensa: 7,
            estaVivo: true,
            id: 2
        });
        this.#vikingoReina = new Personaje({
            vida: 100,
            sprite: 'personajeReinaVikingo',
            poderes: [],
            velocidad: 8,
            defensa: 7,
            estaVivo: true,
            id: 3
        });
        
        this.#samuraiPeon = new Personaje({
            vida: 100,
            sprite: 'personajePeonSamurai',
            poderes: [],
            velocidad: 5,
            defensa: 5,
            estaVivo: true,
            id: 11
        });
        this.#samuraiCaballo = new Personaje({
            vida: 100,
            sprite: 'personajeCaballoSamurai',
            poderes: [],
            velocidad: 8,
            defensa: 7,
            estaVivo: true,
            id: 22
        });
        this.#samuraiReina = new Personaje({
            vida: 100,
            sprite: 'personajeReinaSamurai',
            poderes: [],
            velocidad: 8,
            defensa: 7,
            estaVivo: true,
            id: 33
        });
        this.h = {
            vida: 100,
            sprite: 'personajeReinaSamurai',
            poderes: [],
            velocidad: 8,
            defensa: 7,
            estaVivo: true,
            id: 33}
            
        
        

        //botones con push al array que se envia a juego
        // this.botonPeonVikingo = new Button(this, 731, 542, 'personajePeonVikingo', "", 0, () => {this.peleadores.push(this.botonPeonVikingo.obj), this.botonListo1 = true }, 0.5, this.#vikingoPeon)
        // // console.log(this.botonPeonVikingo.obj.id)
        // this.botonCaballoVikingo = new Button(this, 840, 542, 'personajeCaballoVikingo', '', 0, () => {this.peleadores.push(this.botonCaballoVikingo.obj),  this.botonListo1 = true}, 0.5, this.#vikingoCaballo)
        // this.botonReinaVikingo = new Button(this, 975, 542, 'personajeReinaVikingo', '', 0, () => {this.peleadores.push(this.botonReinaVikingo.obj), this.botonListo1 = true}, 0.5, this.#vikingoReina)
        // this.botonPeonSamurai = new Button(this, 540, 542, 'personajePeonSamurai', "", 0, () => {this.peleadores.push(this.botonPeonSamurai.obj),  this.botonListo2 = true}, 0.5, this.#samuraiPeon)
        // this.botonCaballoSamurai = new Button(this, 440, 542, 'personajeCaballoSamurai', '', 0, () => {this.peleadores.push(this.botonCaballoSamurai.obj),  this.botonListo2 = true}, 0.5, this.#samuraiCaballo)
        // this.botonReinaSamurai = new Button(this, 300, 542, 'personajeReinaSamurai', '', 0, () => {this.peleadores.push(this.botonReinaSamurai.obj), this.botonListo2 = true}, 0.5, this.#samuraiReina)

        this.botonPeonVikingo = new Button(this, 731, 542, 'personajePeonVikingo', "", 0, () => {this.botonListo1 = true}, 0.5, this.#vikingoPeon)
        //sharedInstance.emit('actualizacion', this.h)
        
        // this.botonCaballoVikingo = new BotonEventos(this, 840, 542, 'personajeCaballoVikingo', '', 0, () => {this.botonListo1 = true}, 0.5, this.#vikingoCaballo)
        // this.botonReinaVikingo = new BotonEventos(this, 975, 542, 'personajeReinaVikingo', '', 0, () => {this.botonListo1 = true}, 0.5, this.#vikingoReina)

        this.botonPeonSamurai = new Button(this, 540, 542, 'personajePeonSamurai', "", 0, () => {this.botonListo2 = true, sharedInstance.emit('actualizacion', this.h)}, 0.5, this.#samuraiPeon)
        // this.botonCaballoSamurai = new BotonEventos(this, 440, 542, 'personajeCaballoSamurai', '', 0, () => {this.botonListo2 = true}, 0.5, this.#samuraiCaballo)
        // this.botonReinaSamurai = new BotonEventos(this, 300, 542, 'personajeReinaSamurai', '', 0, () => {this.botonListo2 = true}, 0.5, this.#samuraiReina)
        
        // event.on('eventoPeonVikingo', ()=>{
        //     console.log("objeto1")
        // });
        // event.on('eventoPeonSamurai', ()=>{
        //     console.log("objeto2")
        // });
        //this.botonPeonSamurai.desactivarEntrada()
        // this.registry.events.on('eventoPeonVikingo', (b) => {
        //     console.log(b)
        //    });
        
        
    }
    update(){

        if(this.botonListo1 && this.botonListo2 === true)
        {
            //const personajes = [ this.#vikingoPeon]
            // let personajes = this.peleadores;
            // const objeto = {
            //     personajes: this.peleadores,
            //     arrayJugadores : this.arrayJugadores
            // }
            // event.emit('eventoPeonVikingo')
            // event.emit('eventoPeonSamurai')
            this.botonListo1 = false
            this.botonListo2 = false
            
            this.scene.start('Juego')
            
            //console.log(personajes)
        }

        // if(this.actualizarPersonajes === true){
        //     const indice = {
        //         1 : this.botonPeonVikingo,
        //         2 : this.botonCaballoVikingo,
        //         3 : this.botonReinaVikingo,
        //         11 : this.botonPeonSamurai,
        //         22 : this.botonCaballoSamurai,
        //         33 : this.botonReinaSamurai,
        //     }
        //     const boton = indice[this.muerto]
        //     boton.desactivarEntrada()
            // if(this.peleadores[0].estaVivo === false){
            //     this.peleadores.shift()
            // }else{
            //     this.peleadores.pop()
            // }
        }
}

