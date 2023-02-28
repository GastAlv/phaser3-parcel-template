import Phaser from "phaser";
import { BotonSencillo, Button } from "../js/button";
import { CrearPersonaje } from "../js/Personaje";
import { getPhrase } from "../services/translations";
import { sharedInstance } from "./EventCenter";
export default class SeleccionPersonaje extends Phaser.Scene {
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
    #vikingoTorre;
    peleadores = [];
    personajesActuales = [];
    listMuertos = [];
    muertosVikingos = [];
    muertosSamurais = [];
    primerEscena = true;
    nuevoMuerto;
    arrayBotonesSamurai = [];
    arrayBotonesVikingo = [];
    texto = '';
    zoomSeleccionVikingo;
    zoomSeleccionSamurai;
    actualizarPersonajes = false;
    quienPerdio;
    MVPList = [];
    match = {winner:"", loser:"", MVP:"", MVPKilss:""};
    constructor() {
        super('SeleccionPersonaje')
    }
    init(data) {
        this.scene.stop('Ui');
        this.scene.stop('renderTest01');
        this.sonidos = data.sonidos;
        this.lenguaje = data.lenguaje;
        this.registry.events.on('resetear listas para jugar de nuevo', () => {
            this.peleadores = [];
            this.personajesActuales = [];
            this.listMuertos = [];
            this.muertosVikingos = [];
            this.muertosSamurais = [];
            this.nuevoMuerto = undefined;
            this.primerEscena = true;
            this.actualizarPersonajes = false;
            this.siguienteEscena = null;
            this.match = {winner:"", loser:"", MVP:"", MVPKilss:""};
            this.MVPList = [];
        });
        this.actualizacionPersonajes = data.personaje
        this.registry.events.on('pruebaEnvio1', (personajes, idSiguienteEscena, matchData) => {
            this.primerEscena = false;
            this.actualizarPersonajes = true
            this.cambiarEscena = true
            this.siguienteEscena = idSiguienteEscena
            console.log(idSiguienteEscena);
            this.nuevoMuerto = personajes.find((personaje) => {
                return personaje.estaVivo === false
            });
            this.peleadores = personajes.filter((personaje) => {
                this.MVPList.push(personaje)
                return personaje.estaVivo === true
            })
            this.pushearMuertos = true;
            (this.nuevoMuerto.tipo === 'Samurai') ? [this.quienPerdio = `${getPhrase(`ELIGE TU FICHA, `)}${getPhrase('Samurai').toUpperCase()}`] : [this.quienPerdio = `${getPhrase(`ELIGE TU FICHA, `)}${getPhrase('Vikingo').toUpperCase()}`];
            this.match = matchData;
            console.log(this.match);
            this.match = {
                winner: "",
                loser: "",
                MVP: this.match.MVP,
                MVPKilss: this.match.MVPKilss ,
            };
        });

        (this.pushearMuertos === true) ? [(this.nuevoMuerto.tipo === 'Samurai') ? this.muertosSamurais.push(this.nuevoMuerto) : this.muertosVikingos.push(this.nuevoMuerto), this.pushearMuertos = false] : null;
        (this.muertosVikingos.length === 5) ? [this.match.winner = "Samurais", this.match.loser = "Vikingos",  this.scene.start('VictoriaSamurai', { sonidos: this.sonidos, lenguaje: this.lenguaje, match: this.match })]: null;
        (this.muertosSamurais.length === 5) ? [this.match.winner = "Vikingos", this.match.loser = "Samurais",  this.scene.start('VictoriaSamurai', { sonidos: this.sonidos, lenguaje: this.lenguaje, match: this.match })] : null;
        (this.nuevoMuerto != undefined) ? this.listMuertos.push(this.nuevoMuerto) : null;
    }
    create() {
        let clasesTipo = {
            tipo: {
                1: "Vikingo",
                2: "Samurai"
            },
            clases: {
                1: "Peon",
                2: "Caballo",
                3: "Reina",
                4: "Alfil",
                5: "Torre",
            }
        }
        this.cameras.main.fadeIn(1000);
        let style = {
            fontSize: '30px',
            fontFamily: 'asian',
            color: '#000',
            border: 5,
        };
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'selectionBackground').setScale(1.13)
        new BotonSencillo({ scene: this, x: 70, y: 60, texture: 'botonVolver', text: '', size: 0, callback: () => this.scene.start('MainMenu'), scale: 0.75, callbackHover: () => { }, callbackOut: () => { } })
        this.#vikingoPeon = CrearPersonaje('Vikingo', 'Peon');
        this.#vikingoCaballo = CrearPersonaje('Vikingo', 'Caballo');
        this.#vikingoReina = CrearPersonaje('Vikingo', 'Reyna');
        this.#vikingoAlfil = CrearPersonaje('Vikingo', 'Alfil');
        this.#vikingoTorre = CrearPersonaje('Vikingo', 'Torre');
        this.#samuraiPeon = CrearPersonaje('Samurai', 'Peon');
        this.#samuraiCaballo = CrearPersonaje('Samurai', 'Caballo');
        this.#samuraiReina = CrearPersonaje('Samurai', 'Reyna');
        this.#samuraiAlfil = CrearPersonaje('Samurai', 'Alfil');
        this.#samuraiTorre = CrearPersonaje('Samurai', 'Torre');
        this.zoomSeleccionSamurai = this.add.image(380, 200, this.spriteI).setScale(.63)
        this.infoSeleccionSamurai = this.add.text(80, 325, '', style);
        this.zoomSeleccionVikingo = this.add.image(900, 200, this.spriteD).setScale(.63)
        this.infoSeleccionVikingo = this.add.text(680, 325, '', style);
        sharedInstance.on('zoom seleccion izquierda', (sprite, texto) => {
            this.spriteI = (sprite + 'Zoom')
            this.infoSeleccionSamurai.setText(texto)
            this.infoSeleccionSamurai.setStyle({ color: '#FFF' })
        });
        sharedInstance.on('zoom seleccion derecha', (sprite, texto) => {
            this.spriteD = (sprite + 'Zoom')
            this.infoSeleccionVikingo.setText(texto)
            this.infoSeleccionVikingo.setStyle({ color: '#FFF' })
        });
        this.botonPeonVikingo = new Button(this, 728, 542, 'seleccionPeonVikingo', "", 0, () => { this.peleadores.push(this.#vikingoPeon), this.botonListo1 = true }, 1, this.#vikingoPeon, 'zoom seleccion derecha')
        this.botonCaballoVikingo = new Button(this, 840, 542, 'seleccionCaballoVikingo', '', 0, () => { this.peleadores.push(this.#vikingoCaballo), this.botonListo1 = true }, 1, this.#vikingoCaballo, 'zoom seleccion derecha')
        this.botonReinaVikingo = new Button(this, 975, 542, 'seleccionReinaVikingo', '', 0, () => { this.peleadores.push(this.#vikingoReina), this.botonListo1 = true }, 1, this.#vikingoReina, 'zoom seleccion derecha')
        this.botonAlfilVikingo = new Button(this, 1110, 542, 'seleccionAlfilVikingo', '', 0, () => { this.peleadores.push(this.#vikingoAlfil), this.botonListo1 = true }, 1, this.#vikingoAlfil, 'zoom seleccion derecha')
        this.botonTorreVikingo = new Button(this, 1245, 542, 'seleccionTorreVikingo', '', 0, () => { this.peleadores.push(this.#vikingoTorre), this.botonListo1 = true }, 1, this.#vikingoTorre, 'zoom seleccion derecha')
        this.botonPeonSamurai = new Button(this, 546, 542, 'seleccionPeonSamurai', "", 0, () => { this.peleadores.push(this.#samuraiPeon), this.botonListo2 = true }, 1, this.#samuraiPeon, 'zoom seleccion izquierda')
        this.botonCaballoSamurai = new Button(this, 440, 542, 'seleccionCaballoSamurai', '', 0, () => { this.peleadores.push(this.#samuraiCaballo), this.botonListo2 = true }, 1, this.#samuraiCaballo, 'zoom seleccion izquierda')
        this.botonReinaSamurai = new Button(this, 300, 542, 'seleccionReinaSamurai', '', 0, () => { this.peleadores.push(this.#samuraiReina), this.botonListo2 = true }, 1, this.#samuraiReina, 'zoom seleccion izquierda')
        this.botonAlfilSamurai = new Button(this, 165, 542, 'seleccionAlfilSamurai', '', 0, () => { this.peleadores.push(this.#samuraiAlfil), this.botonListo2 = true }, 1, this.#samuraiAlfil, 'zoom seleccion izquierda')
        this.botonTorreSamurai = new Button(this, 30, 542, 'seleccionTorreSamurai', '', 0, () => { this.peleadores.push(this.#samuraiTorre), this.botonListo2 = true }, 1, this.#samuraiTorre, 'zoom seleccion izquierda')
        for (let n = 1; n <= 5; ++n) {
            this.arrayBotonesVikingo.push(eval("this.boton" + clasesTipo.clases[n] + clasesTipo.tipo[1]));
        }
        for (let n = 1; n <= 5; ++n) {
            this.arrayBotonesSamurai.push(eval("this.boton" + clasesTipo.clases[n] + clasesTipo.tipo[2]));
        }

        this.add.text(this.cameras.main.centerX, 100, this.quienPerdio, style).setStyle({ fontSize: '40px', fontDamily: 'asian' }).setOrigin(.5)
        this.add.text(this.cameras.main.centerX, 35, getPhrase('ELIGE TU HEROE'), style).setStyle({ fontSize: '60px', fontDamily: 'asian' }).setOrigin(.5)

        sharedInstance.on('MVP', (mvpData) => {
            console.log(mvpData);
            this.match = {
                winner:"",
                loser:"",
                MVP: (mvpData.MVP.tipo + " " + mvpData.MVP.clase).toString(),

                MVPKilss: mvpData.MVPKills
            }
        })
        this.registry.events.on('manejador de combates', () => {
            const objeto = {
                personajes: this.peleadores,
                sonidos: this.sonidos,
                lenguaje: this.lenguaje,
                escenarioId: this.siguienteEscena,
                match: this.match,
            };
            (this.primerEscena === true) ?
                [objeto.escenarioId = 3, this.primerEscena = false, this.scene.stop('SeleccionPersonaje'), this.scene.start("renderTest01", objeto), this.registry.events.removeListener('manejador de combates')]
                : [this.registry.events.removeListener('manejador de combates'), this.scene.stop('SeleccionPersonaje'), this.scene.start("renderTest01", objeto)];
        });
        this.registry.events.on('actualizar Botones Y Personajes', () => {
            const indice = {
                1: this.botonPeonVikingo,
                2: this.botonCaballoVikingo,
                3: this.botonReinaVikingo,
                4: this.botonAlfilVikingo,
                5: this.botonTorreVikingo,
                11: this.botonPeonSamurai,
                22: this.botonCaballoSamurai,
                33: this.botonReinaSamurai,
                44: this.botonAlfilSamurai,
                55: this.botonTorreSamurai,
            }
            for (let jugadorMuerto of this.listMuertos) {
                let boton = indice[jugadorMuerto.id];
                if (jugadorMuerto.tipo === 'Vikingo') {
                    this.botonListo1 = false;
                    this.botonListo2 = true;
                    boton.desactivarEntrada({ cartelParaMostrarDesactivado: getPhrase('MUERTO') })
                } else if (jugadorMuerto.tipo === 'Samurai') {
                    this.botonListo1 = true;
                    this.botonListo2 = false;
                    boton.desactivarEntrada({ cartelParaMostrarDesactivado: getPhrase('MUERTO') })
                }
            }
        });
    }
    update() {
        this.zoomSeleccionVikingo.setTexture(this.spriteD)
        this.zoomSeleccionSamurai.setTexture(this.spriteI)
        this.revisarListos()
        this.actualizarBotonesYPersonajes()
        this.mvpReview(this, this.MVPList)
    }
    revisarListos() {
        (this.botonListo1 && this.botonListo2 === true) ? [this.botonListo1 = false, this.botonListo2 = false, this.registry.events.emit('manejador de combates')] : null;
    }
    actualizarBotonesYPersonajes() {
        (this.actualizarPersonajes === true) ? [this.actualizarPersonajes = false, this.registry.events.emit('actualizar Botones Y Personajes')] : null;
    }
    mvpReview(scene, array) {
        let killDB = []
        let maxKills = null;
        array.forEach(element => {
            killDB.push(element.kills)
        });
        let arrayEmoty = [""];
        (array != arrayEmoty) ? [maxKills = Math.max.apply(null, killDB)] : [];
        if (maxKills != null) {
            // console.log(maxKills);
            let mvpObject
            array.forEach(element => {

                (element.kills === maxKills) ? [mvpObject = { MVP: { clase: element.clase, tipo: element.tipo }, MVPKills: maxKills }, sharedInstance.emit('MVP', mvpObject)] : [null];
            });
        }
    }
}