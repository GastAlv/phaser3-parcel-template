
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
    #samuraiPeon;
    #samuraiCaballo;
    #samuraiReina;
    #samuraiAlfil;
    #samuraiTorre;
    #vikingoPeon;
    #vikingoCaballo;
    #vikingoReina;
    #vikingoAlfil;
    #vikingoTorre 
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

            // lista para filtrar al personaje muerto
            this.nuevoMuerto = personajes.find((personaje)=>{
                return personaje.estaVivo === false
            })
            this.listMuertos.push(this.nuevoMuerto)

            // lista para filtrar al personaje vivo

            // aca se esta pasando desde el arraycompleto el personaje pero con la vida al 100% 
            // this.idVivo = personajes.filter((personaje)=>{return personaje.estaVivo === true})
            // this.peleadores = this.arrayCompleto.filter((personaje)=>{return personaje.id === this.idVivo[0].id});

            this.peleadores = personajes.filter((personaje)=>{
                return personaje.estaVivo === true
            })
            
            console.log('Este es el vivo', this.peleadores)
        });
    }

    create() {
        this.style = {
            fontSize: '20px',
            fontFamily: 'Agency FB',
            color: '#000',
            // align: 'center',
            backgroundColor: '#4f7abb',
            padding: {
                y: 10,
                x: 5
            },
            border: 5 ,
            // shadow: {
            //     color: '#000000',
            //     fill: true,
            //     offsetX: 2,
            //     offsetY: 2,
            //     blur: 8
            // }
        }

        console.log("ESTAS EN SELECCION")
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'pta').setScale(1.13)
        // new Button(this, 70, 60, 'botonVolver', '', 0,  () => this.scene.start('Juego'), 0.75)
        
        this.#vikingoPeon = CrearPersonaje('Vikingo', 'Peon')
        this.#vikingoCaballo = CrearPersonaje('Vikingo', 'Caballo')
        this.#vikingoReina = CrearPersonaje('Vikingo', 'Reyna')
        this.#vikingoAlfil = CrearPersonaje('Vikingo', 'Alfil')
        this.#vikingoTorre = CrearPersonaje('Vikingo', 'Torre')
        
        this.#samuraiPeon = CrearPersonaje('Samurai', 'Peon')
        this.#samuraiCaballo = CrearPersonaje('Samurai', 'Caballo')
        this.#samuraiReina = CrearPersonaje('Samurai', 'Reyna')
        this.#samuraiAlfil = CrearPersonaje('Samurai', 'Alfil')
        this.#samuraiTorre = CrearPersonaje('Samurai', 'Torre')
        
        
        this.zoomSeleccionIzquierda = this.add.image(480, 200, this.spriteI).setScale(2)
        this.infoSeleccionIzquierda = this.add.text(80, 50, '',this.style)
        
        this.zoomSeleccionDerecha = this.add.image(800, 200, this.spriteD).setScale(2)
        this.infoSeleccionDerecha = this.add.text(980, 50, '', this.style)

        sharedInstance.on('zoom seleccion izquierda', (sprite, texto)=>{
            this.spriteI = (sprite + 'Zoom')
            this.infoSeleccionIzquierda.setText(texto)
        });
        sharedInstance.on('zoom seleccion derecha', (sprite, texto)=>{
            this.spriteD = (sprite + 'Zoom')
            this.infoSeleccionDerecha.setText(texto)
        });
        this.botonPeonVikingo = new Button(this, 731, 542, 'seleccionPeonVikingo', "", 0, () => {this.peleadores.push(this.#vikingoPeon), this.botonListo1 = true}, 1, this.#vikingoPeon, 'zoom seleccion derecha')
        this.botonCaballoVikingo = new Button(this, 840, 542, 'seleccionCaballoVikingo', '', 0, () => {this.peleadores.push(this.#vikingoCaballo),  this.botonListo1 = true}, 1, this.#vikingoCaballo, 'zoom seleccion derecha')
        this.botonReinaVikingo = new Button(this, 975, 542, 'seleccionReinaVikingo', '', 0, () => {this.peleadores.push(this.#vikingoReina), this.botonListo1 = true}, 1, this.#vikingoReina, 'zoom seleccion derecha')
        this.botonAlfilVikingo = new Button(this, 1110, 542, 'seleccionAlfilVikingo', '', 0, () => {this.peleadores.push(this.#vikingoAlfil), this.botonListo1 = true}, 1, this.#vikingoAlfil, 'zoom seleccion derecha')
        this.botonTorreVikingo = new Button(this, 1245, 542, 'seleccionTorreVikingo', '', 0, () => {this.peleadores.push(this.#vikingoTorre), this.botonListo1 = true}, 1, this.#vikingoTorre, 'zoom seleccion derecha')

        this.botonPeonSamurai = new Button(this, 540, 542, 'seleccionPeonSamurai', "", 0, () => {this.peleadores.push(this.#samuraiPeon),  this.botonListo2 = true}, 1, this.#samuraiPeon, 'zoom seleccion izquierda')
        this.botonCaballoSamurai = new Button(this, 440, 542, 'seleccionCaballoSamurai', '', 0, () => {this.peleadores.push(this.#samuraiCaballo),  this.botonListo2 = true}, 1, this.#samuraiCaballo, 'zoom seleccion izquierda')
        this.botonReinaSamurai = new Button(this, 300, 542, 'seleccionReinaSamurai', '', 0, () => {this.peleadores.push(this.#samuraiReina), this.botonListo2 = true}, 1, this.#samuraiReina, 'zoom seleccion izquierda')
        this.botonAlfilSamurai = new Button(this, 165, 542, 'seleccionAlfilSamurai', '', 0, () => {this.peleadores.push(this.#samuraiAlfil), this.botonListo2 = true}, 1, this.#samuraiAlfil, 'zoom seleccion izquierda')
        this.botonTorreSamurai = new Button(this, 30, 542, 'seleccionTorreSamurai', '', 0, () => {this.peleadores.push(this.#samuraiTorre), this.botonListo2 = true}, 1, this.#samuraiTorre, 'zoom seleccion derecha')

        // this.arrayCompleto = [this.#vikingoPeon, this.#vikingoCaballo, this.#vikingoReina, this.#samuraiPeon, this.#samuraiCaballo, this.#samuraiReina];
        

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
                4 : this.botonAlfilVikingo,
                5 : this.botonTorreVikingo,
                11 : this.botonPeonSamurai,
                22 : this.botonCaballoSamurai,
                33 : this.botonReinaSamurai,
                44 : this.botonAlfilSamurai,
                55 : this.botonTorreSamurai,
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
                if(this.peleadores[0].tipo === 'Samurai')
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

