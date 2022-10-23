
import Phaser from "phaser";
import { Button } from "../js/button";
import { CrearPersonaje } from "../js/Personaje";
import { sharedInstance } from "./EventCenter";
// import { convertirClase } from "../js/Personaje";
// import { sharedInstance } from "./EventCenter";
// import { peonVikingo } from "../js/Personaje";

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
    primerEscena = true;

    zoomSeleccionDerecha;
    zoomSeleccionIzquierda;
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

            console.log(personajes)
            // lista para filtrar al personaje muerto
            this.nuevoMuerto = personajes.find((personaje)=>{
                return personaje.estaVivo === false
            })
            this.listMuertos.push(this.nuevoMuerto)

            // lista para filtrar al personaje vivo

            this.idVivo = personajes.filter((personaje)=>{return personaje.estaVivo === true})
            this.peleadores = this.arrayCompleto.filter((personaje)=>{return personaje.id === this.idVivo[0].id});
            console.log(this.peleadores)
        });
    }

    create() {

        console.log("estas en seleccion:)")
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'pta').setScale(1.13)
        new Button(this, 70, 60, 'botonVolver', '', 0,  () => this.scene.start('Juego'), 0.75)
        
        this.#vikingoPeon = CrearPersonaje('Vikingo', 'Peon')
        this.#vikingoCaballo = CrearPersonaje('Vikingo', 'Caballo')
        this.#vikingoReina = CrearPersonaje('Vikingo', 'Reyna')
        this.#samuraiPeon = CrearPersonaje('Samurai', 'Peon')
        this.#samuraiCaballo = CrearPersonaje('Samurai', 'Caballo')
        this.#samuraiReina = CrearPersonaje('Samurai', 'Reyna')
        
        
        this.zoomSeleccionIzquierda = this.add.image(400, 200, this.spriteI).setScale(2)
        
        this.zoomSeleccionDerecha = this.add.image(900, 200, this.spriteD).setScale(2)

        sharedInstance.on('zoom seleccion izquierda', (sprite)=>{
            this.spriteI = (sprite + 'Zoom')
        });
        sharedInstance.on('zoom seleccion derecha', (sprite)=>{
            this.spriteD = (sprite + 'Zoom')
        });
        this.botonPeonVikingo = new Button(this, 731, 542, 'seleccionPeonVikingo', "", 0, () => {this.peleadores.push(this.#vikingoPeon), this.botonListo1 = true}, 0.5, this.#vikingoPeon, 'zoom seleccion derecha', 'resetear derecha')
        this.botonCaballoVikingo = new Button(this, 840, 542, 'seleccionCaballoVikingo', '', 0, () => {this.peleadores.push(this.#vikingoCaballo),  this.botonListo1 = true, console.log(this.peleadores)}, 0.5, this.#vikingoCaballo, 'zoom seleccion derecha', 'resetear derecha')
        this.botonReinaVikingo = new Button(this, 975, 542, 'seleccionReinaVikingo', '', 0, () => {this.peleadores.push(this.#vikingoReina), this.botonListo1 = true}, 0.5, this.#vikingoReina, 'zoom seleccion derecha', 'resetear derecha')

        this.botonPeonSamurai = new Button(this, 540, 542, 'seleccionPeonSamurai', "", 0, () => {this.peleadores.push(this.#samuraiPeon),  this.botonListo2 = true}, 0.5, this.#samuraiPeon, 'zoom seleccion izquierda', 'resetear izquierda')
        this.botonCaballoSamurai = new Button(this, 440, 542, 'seleccionCaballoSamurai', '', 0, () => {this.peleadores.push(this.#samuraiCaballo),  this.botonListo2 = true, console.log(this.peleadores)}, 0.5, this.#samuraiCaballo, 'zoom seleccion izquierda', 'resetear izquierda')
        this.botonReinaSamurai = new Button(this, 300, 542, 'seleccionReinaSamurai', '', 0, () => {this.peleadores.push(this.#samuraiReina), this.botonListo2 = true}, 0.5, this.#samuraiReina, 'zoom seleccion izquierda', 'resetear izquierda')


        this.arrayCompleto = [this.#vikingoPeon, this.#vikingoCaballo, this.#vikingoReina, this.#samuraiPeon, this.#samuraiCaballo, this.#samuraiReina];

        // this.reloj = this.add.sprite(500,500, 'clock', 0)
        // this.reloj.play('clockSamurai')
        // this.add.sprite(500,500, 'aaa', 0).play('aaanimation')

        // this.add.sprite(500,500,'personajePeonVikingo',0).play('ataqueRapidoPeonVikingo')
    }
    update(){
        this.zoomSeleccionDerecha.setTexture(this.spriteD)
        this.zoomSeleccionIzquierda.setTexture(this.spriteI)
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
                    if(jugadorMuerto.tipo === 'Vikingo'){
                        this.botonListo1 = false;
                        this.botonListo2 = true;
                    }else if (jugadorMuerto.tipo === 'Samurai'){
                        this.botonListo1 = true;
                        this.botonListo2 = false;
                    }
                }
        }
        if(this.listMuertos.length === 5)
            {
                if(this.peleadores[0].tipo === 'samurai')
                {
                    this.scene.start('VictoriaSamurai')
                } else {
                    this.scene.start('VictoriaVikingo')
                }                               

        }
        //logica para cambiar la escena que inicia se crea un indice con una key que pertenece a cada escena/escenario, se le pasa el id que recibe el evento escucha en seleccion(esta misma escena),
        //se envio desde la escena del combate anterior hasta el evento
           
    }
    
}

