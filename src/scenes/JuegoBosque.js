import Phaser from "phaser";
import { Button } from "../js/button";
import Personaje from "../js/Jugador";
import Poder from "../js/Poderes";
import { sharedInstance as events } from './EventCenter'

export default class Juego extends Phaser.Scene
{
    jugador1;
    jugador2;
    jugadores = [];
    escenarioPuente;
    escenarioBosque;

    
    constructor(){
        super('Juego')
    }

    init(data)
    {
        this.jugadores = data.personajes
        this.arrayJugadores = data.arrayJugadores

        
    }  
    create() {
        
        this.escenarioBosque  = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'escenarioB').setScale(1.135)

        new Button(this, 70, 60, 'botonVolver', '', 0,  () => this.scene.start('MainMenu'), 0.75)





        //const {personaje1, personaje2} = this.jugadores;
        const personaje1 = this.jugadores[0]
        const personaje2 = this.jugadores[1]
        // personaje1 izquierda
        // personaje2 derecha
        
        this.personaje1 = new Personaje({
            vida: personaje1.vida,
            sprite: personaje1.sprite,
            poderes: personaje1.poderes,
            velocidad: personaje1.velocidad,
            defensa: personaje1.defensa,
            estaVivo: personaje1.estaVivo,
            id: personaje1.id
        });
        this.personaje2 = new Personaje({
            vida: personaje2.vida,
            sprite: personaje2.sprite,
            poderes: personaje2.poderes,
            velocidad: personaje2.velocidad,
            defensa: personaje2.defensa,
            estaVivo: personaje2.estaVivo,
            id: personaje2.id
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
        // console.log(personaje1.id)
        
        // vikingoPeon.poderes.push(vikingoAtaqueRapido, vikingoCuracion)
        //console.log('Poderes vikingo', this.vikingoPeon.poderes)

        this.personaje2.agregarPoder(peonAtaqueRapido)
        this.personaje2.agregarPoder(peonCuracion)

        this.personaje1.agregarPoder(peonAtaqueRapido)
        this.personaje1.agregarPoder(peonCuracion)
        
        new Button(this, 400, 600, 'botonMarco', 'ataca a el samurai', 50,  () => {
            this.personaje2.atacar(this.personaje2, 0, this.personaje1), this.registry.events.emit('pepe', this.array2)}, 0.5)

        new Button(this, 800, 600, 'botonMarco', 'ataca a el vikingo', 50,  () => {
            this.personaje1.atacar(this.personaje1, 0, this.personaje2), this.registry.events.emit('pepe', this.array2)}, 0.5)

        // console.log('Poderes vikingo', this.personaje2.poderes)
        // console.log(this.personaje2.poderes[1].dano)

        // console.log(this.personaje1.vida)
        // this.personaje2.atacar(this.personaje2, 0, this.personaje1);
        // console.log(this.personaje1.vida)

        // this.personaje1.recibirCura(peonCuracion.dano);
        // console.log(this.personaje1.vida)
        // const vikingoAtaque = this.personaje2.poderes[0].dano
        
        // console.log(this.personaje1.vida)
        // this.personaje2.atacar(this.personaje1, vikingoAtaque, vikingoAtaqueRapido.nombre);
        // console.log('vida del peon samurai:' + this.personaje1.vida)

        // this.personaje2.atacar(this.personaje1, vikingoAtaque, vikingoAtaqueRapido.nombre);
        // console.log('vida del peon samurai:' + this.personaje1.vida)


        // this.personaje1.recibirCura(vikingoCuracion.dano)
        // console.log('vida del peon samurai:' + this.personaje1.vida)

        // console.log(this.personaje1.poderes)
        // console.log(this.personaje2.elegirPoder(1));
        this.personajesActuales = [this.personaje1, this.personaje2]
        console.log(this.personajesActuales)
    }

    update()
    {
        if(this.personaje1.estaVivo === false){
            
            //emitir evento para q listo 1 y 2 se vuelvan false
            this.registry.events.emit('actualizacion', this.personaje1.id, this.personajesActuales, this.arrayJugadores)

            this.scene.start('SeleccionPersonaje', this.arrayJugadores)
            
            
        }
        if(this.personaje2.estaVivo === false){
            this.registry.events.emit('actualizacion', this.personaje2.id, this.personajesActuales, this.arrayJugadores);

            this.scene.start('SeleccionPersonaje', this.arrayJugadores)
        }
    }
}
