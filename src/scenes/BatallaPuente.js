import Phaser from "phaser";
import { BotonSencillo} from "../js/button";
import { convertirClase, escuchaDeHabilidades, Personaje } from "../js/Personaje";
import { getPhrase } from "../services/translations";
import { sharedInstance } from "./EventCenter";

// import Poder from "../js/Poderes";

export default class BatallaPuente extends Phaser.Scene
{
    jugador1;
    jugador2;
    jugadores = [];
    

    
    constructor(){
        super('BatallaPuente')
    }

    init(data)
    {
        this.datos = data;
        this.personajes = data.personajes;
        this.sonidos = data.sonidos;
        this.languaje = data.language
        
        console.log(this.personajes)

        this.personajeIzquierda = this.personajes.find((personaje)=>{
            return personaje.tipo == 'Samurai'
        })
        this.personajeDerecha = this.personajes.find((personaje)=>{
            return personaje.tipo == 'Vikingo'
        })
    }  
    create() {
        this.sonidos.MainMenuSonido.pause()
        this.sonidos.CombateSong.play()
        this.crearMochilas = this.datos.crear;
        console.log("estas en puente")
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'escenarioPuente').setScale(1.135)
        new BotonSencillo({scene:this, x:70, y:60, texture:'botonVolver', text:'', size:0,  callback:() => this.scene.start('MainMenu'), scale:0.75})

        this.personajeDeIzquierda = new Personaje({
            scene: this,
            x: 450,
            y: 240,
            vida: this.personajeIzquierda.vida,
            sprite: this.personajeIzquierda.sprite,
            poderes: this.personajeIzquierda.poderes,
            velocidad: this.personajeIzquierda.velocidad,
            defensa: this.personajeIzquierda.defensa,
            spriteSheet: this.personajeIzquierda.spriteSheet,
            estaVivo: this.personajeIzquierda.estaVivo,
            tipo: this.personajeIzquierda.tipo,
            id: this.personajeIzquierda.id
        });
        this.personajeDeDerecha = new Personaje({
            scene: this,
            x: 750,
            y: 240,
            vida:  this.personajeDerecha.vida,
            sprite:  this.personajeDerecha.sprite,
            poderes:  this.personajeDerecha.poderes,
            velocidad:  this.personajeDerecha.velocidad,
            defensa:  this.personajeDerecha.defensa,
            spriteSheet: this.personajeDerecha.spriteSheet,
            estaVivo:  this.personajeDerecha.estaVivo,
            tipo:  this.personajeDerecha.tipo,
            id:  this.personajeDerecha.id
        })
        this.registry.events.on('Samurai poder1', ()=>{
            escuchaDeHabilidades(this.personajeDeIzquierda.poderes[0].tipo, 0, this.personajeDeIzquierda, this.personajeDeDerecha);
            console.log(this.personajeDeIzquierda.sprite);
            
        })
        this.registry.events.on('Samurai poder2', ()=>{
            escuchaDeHabilidades(this.personajeDeIzquierda.poderes[1].tipo, 1, this.personajeDeIzquierda, this.personajeDeDerecha);
            
        })
        this.registry.events.on('Samurai poder3', ()=>{
            escuchaDeHabilidades(this.personajeDeIzquierda.poderes[2].tipo, 2, this.personajeDeIzquierda, this.personajeDeDerecha);
            
        })
        this.registry.events.on('Samurai poder4', ()=>{
            escuchaDeHabilidades(this.personajeDeIzquierda.poderes[3].tipo, 3, this.personajeDeIzquierda, this.personajeDeDerecha);
            
        })
        /*Evento solo para usar el inventario Samurai
        Al realizar la funcion en el segundo parametro que se le pasa un numero, no vamos a pasar nada ya que, con "tipoDeHabilidad" le enviamos el tipo para que busque que funcion usar, 
        deberiamos enviarlo en el caso de que se complemente ell objeto junto otra habilidad del array poderes de cada personaje
        */
        sharedInstance.on('Samurai usar objeto', (tipoDeHabilidad, index = null)=>{
            //index=null ya que los objetos por ahora no se les envia el index del poder que modifican
            this.habilidad = tipoDeHabilidad
            escuchaDeHabilidades(tipoDeHabilidad, 0, this.personajeDeIzquierda, this.personajeDeDerecha);
            
        })

