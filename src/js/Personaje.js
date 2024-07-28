import Phaser from "phaser";
import { sharedInstance } from "../scenes/EventCenter";
import { Random } from "random-js";
import { ManejadorDeSonidos } from "./ManejadorDeSonidos";
import { getPhrase } from "../services/translations";
import { Datos } from "./Datos";
const random = new Random()
//Setter como funcion/metodo y los getters con GET antes de la funcion
export class Personaje extends Phaser.Physics.Arcade.Sprite {
    SoloLaClaseDelPersonaje;
    #defensa;
    #contador = 0;
    #kills;
    constructor(props) {
        const { scene, x, y, vida, tiempo, sprite, poderes = [], velocidad, defensa, spriteSheet, tipo, id, estaVivo = true, clase , kills: kills} = props
        super(scene, x, y, sprite, 0)
        this.scene = scene;
        this.vidaBase = vida;
        this.vida = vida;
        this.tiempo = tiempo;
        this.sprite = sprite;
        this.poderes = poderes;
        this.velocidad = velocidad;
        this.spriteSheet = spriteSheet
        this.#defensa = defensa;
        this.tipo = tipo;
        this.clase = clase
        this.id = id;
        this.estaVivo = estaVivo;
        this.gano = null;
        this.defensa = false;
        this.ladronSamurai = true;
        this.ladronVikingo = true;
        this.probabilidad = 0;
        this.multiplicadorDeAtaque = 0;
        (kills != null)?[ this.#kills = kills]:[ this.#kills = 0];
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.allowGravity = false;
        this.img = this;
        this.img.setScale(.9);
        this.probabilidad = new Random();
        this.soloLaClaseyElTipoDelPersonaje = this.sprite.slice(9);
        this.quePersonajeSeCura();
        this.sonidos = new ManejadorDeSonidos({ scene: scene, volumen: 1, loop: false });


        sharedInstance.on('recibir ataqueCargado', (dano, tipo) => {
            this.sonidos.AtaqueCargadoCargando.pause();
            this.sonidos.AtaqueCargado.play();
            (tipo === this.tipo) ? this.recibirDano(dano) : null
        })
        sharedInstance.on('sangrado 1', (dano, tipo) => {
            if (tipo != this.tipo) {
                this.recibirDano(dano)
                this.pintar(0xbca0dc, 100, 300)
            }
        })
        sharedInstance.on('sangrado 2', (dano, tipo) => {
            if (tipo != this.tipo) {
                this.recibirDano(dano)
                this.pintar(0xbca0dc, 100, 300)
            }
        })
    }
    setDefensa(bool) {
        this.#defensa = bool
        this.sonidos.Defensa.play()
    }
    get getDefensa() {
        return this.#defensa
    }
    setPoder(indexAModificar, valor) {
        this.poderes[indexAModificar].dano = valor
    }
    atacar(indexDelDano, enemigo) {
        (this.play(this.poderes[indexDelDano].nombre))
        this.sonidos.Damage.play()
        enemigo.recibirDano(this.poderes[indexDelDano].dano)
    }
    // Se auto ataca con el ataque cargado
    cargarAtaque(indexDelDano) {
        this.sonidos.AtaqueCargadoCargando.play();
        this.dano = this.poderes[indexDelDano].dano
        sharedInstance.emit('turno vigente', this.dano, this.tipo)
    }
    setKills(){
        //agrega 1 kill para participar como MVP
        this.#kills = this.#kills+1;
    }
    get getKills(){
        return this.#kills;
    }

    //no utilizado por ahora
    animarAtaque(key) {
        this.play(key);
    }

    recibirDano(dano) {


        if (this.getDefensa === true) {
            this.porcentaje = this.poderes[3].dano
            this.vida -= (dano * (1 - this.porcentaje))
            this.pintar(0xe5c063, 100, 800)
            this.setDefensa(false)
            this.emitirEvento()
            // this.img.clearTint()
        } else {

            this.vida -= dano;
            this.pintar(0xFF00000, 300, 800)
            this.emitirEvento()
        }
        if (this.vida <= 0) {
            this.estaVivo = false;
            this.vida = 0;
        }
        let direccion
        (this.tipo === 'Samurai') ? [direccion = (this.x - 50)] : [direccion = (this.x + 50)];
        this.tweens = this.scene.tweens.add({
            targets: this.img,
            x: direccion,
            y: this.y,
            ease: "Bounce.easeInOut",
            duration: 500,
            repeat: 0,
            yoyo: true,
            onStart: () => {
            },
            onComplete: () => {
            }
        })
    }
    recibirCura(dano) {

        console.log('Estas en cura');
        this.vidaCheck = this.vida + dano;
        this.vidaCheck2 = this.vida + (this.vida * (dano / 3));
        let vidaCheckAlfil = this.vida + (this.vida * 0.45)
        let vidaCheckReyna = this.vida + dano


        if (this.SoloLaClaseDelPersonaje === 'Caballo') {
            console.log('Estas en cura de caballo');
            if (this.vida < (this.vidaBase * .5)) return console.log('LLego con menos del 50%', this.vida), this.vida = (this.vidaBase * 0.75), this.emitirEvento();
            if (this.vida >= (this.vidaBase * .5)) return console.log('LLego con mas del 50%', this.vida), this.vida, this.emitirEvento();

        } else if (this.SoloLaClaseDelPersonaje === 'Reyna') {
            console.log('Cura Reyna');
            if (this.vida >= this.vidaBase) {
                this.vida = this.vidaBase;
                return this.emitirEvento()

            } else if (vidaCheckReyna >= this.vidaBase) {
                return this.vida = this.vidaBase, this.emitirEvento()
            } else {
                this.vida += dano
                this.emitirEvento()
            }
            // (this.vida >= (this.vidaBase*.5))? this.vida += (this.vida * (dano/3)) :null;
            // (this.vida <  (this.vidaBase*.5))? this.vida += (this.vidaBase*dano)    :null;
            // this.emitirEvento()
        } else if (this.vida <= 0) {
            this.estaVivo = false;
            this.vida = 0;
            this.#contador = 0;
            return
        } else if (this.SoloLaClaseDelPersonaje === 'Alfil') {
            this.#contador++;
            if (this.#contador >= 4) return this.emitirEvento();

            if (this.vida >= this.vidaBase) { return this.vida, this.emitirEvento() }
            if (vidaCheckAlfil > this.vidaBase) { this.vida = this.vidaBase, this.emitirEvento() }
            else {
                this.vida += this.vida * 0.45;
                this.emitirEvento();
            }
        } else if (this.vida === this.vidaBase) {
            return
        } else if (this.vidaCheck > this.vidaBase) {
            this.vida = this.vidaBase
        } else {
            this.vida += dano;
        }
    }
    setGano(valor) {
        this.gano = valor;
    }
    getGano() {
        return this.gano;
    }
    doparHabilidad(indexAPotenciar, porcentaje, enemigo = null) {
        // this.poderes[index].dano += this.poderes[index].dano * porcentaje;
        if (this.id === 3 || this.id === 33) {
            this.sonidos.Damage.play()
            this.danoPotenciado = this.poderes[indexAPotenciar].dano
            enemigo.recibirDano(this.danoPotenciado + (this.poderes[indexAPotenciar].dano * porcentaje), null)
        } else {
            this.sonidos.DoparHabilidad.play()
            this.danoPotenciado = this.poderes[indexAPotenciar].dano + (this.poderes[indexAPotenciar].dano * porcentaje)
            this.setPoder(indexAPotenciar, this.danoPotenciado)
        }
    }

    activarDefensa() {
        this.pintar(0x00B7BF, 100, 700)
        this.defensa = true
    }
    pintar(color, tiempoTint, tiempoClear) {
        setTimeout(() => {
            this.img.setTint(color)
        }, tiempoTint)
        setTimeout(() => {
            this.img.clearTint()
        }, tiempoClear);
    }
    emitirEvento() {
        if (this.tipo === 'Samurai') {
            return sharedInstance.emit('actualiza Vida Samurai', this.vida)
            // console.log("actualizar vida de samurai")

        } else {
            return sharedInstance.emit('actualiza Vida Vikingo', this.vida)
            // console.log("actualizar vida de vikingo")
        }
    }
    robarVida(indexDelDano, enemigo) {
        this.sonidos.RobarVida.play()
        enemigo.recibirDano(this.poderes[indexDelDano].dano);
        this.cantidadVida = this.poderes[indexDelDano].dano * 0.75
        this.recibirCura(this.cantidadVida)
        // this.emitirEvento()
    }
    robarTurno(enemigo) {
        enemigo.recibirDano(10)

        this.probabilidadDeRobarTurno = Math.round(this.probabilidad.integer(1, 10))
        console.log(this.probabilidadDeRobarTurno);
        if (this.probabilidadDeRobarTurno <= 3) {
            sharedInstance.emit('robar-turno');
        }
    }

    multipleAtaque(indexDelDano, enemigo = null) {
        this.multiplicadorDeAtaque = this.probabilidad.integer(1, 3);
        enemigo.recibirDano((this.poderes[indexDelDano].dano) * this.multiplicadorDeAtaque)
    }

    danoPorTurno(dano) {
        this.danoXTurno = true;
        (this.tipo === 'Samurai') ? sharedInstance.emit('sangra Vikingo', dano, this.tipo) : sharedInstance.emit('sangra Samurai', dano, this.tipo);
    }
    quePersonajeSeCura() {
        this.ubicacionDeLaPalabraqueSeElimina = this.soloLaClaseyElTipoDelPersonaje.indexOf(this.tipo)
        this.soloLaClaseyElTipoDelPersonaje = this.soloLaClaseyElTipoDelPersonaje.slice(0, this.ubicacionDeLaPalabraqueSeElimina)
        return this.SoloLaClaseDelPersonaje = this.soloLaClaseyElTipoDelPersonaje
    }
}


/*
1=daño/damage
2=dopar
3=defensa
4=robar
5=perderTurno
6=curarse
7=arrollar/ataque cargado utiliza el turno con el que se selecciono, el siguiente y en el proximo ataca.
8=roba el turno. el enemigo pierde un turno
9=sangrado
*/



