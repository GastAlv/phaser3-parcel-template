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
        this.vidaBase = vida
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
        this.defensa = false;
        this.ladronSamurai = true;
        this.ladronVikingo = true;
        this.probabilidad = 0;
        this.multiplicadorDeAtaque = 0;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.allowGravity = false;
        this.img = this;
        this.img.setScale(2)
        this.probabilidad = new Random()
        sharedInstance.on('recibir ataqueCargado',(dano, tipo)=>{
            (tipo === this.tipo) ? this.recibirDano(dano):null
        })
        sharedInstance.on('sangrado 1',(dano, tipo)=>{
            if(tipo != this.tipo){
                this.recibirDano(dano)
                this.pintar(0xbca0dc, 100, 300)
            }
        })
        sharedInstance.on('sangrado 2',(dano, tipo)=>{
            if(tipo != this.tipo){
                this.recibirDano(dano)
                this.pintar(0xbca0dc, 100, 300)
            }
        })
    }
    setDefensa(bool){
        this.#defensa = bool
    }
    get getDefensa(){
        return this.#defensa
    }
    setPoder(indexAModificar, valor){
        this.poderes[indexAModificar].dano = valor
    }
    atacar(indexDelDano, enemigo){
        enemigo.recibirDano(this.poderes[indexDelDano].dano)
    }
    // Se auto ataca con el ataque cargado
    cargarAtaque(indexDelDano)
    {
        this.dano = this.poderes[indexDelDano].dano
        sharedInstance.emit('turno vigente', this.dano, this.tipo)
    }

    //no utilizado por ahora
    animarAtaque(key)
    {
        this.play(key);
    }

    recibirDano(dano){
        
        if(this.getDefensa === true)
        {
            this.porcentaje = this.poderes[3].dano
            this.vida -= (dano * (1 - this.porcentaje))
            this.pintar(0xe5c063, 100, 800)
            this.setDefensa(false)
            this.emitirEvento()
            // this.img.clearTint()
        }else {
            
            this.vida -= dano;
            this.pintar(0xFF00000, 300, 800)
            this.emitirEvento()
        }
        if(this.vida <= 0)
        {
            this.estaVivo = false;
            this.vida = 0;
        }
    }
    recibirCura(dano)
    {
        this.vidaCheck = this.vida+dano;
        this.vidaCheck2 = this.vida+(this.vida * (dano/3));
        if(this.id ===  2 || this.id === 22){
            (this.vida >= (this.vidaBase*.5))? this.vida :null;
            (this.vida < (this.vidaBase*.5))? this.vida = (this.vidaBase*0.75)  :null;
            this.emitirEvento()
        }else if(this.id ===  4 || this.id === 44){
            
            if(this.vida >= this.vidaBase)
            {
                this.vida = this.vidaBase;
                this.emitirEvento()
                return
            }
            (this.vida >= (this.vidaBase*.5))? this.vida += (this.vida * (dano/3)) :null;
            (this.vida <  (this.vidaBase*.5))? this.vida += (this.vidaBase*dano)    :null;
            
            this.emitirEvento()
        } else if(this.vida <= 0)
        {
            this.estaVivo = false;
            this.vida = 0
            return
        }else if(this.vida === this.vidaBase){
            return
        }else if(this.vidaCheck > this.vidaBase){
            this.vida = this.vidaBase
        }else{
            this.vida += dano;
        }
    }
    setGano(valor){
        this.gano = valor;
    }
    getGano(){
        return this.gano;
    }
    doparHabilidad(indexAPotenciar, porcentaje, enemigo = null){
        // this.poderes[index].dano += this.poderes[index].dano * porcentaje;
        if(this.id ===  3 || this.id === 33){
            this.danoPotenciado = this.poderes[indexAPotenciar].dano
            enemigo.recibirDano(this.danoPotenciado + (this.poderes[indexAPotenciar].dano * porcentaje), null)
        }else {
            this.danoPotenciado = this.poderes[indexAPotenciar].dano +(this.poderes[indexAPotenciar].dano * porcentaje)
            this.setPoder(indexAPotenciar, this.danoPotenciado)
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
            return sharedInstance.emit('actualiza Vida Samurai', this.vida)
            // console.log("actualizar vida de samurai")
            
        }else{
            return sharedInstance.emit('actualiza Vida Vikingo', this.vida)
            // console.log("actualizar vida de vikingo")
        }
    }
    robarVida(indexDelDano, enemigo)
    {
        enemigo.recibirDano(this.poderes[indexDelDano].dano);
        this.cantidadVida = this.poderes[indexDelDano].dano * 0.75
        this.recibirCura(this.cantidadVida)
        this.emitirEvento()
    }
    robarTurno(enemigo){
        enemigo.recibirDano(10)

        this.probabilidadDeRobarTurno = Math.round(this.probabilidad.integer(1,10))
        console.log(this.probabilidadDeRobarTurno);
        if(this.probabilidadDeRobarTurno <= 3){
            sharedInstance.emit('robar-turno');
        }
    }

    multipleAtaque(indexDelDano, enemigo=null)
    {
        this.multiplicadorDeAtaque = this.probabilidad.integer(1, 3);
        enemigo.recibirDano((this.poderes[indexDelDano].dano) * this.multiplicadorDeAtaque)
    }

    danoPorTurno(dano){
        this.danoXTurno = true;
        (this.tipo === 'Samurai')?sharedInstance.emit('sangra Vikingo',dano, this.tipo):sharedInstance.emit('sangra Samurai',dano, this.tipo);
    }
}
    export function convertirClase(clase){
        return {
        vida: clase.vida,
        sprite: clase.sprite,
        poderes: clase.poderes,
        spriteSheet: clase.spriteSheet,
        velocidad: clase.velocidad,
        defensa: clase.defensa,
        tipo: clase.tipo,
        estaVivo: clase.estaVivo,
        id: clase.id,
        vidaBase: clase.vidaBase
    }
    }
    export function Datos(vida, poderes, velocidad, defensa, clase, tipo){
        let id = 0;
        
        (tipo === 'Samurai' && clase === 'Peon')? id = 11:null;
        (tipo === 'Samurai' && clase === 'Caballo')? id = 22:null;
        (tipo === 'Samurai' && clase === 'Reyna')? id = 33:null;
        (tipo === 'Samurai' && clase === 'Alfil')? id = 44:null;
        (tipo === 'Samurai' && clase === 'Torre')? id = 55:null;

        (tipo === 'Vikingo' && clase === 'Peon')? id = 1:null;
        (tipo === 'Vikingo' && clase === 'Caballo')? id = 2:null;
        (tipo === 'Vikingo' && clase === 'Reyna')? id = 3:null;
        (tipo === 'Vikingo' && clase === 'Alfil')? id = 4:null;
        (tipo === 'Vikingo' && clase === 'Torre')? id = 5:null;
        return{
                vida: vida,
                sprite: `personaje${clase}${tipo}`,
                poderes: poderes,
                spriteSheet: `botonesAtaque${clase}`,
                velocidad: velocidad,
                defensa: defensa,
                tipo: tipo,
                estaVivo: true,
                id: id,
                vidaBase: vida,
                clase: clase
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

    export function CrearPersonaje(tipo, clase){
                const tipos = {
                    Peon: Datos(Math.round(random.integer(60, 68)), [
                        crearPoder(`ataqueRapidoPeon${tipo}`,(Math.round(random.integer(11, 14))), 1, 'Ataca al enemigo\n con un daño: min:11 a max:14'),
                        crearPoder(`ataqueEstandar`,(Math.round(random.integer(9, 15))), 1, 'Ataca al enemigo con un daño: min:9 a max:15'),
                        crearPoder(`momentoHisteria`, 0.3, 2, 'Aumenta el daño base en un 30%'),
                        crearPoder(`gritoDeGuerra`,(Math.round(random.integer(0.2, 0.3))), 3, `Intimida al enemigo reduciendo \n el dano recibido en un min:20% y max:30%`),
                    ], random.integer(4, 6), false, 'Peon', tipo),
                    Alfil:Datos(Math.round(random.integer(60, 68)), [
                        crearPoder(`ataqueRapidoAlfil${tipo}`, (Math.round(random.integer(10, 16))), 1,'Ataca al enemigo\n con un daño: min:10 a max:16'),
                        crearPoder(`sangrado`,10, 9,'Causa daño:10 en cada turno al enemigo'),
                        crearPoder(`curacion`, 0.45, 6, 'Se cura un 45% HP'),
                        crearPoder(`cantoMotivador`, null, 2, 'Aumenta el daño base en un 30%')
                    ], random.integer(6,7), false, 'Alfil', tipo),
                    Torre:Datos(Math.round(random.integer(85, 95)), [
                        crearPoder(`ataqueRapidoTorre${tipo}`, (Math.round(random.integer(18, 22))), 1, 'Ataca al enemigo\n con un daño: min:18 a max:22'),
                        crearPoder(`ataqueCargado`, (Math.round(random.integer(60, 65))), 7, 'Se carga el ataque y al tercer turno hace daño: min:60 a max:65'),
                        crearPoder(`arrollar`, 10, 8, 'Paraliza al enemigo\n por un turno'),
                        crearPoder(`refuerzo`, (Math.round(random.integer(0.40, 0.50))), 3, 'Reduce el daño recibido un 45% del daño')
                    ], random.integer(2,3), false, 'Torre', tipo),
                    Caballo:Datos(Math.round(random.integer(65, 75)), [
                        crearPoder(`ataqueRapidoCaballo${tipo}`,(Math.round(random.integer(17, 20))), 1, 'Ataca al enemigo\n con un daño: min:17 a max:20'),
                        crearPoder(`ataqueEstandar`, (Math.round(random.integer(13, 15))), 1, 'Ataca al enemigo con un daño: min:13 y max:15'),
                        crearPoder(`estampida`, 8, 5, 'Se ataca un numero repetida\n de veces con un daño menor al normal'),
                        crearPoder(`relinchar`, null, 6, 'Se cura un hasta un 75% HP cuando tiene menos de 50% de HP')
                    ], random.integer(7,8), false, 'Caballo', tipo),
                    Reyna:Datos(Math.round(random.integer(75, 85)), [
                        crearPoder(`ataqueRapidoReyna${tipo}`,(Math.round(random.integer(17, 25))), 1, 'Ataca al enemigo\n con un daño: min:17 a max:25'),
                        crearPoder(`boostCritico`, 0.80, 2, 'Aumenta el ataque en un 80% por un turno'),
                        crearPoder(`roboDeVida`, (Math.round(random.integer(10, 15))), 4, 'Se cura entre min:10% y max:15%\n del daño realizado'),
                        crearPoder(`esquiva`, 1, 3, 'Esquiva el siguiente ataque enemigo')
                    ], random.integer(8,9), false, 'Reyna', tipo)
                }
                return tipos[clase]
            }
    function crearPoder(nombre, dano, tipo, info){
        return{
            nombre: nombre,
            dano: dano,
            tipo: tipo,
            info: info
        }
    }
    // funcion que evalua que metodo/funcion usar para la habilidad
    export function escuchaDeHabilidades(tipo,index, atacante, enemigo){
        (tipo === 1) ? atacante.atacar(index, enemigo): null;
        (tipo === 2) ? atacante.doparHabilidad(0, atacante.poderes[index].dano, enemigo): null;
        (tipo === 3) ? atacante.setDefensa(true): null;
        (tipo === 4) ? atacante.robarVida(index, enemigo): null;
        (tipo === 5) ? atacante.multipleAtaque(index, enemigo): null;
        (tipo === 6) ? atacante.recibirCura(atacante.poderes[index].dano): null;
        (tipo === 7) ? atacante.cargarAtaque(index): null;
        (tipo === 8) ? atacante.robarTurno(enemigo): null;
        (tipo === 9) ? atacante.danoPorTurno(atacante.poderes[index].dano): null;
    }
    /*
    A modificar para las funciones en los ataque 

    *DOPAR HABILIDAD: ver de que no se hardcodee el poder que dopa en, porque es el index:0 siempre y ver si el usuario puede eleguir cual potenciar, 
    sino potencia su ataque 0 siempre. porque  habria que cambiarlos en todos los personajes para que decidan que poder dopar y se tendria que llamar dopar habilidad
    (Aumenta las estadisticas del poder seleccionado)

    *
    */
