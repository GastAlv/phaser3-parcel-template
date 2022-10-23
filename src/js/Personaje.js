import Phaser from "phaser";
import { sharedInstance } from "../scenes/EventCenter";
import { Random } from "random-js";
const random = new Random()
//Setter como funcion/metodo y los getters con GET antes de la funcion

export class Personaje extends Phaser.Physics.Arcade.Sprite
{
    #defensa;
    constructor(props){
        const {scene, x, y, vida, tiempo, sprite, poderes = [], velocidad, defensa, spriteSheet, tipo, id, estaVivo = true} = props
        super(scene, x, y, sprite, 0)
        this.vida = vida;
        this.tiempo = tiempo;
        this.sprite = sprite;
        this.poderes = poderes;
        this.velocidad = velocidad;
        this.spriteSheet = spriteSheet
        this.#defensa = defensa;
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

        sharedInstance.on('recibir ataqueCargado',(dano, tipo)=>{
            (tipo === this.tipo) ? this.recibirDano(dano):null
        })
    }
    setDefensa(bool){
        this.#defensa = bool
    }
    get getDefensa(){
        return this.#defensa
    }
    atacar(indexDelDano, enemigo){
        // this.key = this.poderes[indexDelDano].nombre
        // console.log(this.poderes[indexDelDano].dano)
        enemigo.recibirDano(this.poderes[indexDelDano].dano, this)
    }
    cargarAtaque(indexDelDano)
    {
        this.dano = this.poderes[indexDelDano].dano
        sharedInstance.emit('turno vigente', this.dano)
        // console.log('Ataque cargado', this.dano)
    }
    animarAtaque(key)
    {
        this.play(key);
        //{true} le da jerarquia a la que lo tiene
    }

