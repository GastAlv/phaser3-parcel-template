
import Phaser from "phaser";
import  Button  from "../js/button";

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

    actualizarPersonajes = false;
    muerto = 0;
    constructor(){
        super('SeleccionPersonaje')
    }
    init(data){
        
        
        //console.log(personaje1, personaje2)
        //evento para colocar en false los listos cada vez que se vuelva a esta escena
        this.registry.events.on('actualizacion', (personajes, estado)=> {
            this.peleadores = [];
            this.botonListo1 = false;
            this.botonListo2 = false;
            this.actualizarPersonajes = true;
            this.muerto = personajes
            console.log(estado)

        })
        console.log(this.peleadores)
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
        this.#samuraiReina.estaVivo = false;


        this.botonPeonVikingo = new Button(this, 731, 542, 'personajePeonVikingo', "", 0, () => {this.botonListo1 = true, this.peleadores.push(this.botonPeonVikingo.obj)}, 0.5, this.#vikingoPeon)
        console.log(this.botonPeonVikingo.obj.id)

        this.botonCaballoVikingo = new Button(this, 840, 542, 'personajeCaballoVikingo', '', 0, () => {this.botonListo1 = true, this.peleadores.push(this.#vikingoCaballo)}, 0.5)
        this.botonReinaVikingo = new Button(this, 975, 542, 'personajeReinaVikingo', '', 0, () => {this.botonListo1 = true, this.peleadores.push(this.#vikingoReina)}, 0.5)

        
        this.botonPeonSamurai = new Button(this, 540, 542, 'personajePeonSamurai', "", 0, () => {this.botonListo1 = true, this.peleadores.push(this.botonPeonSamurai.obj)}, 0.5, this.#samuraiPeon)
        
        this.botonCaballoSamurai = new Button(this, 440, 542, 'personajeCaballoSamurai', '', 0, () => {this.botonListo2 = true, this.peleadores.push(this.#samuraiCaballo)}, 0.5)
        this.botonReinaSamurai = new Button(this, 300, 542, 'personajeReinaSamurai', '', 0, () => {this.botonListo2 = true, this.peleadores.push(this.#samuraiReina)}, 0.5)
        //this.botonPeonSamurai.desactivarEntrada()
    }
    update(){

        if(this.botonListo1 && this.botonListo2)
        {
            //const personajes = [ this.#vikingoPeon]
            let personajes = this.peleadores;
            this.scene.start('Juego', {personajes} )
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
            const boton = indice[this.muerto]
            boton.desactivarEntrada()
            // if(this.peleadores[0].estaVivo === false){
            //     this.peleadores.shift()
            // }else{
            //     this.peleadores.pop()
            // }
        }
    }
}