        this.registry.events.on('Vikingo poder1', ()=>{
            escuchaDeHabilidades(this.personajeDeDerecha.poderes[0].tipo, 0, this.personajeDeDerecha, this.personajeDeIzquierda);
            console.log(this.personajeDeDerecha.sprite);
            
        })
        this.registry.events.on('Vikingo poder2', ()=>{
            escuchaDeHabilidades(this.personajeDeDerecha.poderes[1].tipo, 1, this.personajeDeDerecha, this.personajeDeIzquierda);
            
        })
        this.registry.events.on('Vikingo poder3', ()=>{
            escuchaDeHabilidades(this.personajeDeDerecha.poderes[2].tipo, 2, this.personajeDeDerecha, this.personajeDeIzquierda);
            
        })
        this.registry.events.on('Vikingo poder4', ()=>{
            escuchaDeHabilidades(this.personajeDeDerecha.poderes[3].tipo, 3, this.personajeDeDerecha, this.personajeDeIzquierda);
            
        })
         //Evento solo para usar el inventario Vikingo
         sharedInstance.on('Vikingo usar objeto', (tipoDeHabilidad, index = null)=>{
            //index=null ya que los objetos por ahora no se les envia el index del poder que modifican
            this.habilidad = tipoDeHabilidad
            escuchaDeHabilidades(tipoDeHabilidad, 0, this.personajeDeDerecha, this.personajeDeIzquierda);
            
        });
        this.textGanador = this.add.text(this.cameras.main.centerX/1.5, this.cameras.main.centerY/2, '', {fontSize:100, color:'#686cd6', fontFamily:'asian'});

        const objeto = {
            personajes: this.personajes,
            crear:true,
            sonidos: this.sonidos,
        };
        this.scene.moveAbove('BatallaPuente', 'Ui');
        this.scene.launch('Ui', objeto);


        this.registry.events.on('victoria de combate', (ganador)=>{
            
            this.registry.events.emit('detener timer y todo los pads')
            this.textGanador.setText(`Gana ${ganador}`.toUpperCase());
            
            let timeOutParaSoltarBotin = setTimeout(()=>{
                this.textGanador.setText(``);
                this.registry.events.emit(`botin soltado` ,ganador);
                this.add.text(this.cameras.main.centerX/1.5, this.cameras.main.centerY+(this.cameras.main.centerY/5),'Tienes 10s para guardar tu objeto'.toUpperCase(), {fontSize:50, color:'#eb000e', fontFamily: 'asian'})
                clearTimeout(timeOutParaSoltarBotin)
            },3000);
            console.log('llego el ganador');
            
            let timeOutParaSiguienteCombate = setTimeout(()=>{
                this.registry.events.emit('siguiente combate', ganador)
                clearTimeout(timeOutParaSiguienteCombate)
            }, 6000);
        });
        
