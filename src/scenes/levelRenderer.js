import Phaser from "phaser";
import { saveMatch} from "../firebaseDB/saveWinner";
import {Personaje} from "../js/Personaje";
import {convertirClase}from "../js/Funciones/ConvertirClase"
import { getPhrase } from "../services/translations";
import { BotonSencillo } from "../js/Buttons/BotonSencillo";
import { removerEscuchas } from "../js/Funciones/RemoverEscuchas";
import { escuchaDeHabilidades } from "../js/Funciones/EscuchaDeHabilidades";

export default class renderTest01 extends Phaser.Scene {
    constructor() {
        super('renderTest01')
    }
    init(data) {
        this.datos = data;
        this.personajes = data.personajes;
        this.sonidos = data.sonidos;
        this.lenguaje = data.lenguaje;
        this.match = data.match;
        console.log(this.match);

        this.escenarioId = data.escenarioId;

        this.personajeIzquierda = this.personajes.find((personaje) => {
            return personaje.tipo == 'Samurai'
        });
        this.personajeDerecha = this.personajes.find((personaje) => {
            return personaje.tipo == 'Vikingo'
        });
    }
    preload() { }
    create() {
        let backgroundAndUbi = {
            1: {
                id: "escenarioCastillo",
                ubi: {
                    xLeft: 450,
                    xRigth: 750,
                    y: 270,
                }
            },
            2: {
                id: "escenarioCiudad",
                ubi: {
                    xLeft: 450,
                    xRigth: 750,
                    y: 270,
                }
            },
            3: {
                id: "escenarioPuente",
                ubi: {
                    xLeft: 420,
                    xRigth: 850,
                    y: 225,
                }
            },
            4: {
                id: "escenarioBosque",
                ubi: {
                    xLeft: 450,
                    xRigth: 750,
                    y: 320,
                }
            },
            5: {
                id: "escenarioCosta",
                ubi: {
                    xLeft: 450,
                    xRigth: 750,
                    y: 275,
                }
            },
        };
        this.sonidos.MainMenuSonido.pause()
        this.sonidos.CombateSong.play()
        //que imagen segun el nivel/escenario
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, backgroundAndUbi[this.escenarioId].id).setScale(1.135);
        new BotonSencillo({ scene: this, x: 70, y: 60, texture: 'botonVolver', text: '', size: 0, callback: () => { removerEscuchas({ scene: this, idEscena: this.scene.key }), this.scene.start('MainMenu', { lenguaje: this.lenguaje, sonidos: this.sonidos }) }, scale: 0.75, callbackHover: () => { this.sonidos.HoverBoton.play() }, callbackOut: () => { this.sonidos.HoverBoton.pause() } });
        this.personajeDeIzquierda = new Personaje({
            scene: this,
            x: backgroundAndUbi[this.escenarioId].ubi.xLeft,
            y: backgroundAndUbi[this.escenarioId].ubi.y,
            vida: this.personajeIzquierda.vida,
            sprite: this.personajeIzquierda.sprite,
            poderes: this.personajeIzquierda.poderes,
            velocidad: this.personajeIzquierda.velocidad,
            defensa: this.personajeIzquierda.defensa,
            spriteSheet: this.personajeIzquierda.spriteSheet,
            estaVivo: this.personajeIzquierda.estaVivo,
            tipo: this.personajeIzquierda.tipo,
            id: this.personajeIzquierda.id,
            clase: this.personajeIzquierda.clase,
            kills: this.personajeIzquierda.kills
        });
        console.log(this.personajeIzquierda.kill);

        this.personajeDeDerecha = new Personaje({
            scene: this,
            x: backgroundAndUbi[this.escenarioId].ubi.xRigth,
            y: backgroundAndUbi[this.escenarioId].ubi.y,
            vida: this.personajeDerecha.vida,
            sprite: this.personajeDerecha.sprite,
            poderes: this.personajeDerecha.poderes,
            velocidad: this.personajeDerecha.velocidad,
            defensa: this.personajeDerecha.defensa,
            spriteSheet: this.personajeDerecha.spriteSheet,
            estaVivo: this.personajeDerecha.estaVivo,
            tipo: this.personajeDerecha.tipo,
            id: this.personajeDerecha.id,
            clase: this.personajeDerecha.clase,
            kills: this.personajeDerecha.kills
        });
        console.log(this.personajeDerecha.kill);