    recibirDano(dano){
        this.pintar(0xFF00000, 300, 800)
        if(this.getDefensa === true)
        {
            this.porcentaje = this.poderes[3].dano
            this.vida -= (dano * (1 - this.porcentaje))
            this.setDefensa(false)
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
    doparHabilidad(index, porcentaje, enemigo = null){
        // this.poderes[index].dano += this.poderes[index].dano * porcentaje;
        if(this.id ===  '3' || this.id === '33'){
            enemigo.recibirDano(this.poderes[index].dano * porcentaje, null)
        } else {
            this.poderes[index].dano +=  this.poderes[index].dano * porcentaje

        }
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
        if(this.tipo === 'Samurai'){
            return sharedInstance.emit('actualiza Vida Samurai', this.vida),
            console.log("actualizar vida de samurai")
            
        }else{
            return sharedInstance.emit('actualiza Vida Vikingo', this.vida),
            console.log("actualizar vida de vikingo")
        }
    }
    robarVida(indexDelDano, enemigo)
    {
        //this.atacar(indexDelDano, enemigo)
        enemigo.recibirDano(this.poderes[indexDelDano].dano);
        // console.log('ESTE ES EL DAÑO QUE RECIBE: ',this.poderes[indexDelDano].dano);
        this.cantidadVida = this.poderes[indexDelDano].dano * 0.75
        this.recibirCura(this.cantidadVida)
        this.emitirEvento()
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
    export function Datos(vida, poderes, velocidad, defensa, clase, tipo){
        let id = 0;
        
        (tipo === 'Samurai' && clase === 'Peon')? id = 11:null;
        // (tipo === 'Samurai' && clase === 'Torre')? this.tipo = 11:null;
        // (tipo === 'Samurai' && clase === 'Alfil')? this.tipo = 11:null;
        (tipo === 'Samurai' && clase === 'Caballo')? id = 22:null;
        (tipo === 'Samurai' && clase === 'Reyna')? id = 33:null;

        (tipo === 'Vikingo' && clase === 'Peon')? id = 1:null;
        // (tipo === 'Vikingo' && clase === 'Torre')? this.tipo = 1:null;
        // (tipo === 'Vikingo' && clase === 'Alfil')? this.tipo = 1:null;
        (tipo === 'Vikingo' && clase === 'Caballo')? id = 2:null;
        (tipo === 'Vikingo' && clase === 'Reyna')? id = 3:null;
        return{
                vida: vida,
                sprite: `personaje${clase}${tipo}`,
                poderes: poderes,
                spriteSheet: `botonesAtaque${clase}`,
                velocidad: velocidad,
                defensa: defensa,
                tipo: tipo,
                estaVivo: true,
                id: id
            }
    }

    /*
    1=daño/damage
    2=dopar
    3=defensa
    4=robar
    5=perderTurno
    */

    export function CrearPersonaje(tipo, clase){

                const tipos = {
                    Peon: Datos(Math.round(random.integer(20, 20)), [
                        crearPoder(`ataqueRapidoPeon${tipo}`,(Math.round(random.integer(11, 14))), 1),
                        crearPoder(`ataqueEstandar`,(Math.round(random.integer(60, 68))), 1),
                        crearPoder(`momentoHisteria`, 0.3, 2),
                        crearPoder(`gritoDeGuerra`,(Math.round(random.integer(0.2, 0.3))), 3),
                    ], random.integer(4, 6), false, 'Peon', tipo),
                    Alfil:Datos(Math.round(random.integer(60, 68)), [
                        crearPoder(`ataqueRapidoAlfil${tipo}`),
                        crearPoder(`sangrado`),
                        crearPoder(`curacion`),
                        crearPoder(`cantoMotivador`)
                    ], random.integer(6,7), false, 'Alfil', tipo),
                    Torre:Datos(Math.round(random.integer(60, 68)), [
                        crearPoder(`ataqueRapidoTorre${tipo}`),
                        crearPoder(`ataqueCargado`),
                        crearPoder(`arrollar`),
                        crearPoder(`refuerzo`, (Math.round(random.integer(0.40, 0.50))))
                    ], random.integer(2,3), false, 'Torre', tipo),
                    Caballo:Datos(Math.round(random.integer(65, 75)), [
                        crearPoder(`ataqueRapidoCaballo${tipo}`,(Math.round(random.integer(10, 18)))),
                        crearPoder(`ataqueEstandar`),
                        crearPoder(`estampida`),
                        crearPoder(`relinchar`)
                    ], random.integer(7,8), false, 'Caballo', tipo),
                    Reyna:Datos(Math.round(random.integer(75, 85)), [
                        crearPoder(`ataqueRapidoReyna${tipo}`,(Math.round(random.integer(17, 25)))),
                        crearPoder(`boostCritico`,(Math.round(random.integer(0.80, 0.85)))),
                        crearPoder(`roboDeVida`, (Math.round(random.integer(10, 15)))),
                        crearPoder(`esquiva`, 1)
                    ], random.integer(8,9), false, 'Reyna', tipo)
                }
                return tipos[clase]
            }
            
    function crearPoder(nombre, dano, tipo){
        return{
            nombre: nombre,
            dano: dano,
            tipo: tipo,
        }
    }

    export function escuchaDeHabilidades(tipo,index, atacante, enemigo){
        const eventoEscucha = {
            1: atacante.atacar(index, enemigo),
            2: atacante.doparHabilidad(index, atacante.poderes[index].dano),
            3: atacante.activarDefensa(),
            4: atacante.robarVida(index, enemigo),
            // 5: []
        }
        // console.log(this.poderesPeon) 
        // console.log(eventoEscucha)
        return eventoEscucha[tipo]
    }

    export class Habilidades{
        constructor(atacante, clase, enemigo){
            this.clases = clase
            this.clases.slice(0, -7)
            const eventoEscucha2 = {
                personajePeon: [atacante.atacar(0, enemigo), atacante.atacar(1, enemigo), atacante.doparHabilidad(2, atacante.poderes[2].dano), atacante.activarDefensa()],
                personajeCaballo: [atacante.atacar(0, enemigo), atacante.atacar(1, enemigo), null, null],
                personajeReyna: [atacante.atacar(0, enemigo), atacante.doparHabilidad(0, atacante.poderes[1].dano, enemigo), atacante.robarVida(2, enemigo), null],
                personajeAlfil : [],
                personajeTorre : []
            }
            this.poderes = eventoEscucha2[this.clases]
        }
        primerPoder(){
            return this.poderes[0]
        }
        segundoPoder(){
            return this.poderes[1]
        }
        tercerPoder(){
            return this.poderes[2]
        }
        cuartoPoder(){
            return this.poderes[3]
        }

    }
