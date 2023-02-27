/* receive data
objet{
    data:,
    personajes:,
    sonidos:,
    lenguaje:,
}
*/

import Phaser from "phaser";
import { BotonSencillo} from "../js/button";
import { convertirClase, escuchaDeHabilidades, Personaje, removerEscuchas } from "../js/Personaje";
import { getPhrase} from "../services/translations";
export default class renderTest01 extends Phaser.Scene {
    constructor() {
        super('renderTest01')
    }
    init(data) {
        this.datos = data;
        this.personajes = data.personajes;
        this.sonidos = data.sonidos;
        this.lenguaje = data.lenguaje;

        this.escenarioId = data.escenarioId;

        this.personajeIzquierda = this.personajes.find((personaje)=>{
            return personaje.tipo == 'Samurai'
        });
        this.personajeDerecha = this.personajes.find((personaje)=>{
            return personaje.tipo == 'Vikingo'
        });
    }
    preload(){}
    create(){
        let backgrounds = {
            1:"escenarioCastillo",
            2:"escenarioCiudad",
            3:"escenarioPuente",
            4:"escenarioBosque",
            5:"escenarioCosta",
        };
        this.sonidos.MainMenuSonido.pause()
        this.sonidos.CombateSong.play()

        //que imagen segun el nivel/escenario
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, backgrounds[this.escenarioId]).setScale(1.135);
        new BotonSencillo({ scene: this, x: 70, y: 60, texture: 'botonVolver', text: '', size: 0, callback: () => { removerEscuchas({ scene: this, idEscena: this.scene.key }), this.scene.start('MainMenu', { lenguaje: this.lenguaje, sonidos: this.sonidos }) }, scale: 0.75, callbackHover: () => { this.sonidos.HoverBoton.play() }, callbackOut: () => { this.sonidos.HoverBoton.pause() } });
        
        this.personajeDeIzquierda = new Personaje({
            scene: this,
            x:420,
            y: 230,
            vida: this.personajeIzquierda.vida,
            sprite: this.personajeIzquierda.sprite,
            poderes: this.personajeIzquierda.poderes,
            velocidad: this.personajeIzquierda.velocidad,
            defensa: this.personajeIzquierda.defensa,
            spriteSheet: this.personajeIzquierda.spriteSheet,
            estaVivo: this.personajeIzquierda.estaVivo,
            tipo: this.personajeIzquierda.tipo,
            id: this.personajeIzquierda.id,
            clase:this.personajeIzquierda.clase
        });

        this.personajeDeDerecha = new Personaje({
            scene: this,
            x: 850,
            y: 220,
            vida:  this.personajeDerecha.vida,
            sprite:  this.personajeDerecha.sprite,
            poderes:  this.personajeDerecha.poderes,
            velocidad:  this.personajeDerecha.velocidad,
            defensa:  this.personajeDerecha.defensa,
            spriteSheet: this.personajeDerecha.spriteSheet,
            estaVivo:  this.personajeDerecha.estaVivo,
            tipo:  this.personajeDerecha.tipo,
            id:  this.personajeDerecha.id,
            clase:this.personajeDerecha.clase 
        });
        


        for (let numberPower = 0; numberPower<=3; numberPower++){
            let namePower = (this.personajeDeDerecha.tipo + " poder"+ (numberPower.toString()));
            this.registry.events.on(namePower, ()=>{
                escuchaDeHabilidades(this.personajeDeDerecha.poderes[numberPower].tipo, numberPower, this.personajeDeDerecha, this.personajeDeIzquierda);
                console.log("el evento"+ namePower + "escucho");
            });
        }
        for (let numberPower = 0; numberPower<=3; numberPower++){
            let namePower = (this.personajeDeIzquierda.tipo +  " poder"+ (numberPower.toString()));
            this.registry.events.on(namePower, ()=>{
                escuchaDeHabilidades(this.personajeDeIzquierda.poderes[numberPower].tipo, numberPower, this.personajeDeIzquierda, this.personajeDeDerecha);
                console.log("el evento"+ namePower + "escucho");
            });
        }
        this.textGanador = this.add.text(this.cameras.main.centerX/1.5, this.cameras.main.centerY/2, '', {fontSize:'100px', color:'#bfb70a', fontFamily:'asian'});
        const objeto = {
            personajes: this.personajes,
            sonidos: this.sonidos,
        };
        this.scene.moveAbove('renderTest01', 'Ui');
        this.scene.launch('Ui', objeto);

        this.registry.events.on('victoria de combate', (ganador)=>{
            this.registry.events.emit('detener timer y todo los pads')
            this.textGanador.setText(`${getPhrase('GANA')} ${getPhrase(ganador).toUpperCase()}`);
            console.log('llego el ganador');
            let timeOutParaSiguienteCombate = setTimeout(()=>{
                this.registry.events.emit('siguiente combate', ganador)
                clearTimeout(timeOutParaSiguienteCombate)
            }, 5000);
        });

       this.registry.events.on('Evaluar vivos', (vida, tipo)=>{
        console.log('batalla puente valuar');
           console.log(tipo, vida);
           (vida < 1)?this.registry.events.emit('victoria de combate', tipo):null;
           console.log('Estoy en evaluar');
           this.registry.events.removeListener('Evaluar vivos');
        });

        this.registry.events.on('siguiente combate', (ganador)=>{

            let escenarioSuiguienteId;
            ganador === "Vikingo" ?[escenarioSuiguienteId = this.escenarioId - 1]:[escenarioSuiguienteId = this.escenarioId + 1];

            
            
            this.personajesActuales = [convertirClase(this.personajeDeIzquierda),convertirClase(this.personajeDeDerecha)];
            this.registry.events.emit('pruebaEnvio1', this.personajesActuales, escenarioSuiguienteId);
            
            for (let numberPower = 0; numberPower<=3; numberPower++){
                let namePower = (this.personajeDeDerecha.tipo + " poder"+ (numberPower.toString()));
                this.registry.events.removeListener(namePower);
            }
            for (let numberPower = 0; numberPower<=3; numberPower++){
                let namePower = (this.personajeDeIzquierda.tipo + " poder"+ (numberPower.toString()));
                this.registry.events.removeListener(namePower);
            }
            this.registry.events.removeListener('siguiente combate');
            this.registry.events.removeListener('victoria de combate');
            this.scene.stop('Ui');
            this.scene.stop('renderTest01');
            escenarioSuiguienteId === 6?[this.scene.start("VictoriaSamurai", {sonidos:this.sonidos, lenguaje:this.lenguaje})]:[escenarioSuiguienteId === 0?[this.scene.start("VictoriaVikingo", {sonidos:this.sonidos, lenguaje:this.lenguaje})]:[this.scene.start('SeleccionPersonaje', {sonidos:this.sonidos, lenguaje:this.lenguaje})]];
            // this.scene.start('SeleccionPersonaje', {sonidos:this.sonidos, lenguaje:this.lenguaje});
        });
    }
    update(){ }
}