        for (let numberPower = 0; numberPower <= 3; numberPower++) {
            let namePower = (this.personajeDeDerecha.tipo + " poder" + (numberPower.toString()));
            this.registry.events.on(namePower, () => {
                escuchaDeHabilidades(this.personajeDeDerecha.poderes[numberPower].tipo, numberPower, this.personajeDeDerecha, this.personajeDeIzquierda);
                console.log("el evento" + namePower + "escucho");
            });
        }
        for (let numberPower = 0; numberPower <= 3; numberPower++) {
            let namePower = (this.personajeDeIzquierda.tipo + " poder" + (numberPower.toString()));
            this.registry.events.on(namePower, () => {
                escuchaDeHabilidades(this.personajeDeIzquierda.poderes[numberPower].tipo, numberPower, this.personajeDeIzquierda, this.personajeDeDerecha);
                console.log("el evento" + namePower + "escucho");
            });
        }
        this.textGanador = this.add.text(this.cameras.main.centerX / 1.5, this.cameras.main.centerY / 2, '', { fontSize: '100px', color: '#bfb70a', fontFamily: 'asian' });
        const objeto = {
            personajes: this.personajes,
            sonidos: this.sonidos,
        };
        this.scene.moveAbove('renderTest01', 'Ui');
        this.scene.launch('Ui', objeto);

        this.registry.events.on('victoria de combate', (ganador) => {
            this.registry.events.emit('detener timer y todo los pads')
            this.textGanador.setText(`${getPhrase('GANA')} ${getPhrase(ganador).toUpperCase()}`);
            console.log('llego el ganador');
            let timeOutParaSiguienteCombate = setTimeout(() => {
                this.registry.events.emit('siguiente combate', ganador)
                clearTimeout(timeOutParaSiguienteCombate)
            }, 5000);
        });

        this.registry.events.on('Evaluar vivos', (vida, tipo) => {
            console.log('batalla puente valuar');
            console.log(tipo, vida);
            (vida < 1) ? this.registry.events.emit('victoria de combate', tipo) : null;
            console.log('Estoy en evaluar');
            this.registry.events.removeListener('Evaluar vivos');
        });
        this.registry.events.on('siguiente combate', (ganador) => {

            let escenarioSuiguienteId;
            ganador === "Vikingo" ? [escenarioSuiguienteId = this.escenarioId - 1] : [escenarioSuiguienteId = this.escenarioId + 1];
            this.personajesActuales = [this.personajeDeIzquierda, this.personajeDeDerecha];

            //logica mvpdata kills
            this.personajesActuales.forEach((personaje) => {
                (personaje.estaVivo === true) ? [console.log(personaje), personaje.setKills(), console.log(personaje.getKills)] : [null];
            })
            this.personajesActuales = [convertirClase(this.personajeDeIzquierda), convertirClase(this.personajeDeDerecha)];
            console.log(this.personajesActuales);
            for (let numberPower = 0; numberPower <= 3; numberPower++) {
                let namePower = (this.personajeDeDerecha.tipo + " poder" + (numberPower.toString()));
                this.registry.events.removeListener(namePower);
            }
            for (let numberPower = 0; numberPower <= 3; numberPower++) {
                let namePower = (this.personajeDeIzquierda.tipo + " poder" + (numberPower.toString()));
                this.registry.events.removeListener(namePower);
            }
            this.registry.events.removeListener('victoria de combate');
            this.registry.events.removeListener('siguiente combate');


            let match;
            escenarioSuiguienteId === 6 ? [match = {
                winner: "Samurais",
                loser: "Vikingos",
                MVP: this.match.MVP,
                MVPKilss: this.match.MVPKilss,
            }, this.scene.start("VictoriaSamurai", { sonidos: this.sonidos, lenguaje: this.lenguaje, match: match })] :
                [
                    escenarioSuiguienteId === 0 ? [match = {
                        winner: "Vikingos",
                        loser: "Samurais",
                        MVP: this.match.MVP,
                        MVPKilss: this.match.MVPKilss,
                    }, this.scene.start("VictoriaSamurai", { sonidos: this.sonidos, lenguaje: this.lenguaje, match: match })] :
                        [this.scene.start('SeleccionPersonaje', { sonidos: this.sonidos, lenguaje: this.lenguaje}), this.registry.events.emit('pruebaEnvio1', this.personajesActuales, escenarioSuiguienteId, this.match)]
                ];
            this.scene.stop('Ui');
            this.scene.stop('renderTest01');
        });
    }
    update() { }
}