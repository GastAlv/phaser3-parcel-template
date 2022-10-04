import Phaser from "phaser";
import Button from "../js/button";
import Personaje from "../js/Jugador";
import Poder from "../js/Poderes";

export default class Juego extends Phaser.Scene
{
    #jugadores
    constructor(){
        super('Juego')
    }

    init(data)
    {
        console.log(data)
        this.#jugadores = data.personajes

    
    }  


    create() {
        const menuSeleccionFaccion = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'escenarioB').setScale(1.135)
        const botonVolver = new Button(this, 70, 60, 'botonVolver', '', 0,  () => this.scene.start('MainMenu'), 0.75)

        const peonSamurai1 = this.#jugadores[0];

        // const { peonSamurai, peonVikingo} = this.#jugadores
        console.log(peonSamurai1)

        const vikingoPeonImagenAgregada = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, peonSamurai1.sprite)

        // for(let player of this.#jugadores){
        //     console.log(player);
        //     const {textura, name, vida} = player;
        //     if(player.type === "peon"){
        //         new Peon(textura, name, vida)
        //     }
        
        
        
        const vikingoPeon = new Personaje({
            vida: 100,
            tiempo: 15,
            sprite: '',
            poderes: [],
            velocidad: 8,
            defensa: 7,
            estaVivo: true
        });
        
        const samuraiPeon = new Personaje({
            vida: 100,
            tiempo: 15,
            sprite: '',
            poderes: [],
            velocidad: 8,
            defensa: 7,
            estaVivo: true
        })



        const peonAtaqueRapido = new Poder({
            nombre: 'Ataque Rapido',
            dano: 60,
            tipo: 'damage'
        })

        const peonCuracion = new Poder({
            nombre: 'Curacion',
            dano: 30,
            tipo: 'curacion'
        })





        // vikingoPeon.poderes.push(vikingoAtaqueRapido, vikingoCuracion)
        console.log('Poderes vikingo', vikingoPeon.poderes)

        vikingoPeon.agregarPoder(peonAtaqueRapido)
        vikingoPeon.agregarPoder(peonCuracion)

        samuraiPeon.agregarPoder(peonAtaqueRapido)
        samuraiPeon.agregarPoder(peonCuracion)

        console.log('Poderes vikingo', vikingoPeon.poderes)

        console.log(samuraiPeon.vida)
        vikingoPeon.atacar(vikingoPeon, 0, samuraiPeon);
        console.log(samuraiPeon.vida)

        samuraiPeon.recibirCura(peonCuracion.dano);
        console.log(samuraiPeon.vida)

        


        // const vikingoAtaque = vikingoPeon.poderes[0].dano
        
        // console.log(samuraiPeon.vida)
        // vikingoPeon.atacar(samuraiPeon, vikingoAtaque, vikingoAtaqueRapido.nombre);
        //console.log('vida del peon samurai:' + samuraiPeon.vida)

        // vikingoPeon.atacar(samuraiPeon, vikingoAtaque, vikingoAtaqueRapido.nombre);
        //console.log('vida del peon samurai:' + samuraiPeon.vida)


        // samuraiPeon.recibirCura(vikingoCuracion.dano)
        // console.log('vida del peon samurai:' + samuraiPeon.vida)

        // console.log(samuraiPeon.poderes)
        // console.log(vikingoPeon.elegirPoder(1));


        
    }

    update()
    {
        
    }
}