        /*
        LOGICA DE QUIEN ESTA VIVO Y MUERTO PARA VER QUIEN GANA
        */
       this.registry.events.on('Evaluar vivos', (vida, tipo)=>{
           console.log(tipo, vida);
           (vida <= 0)?this.registry.events.emit('victoria de combate', tipo):null;
        });
        //Evento que cambia de escena, vuelve a seleccionPersonaje para seguie en los otros combates
        this.registry.events.on('siguiente combate', (ganador)=>{
            console.log('llego al evento');
            //dependiendo quien sea el ganador se enviara el id de la siguiente escena/batalla
            this.queEscenaSigue = {
                Vikingo:2,
                Samurai:4,
            };
            console.log(this.queEscenaSigue[ganador]);
            //Se crea un array de objetos, que possen los datos de los personajes
            this.personajesActuales = [convertirClase(this.personajeDeIzquierda),convertirClase(this.personajeDeDerecha)];
            //Se envia un evento para actualizar la seleccionPersonaje(los personajes: vencedor, vencido) y el id de la siguiente escena
            this.registry.events.emit('pruebaEnvio1', this.personajesActuales, this.queEscenaSigue[ganador]);
            //Se paran las escenas necesarias
            this.scene.stop('Ui');
            this.scene.pause('Mochila');
            this.scene.stop('BatallaPuente');
            //Se inicia la seleccion
            this.scene.start('SeleccionPersonaje', {sonidos:this.sonidos});
            // (ganador === 'Samurai')?sharedInstance.emit('que samurai sigue', 'ESCOGE TU FICHA SAMURAI'):sharedInstance.emit('que vikingo sigue', 'ESCOGE TU FICHA VIKINGA');
            //Se remueven los eventos escucha
            this.registry.events.removeListener('Samurai poder1');
            this.registry.events.removeListener('Samurai poder2');
            this.registry.events.removeListener('Samurai poder3');
            this.registry.events.removeListener('Samurai poder4');
            this.registry.events.removeListener('Samurai usar objeto');
            
            this.registry.events.removeListener('Vikingo poder1');
            this.registry.events.removeListener('Vikingo poder2');
            this.registry.events.removeListener('Vikingo poder3');
            this.registry.events.removeListener('Vikingo poder4');
            this.registry.events.removeListener('Vikingo usar objeto');

            this.registry.events.removeListener('Evaluar vivos');
            this.registry.events.removeListener('siguiente combate');
        });


    }

    update()
    {
        // if(this.personajeDeIzquierda.estaVivo === false){
        //     this.registry.events.emit('botin soltado por samurai')

            // this.registry.events.on('victoria de combate', (ganador)=>{
            //     this.textGanador.setText(`Gana ${ganador}`)
            // });

            //GANO EL VIKINGO
            // let idSiguienteEscena = 2
            // this.personajeDeDerecha.setGano(true)
            // this.personajesActuales = [convertirClase(this.personajeDeIzquierda),convertirClase(this.personajeDeDerecha)]
            // this.registry.events.emit('pruebaEnvio1', this.personajesActuales, idSiguienteEscena)

            // this.scene.stop('Ui')
            // this.scene.stop('Mochila')
            // this.scene.stop('BatallaPuente')
            // // removerEscucha();
            // this.registry.events.removeListener('Samurai poder1')
            // this.registry.events.removeListener('Samurai poder2')
            // this.registry.events.removeListener('Samurai poder3')
            // this.registry.events.removeListener('Samurai poder4')
            
            // this.registry.events.removeListener('Vikingo poder1')
            // this.registry.events.removeListener('Vikingo poder2')
            // this.registry.events.removeListener('Vikingo poder3')
            // this.registry.events.removeListener('Vikingo poder4')
            // this.scene.start('SeleccionPersonaje')
        // }
        // if(this.personajeDeDerecha.estaVivo === false){

            // this.registry.events.emit('botin soltado por vikingo')
            
            //GANO EL SAMURAI
            // let idSiguienteEscena = 4
            // this.personajeDeIzquierda.setGano(true)
            // this.personajesActuales = [convertirClase(this.personajeDeIzquierda),convertirClase(this.personajeDeDerecha)]
            // this.registry.events.emit('pruebaEnvio1', this.personajesActuales, idSiguienteEscena)
            // this.scene.stop('Ui')
            // this.scene.stop('Mochila')
            // this.scene.stop('BatallaPuente')
            // // removerEscucha();
            // this.registry.events.removeListener('Samurai poder1')
            // this.registry.events.removeListener('Samurai poder2')
            // this.registry.events.removeListener('Samurai poder3')
            // this.registry.events.removeListener('Samurai poder4')
            
            // this.registry.events.removeListener('Vikingo poder1')
            // this.registry.events.removeListener('Vikingo poder2')
            // this.registry.events.removeListener('Vikingo poder3')
            // this.registry.events.removeListener('Vikingo poder4')   
            
            // this.scene.start('SeleccionPersonaje')
        // }
    }
}



