import Phaser from "phaser";
import Poder from "./Poderes";
import { sharedInstance } from "../scenes/EventCenter";
import { Constraint } from "matter";

export class Personaje extends Phaser.Physics.Arcade.Sprite
{
    constructor(props){
        const {scene, x, y, vida, tiempo, sprite, poderes = [], velocidad, defensa, spriteSheet, tipo, id, estaVivo = true} = props
        super(scene, x, y, sprite, 0)
        this.vida = vida;
        this.tiempo = tiempo;
        this.sprite = sprite;
        this.poderes = poderes;
        this.velocidad = velocidad;
        this.spriteSheet = spriteSheet
        this.defensa = defensa;
        this.tipo = tipo;
        this.id = id;
        this.estaVivo = estaVivo;
        this.gano = null;
        this.defensa = false
        // this.img = scene.add.sprite(x, y, this.sprite, 0)
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.allowGravity = false;
        this.img = this;
        this.img.setScale(2)
        console.log(scene.constructor.name)

    }
    atacar(indexDelDano, enemigo){
        this.key = this.poderes[indexDelDano].nombre
        console.log(this.poderes[indexDelDano].nombre)
        enemigo.recibirDano(this.poderes[indexDelDano].dano, enemigo.poderes[3].dano, this)
        //this.play(this.poderes[indexDelDano].nombre, true);
        // this.animarAtaque(this.key)
    }

    // play: function (key, ignoreIfPlaying)
    // {
    //     return this.anims.play(key, ignoreIfPlaying);
    // }

    animarAtaque(key)
    {
        this.play(key);
        //{true} le da jerarquia a la que lo tiene
    }

    recibirDano(dano, porcentaje){
        this.pintar(0xFF00000, 300, 800)
        if(this.defensa === true)
        {
            this.vida -= (dano * (1 - porcentaje))
            this.defensa = false
            this.emitirEvento()
            // this.img.clearTint()
        } else {
            
            this.vida -= dano;
            console.log('animacion recibir daño')
            this.emitirEvento()
            // this.img.clearTint()
        }
        if(this.vida <= 0)
        {
            this.estaVivo = false;
            this.vida = 0;
            console.log('animacion de muerte')
            console.log('murio!.')
        }
        console.log(this.vida)
    }

    recibirCura(dano)
    {
        if(this.vida <= 0)
        {
            this.estaVivo = false;
            this.vida = 0
            return
        }        
        this.vida += dano;
        // console.log('animacion recibir cura');
    }

    agregarPoder(keyPoder)
    {
        this.poderes.push(keyPoder)
    }

    elegirPoder(index)
    {
        return this.poderes[index]
    }
    actualizarDatos(objeto){
        this.vida = objeto.vida;
        this.tiempo = objeto.tiempo;
        this.sprite = objeto.sprite;
        this.poderes = objeto.poderes;
        this.velocidad = objeto.velocidad;
        this.defensa = objeto.defensa
        this.estaVivo = objeto.estaVivo
        this.id = objeto.id
    }
    setGano(valor){
        this.gano = valor;
    }
    getGano(){
        return this.gano;
    }
    doparHabilidad(index, porcentaje){
        // this.poderes[index].dano += this.poderes[index].dano * porcentaje;
        this.poderes[index].dano +=  this.poderes[index].dano * porcentaje
        console.log('Este es el daño potenciado: ' + this.poderes[index].dano)
    }

    activarDefensa()
    {
        this.pintar(0x00B7BF, 100, 700)
        this.defensa = true
    }
    pintar(color, tiempoTint, tiempoClear){
        setTimeout(()=> {
            this.img.setTint(color)
        },tiempoTint)
        setTimeout(() => {
            this.img.clearTint()
        }, tiempoClear);
    }
    emitirEvento(){
        if(this.tipo === 'samurai'){
            return sharedInstance.emit('actualiza Vida Samurai', this.vida),
            console.log("actualizar vida de samurai")
            
        }else{
            return sharedInstance.emit('actualiza Vida Vikingo', this.vida),
            console.log("actualizar vida de vikingo")
        }
    }
}
export function convertirClase(clase){
        return {
        x: clase.img.x,
        y: clase.img.y,
        vida: clase.vida,
        sprite: clase.sprite,
        poderes: clase.poderes,
        spriteSheet: clase.spriteSheet,
        velocidad: clase.velocidad,
        defensa: clase.defensa,
        tipo: clase.tipo,
        estaVivo: clase.estaVivo,
        id: clase.id}
    }

    /*el objeto llega desde el combate. el array =THIS.PELEADORES tiene todos los objetos de seleccion de personaje * HAY Q DEFINIR
    TODOS LOS OBJETOS EN EL INIT O ANTES DE Q HAGAMOS LA VALIDACION ES DECIR DENTRO DEL EVENTO ESCUCHA IGUAL*/
    export function filtrarElJugadorVivoYPushearElObjeto(objeto, array){
        if(objeto.sprite === 'personajePeonVikingo'){
            return array.push(this.array[0])
        }else if(objeto.sprite === 'personajeCaballoVikingo'){
            return array.push(this.array[1])
        }else if(objeto.sprite === 'personajeReynaVikingo'){
            return array.push(this.array[2])
        }else if(objeto.sprite === 'personajePeonSamurai'){
            return array.push(this.array[3])
        }else if(objeto.sprite === 'personajeCaballoSamurai'){
            return array.push(this.array[4])
        }else if(objeto.sprite === 'personajeReynaSamurai'){
            return array.push(this.array[5])
        }
    }

    let peonVikingo={
        vida: 100,
        sprite: 'personajePeonVikingo',
        poderes: [
            {nombre: 'ataqueRapidoPeonVikingo', dano: 20, velocidad: 10},
            {nombre: 'ataqueEstandar', dano: 30, velocidad: 6},
            {nombre: 'gritoDeGuerra', dano: 0.2},
            {nombre: 'momentoHisteria', dano: 0.5}
        ],
        spriteSheet:'botonesAtaquePeon',
        velocidad: 5,
        defensa: false,
        tipo: 'vikingo',
        estaVivo: true,
        id: 1
    }
    export class datosPersonaje{
        constructor(props){
            const{vida, sprite, poderes, spriteSheet, velocidad, defensa, tipo, estaVivo, id}= props
            this.vida = vida;
            this.sprite = sprite;
            this.poderes = poderes,
            this.spriteSheet = spriteSheet;
            this.velocidad = velocidad;
            this.defensa = defensa;
            this.tipo = tipo;
            this.estaVivo = estaVivo;
            this.id = id;
        }
        actualizarComponente(componente, componenteNueva){
            componente = componenteNueva
        }
        /* ejepmlo de uso con la vida actualizada que llega desde los combates
        actualizarComponente(this.vida, this.personaje.vida){

        }*/
    }

    //sharedInstance.emit()
    export{peonVikingo}


