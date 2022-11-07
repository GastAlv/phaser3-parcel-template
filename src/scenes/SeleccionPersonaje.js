
import Phaser from "phaser";
import { BotonSencillo, Button } from "../js/button";
import { CrearPersonaje } from "../js/Personaje";
import { getPhrase } from "../services/translations";
import { sharedInstance } from "./EventCenter";
// import { convertirClase } from "../js/Personaje";
// import { sharedInstance } from "./EventCenter";
// import { peonVikingo } from "../js/Personaje";

export default class SeleccionPersonaje extends Phaser.Scene
{
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
    #vikingoTorre 
    per1;
    per2;
    peleadores = [];
    personajesActuales = [];
    listMuertos = [];
    muertosVikingos =[];
    muertosSamurais = [];
    primerEscena = true;
    nuevoMuerto;

    texto = '';
    

    zoomSeleccionVikingo;
    zoomSeleccionSamurai;
    actualizarPersonajes = false;
    quienPerdio;
    
    // muerto = 0;

    constructor(){
        super('SeleccionPersonaje')
    }
    init(data){
        this.sonidos = data.sonidos
        this.registry.events.on('resetear listas para jugar de nuevo', ()=>{
            this.peleadores = [];
            this.personajesActuales = [];
            this.listMuertos = [];
            this.muertosVikingos =[];
            this.muertosSamurais = [];
            this.nuevoMuerto = undefined;
            this.primerEscena = true;
            this.actualizarPersonajes = false;
            this.siguienteEscena = null;
            console.log('se reseteo todo', this.siguienteEscena,);
        });
        this.actualizacionPersonajes = data.personaje
        
        this.registry.events.on('pruebaEnvio1', (personajes, idSiguienteEscena)=> {
            this.primerEscena = false;
            this.actualizarPersonajes = true
            this.cambiarEscena = true
            this.siguienteEscena = idSiguienteEscena
            // lista para filtrar al personaje muerto
            this.nuevoMuerto = personajes.find((personaje)=>{
                return personaje.estaVivo === false
            });
            // lista para filtrar al personaje vivo
            
            // aca se esta pasando desde el arraycompleto el personaje pero con la vida al 100% 
            // this.idVivo = personajes.filter((personaje)=>{return personaje.estaVivo === true})
            // this.peleadores = this.arrayCompleto.filter((personaje)=>{return personaje.id === this.idVivo[0].id});
            this.peleadores = personajes.filter((personaje)=>{
                return personaje.estaVivo === true
            })
            // console.log(this.peleadores[0].tipo)
            this.pushearMuertos = true;
            (this.nuevoMuerto.tipo === 'Samurai')?[this.quienPerdio = `ELIGE TU FICHA SAMURAI`]:[this.quienPerdio = 'ELIGE TU FICHA VIKINGO'];
        });
        //evaluaciones para el ultimo con vida
        (this.pushearMuertos === true)?[(this.nuevoMuerto.tipo === 'Samurai')?this.muertosSamurais.push(this.nuevoMuerto):this.muertosVikingos.push(this.nuevoMuerto), this.pushearMuertos = false]:null;
        (this.muertosVikingos.length === 5)?this.scene.start('VictoriaSamurai'):null;
        (this.muertosSamurais.length === 5)?this.scene.start('VictoriaVikingo'):null;
        (this.nuevoMuerto != undefined)?this.listMuertos.push(this.nuevoMuerto):null;

        //Se envia a dormir a la escena 'Mochila' para no mostrarla en la SeleccionPersonaje, asi despues se va al combate y se mantienen los objetos
        // this.scene.sleep('Mochila')
        
    }

    create() {
        
        this.cameras.main.fadeIn(1000);
        let style = {
            fontSize: '30px',
            fontFamily: 'asian',
            color: '#000',
            // align: 'center',
            // backgroundColor: '#4f7abb',
            // padding: {
            //     y: 10,
            //     x: 5
            // },
            border: 5 ,
            // shadow: {
            //     color: '#000000',
            //     fill: true,
            //     offsetX: 2,
            //     offsetY: 2,
            //     blur: 8
            // }
        }

        console.log("ESTAS EN SELECCION")
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'pta').setScale(1.13)

        new BotonSencillo({scene:this, x:70, y:60, texture:'botonVolver', text:'', size:0,  callback:() => this.scene.start('MainMenu'), scale:0.75, callbackHover:()=>{}, callbackOut:()=>{}})
        
        this.#vikingoPeon = CrearPersonaje('Vikingo','Peon');
        this.#vikingoCaballo = CrearPersonaje('Vikingo','Caballo');
        this.#vikingoReina = CrearPersonaje('Vikingo','Reyna');
        this.#vikingoAlfil = CrearPersonaje('Vikingo','Alfil');
        this.#vikingoTorre = CrearPersonaje('Vikingo','Torre');
        
        this.#samuraiPeon = CrearPersonaje('Samurai', 'Peon');
        this.#samuraiCaballo = CrearPersonaje('Samurai', 'Caballo');
        this.#samuraiReina = CrearPersonaje('Samurai', 'Reyna');
        this.#samuraiAlfil = CrearPersonaje('Samurai', 'Alfil');
        this.#samuraiTorre = CrearPersonaje('Samurai', 'Torre');
        
        
        this.zoomSeleccionSamurai = this.add.image(480, 200, this.spriteI)
        this.infoSeleccionSamurai = this.add.text(80, 300, '',style);
        
        this.zoomSeleccionVikingo = this.add.image(800, 200, this.spriteD)
        this.infoSeleccionVikingo = this.add.text(800, 300, '', style);

        
        sharedInstance.on('zoom seleccion izquierda', (sprite, texto)=>{
            this.spriteI = (sprite + 'Zoom')
            this.infoSeleccionSamurai.setText(texto)
        });
        sharedInstance.on('zoom seleccion derecha', (sprite, texto)=>{
            this.spriteD = (sprite + 'Zoom')
            this.infoSeleccionVikingo.setText(texto)
        });
        this.botonPeonVikingo = new Button(this, 731, 542, 'seleccionPeonVikingo', "", 0, () => {this.peleadores.push(this.#vikingoPeon), this.botonListo1 = true}, 1, this.#vikingoPeon, 'zoom seleccion derecha')
        this.botonCaballoVikingo = new Button(this, 840, 542, 'seleccionCaballoVikingo', '', 0, () => {this.peleadores.push(this.#vikingoCaballo),  this.botonListo1 = true}, 1, this.#vikingoCaballo, 'zoom seleccion derecha')
        this.botonReinaVikingo = new Button(this, 975, 542, 'seleccionReinaVikingo', '', 0, () => {this.peleadores.push(this.#vikingoReina), this.botonListo1 = true}, 1, this.#vikingoReina, 'zoom seleccion derecha')
        this.botonAlfilVikingo = new Button(this, 1110, 542, 'seleccionAlfilVikingo', '', 0, () => {this.peleadores.push(this.#vikingoAlfil), this.botonListo1 = true}, 1, this.#vikingoAlfil, 'zoom seleccion derecha')
        this.botonTorreVikingo = new Button(this, 1245, 542, 'seleccionTorreVikingo', '', 0, () => {this.peleadores.push(this.#vikingoTorre), this.botonListo1 = true}, 1, this.#vikingoTorre, 'zoom seleccion derecha')
        
        this.botonPeonSamurai = new Button(this, 540, 542, 'seleccionPeonSamurai', "", 0, () => {this.peleadores.push(this.#samuraiPeon),  this.botonListo2 = true}, 1, this.#samuraiPeon, 'zoom seleccion izquierda')
        this.botonCaballoSamurai = new Button(this, 440, 542, 'seleccionCaballoSamurai', '', 0, () => {this.peleadores.push(this.#samuraiCaballo),  this.botonListo2 = true}, 1, this.#samuraiCaballo, 'zoom seleccion izquierda')
        this.botonReinaSamurai = new Button(this, 300, 542, 'seleccionReinaSamurai', '', 0, () => {this.peleadores.push(this.#samuraiReina), this.botonListo2 = true}, 1, this.#samuraiReina, 'zoom seleccion izquierda')
        this.botonAlfilSamurai = new Button(this, 165, 542, 'seleccionAlfilSamurai', '', 0, () => {this.peleadores.push(this.#samuraiAlfil), this.botonListo2 = true}, 1, this.#samuraiAlfil, 'zoom seleccion izquierda')
        this.botonTorreSamurai = new Button(this, 30, 542, 'seleccionTorreSamurai', '', 0, () => {this.peleadores.push(this.#samuraiTorre), this.botonListo2 = true}, 1, this.#samuraiTorre, 'zoom seleccion izquierda')

        //Feedback para saber quien eligue el siguientepeleador que murio en el anterior combate
        this.add.text(this.cameras.main.centerX, 100, this.quienPerdio, style).setStyle({fontSize: '40px', fontDamily: 'asian'}).setOrigin(.5)
        //ELIGE TU HEROE
        this.add.text(this.cameras.main.centerX, 10, getPhrase('ELIGE TU HEROE'), style).setStyle({fontSize: '60px', fontDamily: 'asian'}).setOrigin(.5)

        this.registry.events.on('manejador de combates', ()=>{
            this.botonListo1 = false
            this.botonListo2 = false
            const objeto = {
                personajes: this.peleadores,
                crear:true,
                sonidos:this.sonidos,
            };
            (this.primerEscena === true)?[this.primerEscena = false, this.scene.stop('SeleccionPersonaje'), this.scene.start('BatallaPuente', objeto)]:null;
 
            switch(this.siguienteEscena){
                case 1 : [this.scene.stop('SeleccionPersonaje'), this.scene.start('BatallaCastillo', objeto)]
                break
                case 2 : [this.scene.stop('SeleccionPersonaje'), this.scene.start("BatallaCiudad", objeto)]
                break
                case 3 : [this.scene.stop('SeleccionPersonaje'), this.scene.start("BatallaPuente", objeto)]
                break
                case 4 : [this.scene.stop('SeleccionPersonaje'), this.scene.start("BatallaBosque", objeto), console.log('¡Problema de ejecucuin!'), this.siguienteEscena = 0]
                break
                case 5 : [this.scene.stop('SeleccionPersonaje'), this.scene.start('BatallaCosta', objeto)]
                break
            }
            // const listaDeEscenas = {
            //     1: [this.scene.stop('SeleccionPersonaje'), this.scene.start('BatallaCastillo', objeto)],
            //     2: [this.scene.stop('SeleccionPersonaje'), this.scene.start("BatallaCiudad", objeto)],
            //     3: [this.scene.stop('SeleccionPersonaje'), this.scene.start("BatallaPuente", objeto)],
            //     4: [this.scene.start("BatallaBosque", objeto), console.log('¡Problema de ejecucuin!')],
            //     5: [this.scene.stop('SeleccionPersonaje'), this.scene.start('BatallaCosta', objeto)],
            // }
            // listaDeEscenas[this.siguienteEscena]
            
        });
        this.registry.events.on('actualizar Botones Y Personajes', ()=>{
            const indice = {
                1 : this.botonPeonVikingo,
                2 : this.botonCaballoVikingo,
                3 : this.botonReinaVikingo,
                4 : this.botonAlfilVikingo,
                5 : this.botonTorreVikingo,
                11 : this.botonPeonSamurai,
                22 : this.botonCaballoSamurai,
                33 : this.botonReinaSamurai,
                44 : this.botonAlfilSamurai,
                55 : this.botonTorreSamurai,
            }
            for (let jugadorMuerto of this.listMuertos) {
                let boton = indice[jugadorMuerto.id]
                boton.desactivarEntrada({cartelParaMostrarDesactivado:'MUERTO'})
                if(jugadorMuerto.tipo === 'Vikingo'){
                    this.botonListo1 = false;
                    this.botonListo2 = true;
                    
                    this.BLOQUEARBOTONES({tipo:jugadorMuerto.tipo, textura: indice[this.peleadores[0].id].texture});
                }else if (jugadorMuerto.tipo === 'Samurai'){
                    this.botonListo1 = true;
                    this.botonListo2 = false;
                    this.BLOQUEARBOTONES({tipo:jugadorMuerto.tipo, textura: indice[this.peleadores[0].id].texture})
                }
            }
        });
    }
    update(){
        this.zoomSeleccionVikingo.setTexture(this.spriteD)
        this.zoomSeleccionSamurai.setTexture(this.spriteI)
        this.revisarListos()
        this.actualizarBotonesYPersonajes()
        // if(this.botonListo1 && this.botonListo2 === true)
        // {
        //     this.botonListo1 = false
        //     this.botonListo2 = false
        //     this.actualizacionPersonajes === false
        //     const objeto = {
        //         personajes: this.peleadores,
        //         crear:true,
        //         sonidos:this.sonidos,
        //     };
        //     (this.primerEscena === true)?[this.primerEscena = false, this.scene.stop('SeleccionPersonaje'), this.scene.start('BatallaPuente', objeto)]:null;
 
        //     switch(this.siguienteEscena){
        //         case 1 : [this.scene.stop('SeleccionPersonaje'), this.scene.start('BatallaCastillo', objeto)]
        //         break
        //         case 2 : [this.scene.stop('SeleccionPersonaje'), this.scene.start("BatallaCiudad", objeto)]
        //         break
        //         case 3 : [this.scene.stop('SeleccionPersonaje'), this.scene.start("BatallaPuente", objeto)]
        //         break
        //         case 4 : [this.scene.stop('SeleccionPersonaje'), this.scene.start("BatallaBosque", objeto)]
        //         break
        //         case 5 : [this.scene.stop('SeleccionPersonaje'), this.scene.start('BatallaCosta', objeto)]
        //         break
        //     }
        // }
        // if(this.actualizarPersonajes === true){
        //     const indice = {
        //         1 : this.botonPeonVikingo,
        //         2 : this.botonCaballoVikingo,
        //         3 : this.botonReinaVikingo,
        //         4 : this.botonAlfilVikingo,
        //         5 : this.botonTorreVikingo,
        //         11 : this.botonPeonSamurai,
        //         22 : this.botonCaballoSamurai,
        //         33 : this.botonReinaSamurai,
        //         44 : this.botonAlfilSamurai,
        //         55 : this.botonTorreSamurai,
        //     }
        //     for (let jugadorMuerto of this.listMuertos) {
        //         let boton = indice[jugadorMuerto.id]
        //         boton.desactivarEntrada({cartelParaMostrarDesactivado:'MUERTO'})
        //         if(jugadorMuerto.tipo === 'Vikingo'){
        //             this.botonListo1 = false;
        //             this.botonListo2 = true;
                    
        //             this.BLOQUEARBOTONES({tipo:jugadorMuerto.tipo, textura: indice[this.peleadores[0].id].texture});
        //         }else if (jugadorMuerto.tipo === 'Samurai'){
        //             this.botonListo1 = true;
        //             this.botonListo2 = false;
        //             this.BLOQUEARBOTONES({tipo:jugadorMuerto.tipo, textura: indice[this.peleadores[0].id].texture})
        //         }
        //     }
        // }
    }
    revisarListos(){
        (this.botonListo1 && this.botonListo2 === true)?[this.registry.events.emit('manejador de combates')]:null;
    }
    actualizarBotonesYPersonajes(){
        (this.actualizarPersonajes === true)?[this.actualizarPersonajes = false, this.registry.events.emit('actualizar Botones Y Personajes')]:null;
    }
    BLOQUEARBOTONES({tipo:tipo, textura:textura}){
        let texto = `${this.peleadores[0].clase} ${getPhrase(this.peleadores[0].tipo)} ❤️ ${getPhrase('VIDA')} ${this.peleadores[0].vida} ⚡ ${getPhrase('VELOCIDAD')} ${this.peleadores[0].vida}`;
        (tipo=== 'Samurai')?[
            this.botonPeonVikingo.desactivarEntrada({cartelParaMostrarDesactivado:''}),
            this.botonCaballoVikingo.desactivarEntrada({cartelParaMostrarDesactivado:''}),
            this.botonReinaVikingo.desactivarEntrada({cartelParaMostrarDesactivado:''}),
            this.botonAlfilVikingo.desactivarEntrada({cartelParaMostrarDesactivado:''}),
            this.botonTorreVikingo.desactivarEntrada({cartelParaMostrarDesactivado:''}),
            sharedInstance.emit('zoom seleccion derecha',textura, texto.toUpperCase())
        ]:[
            this.botonPeonSamurai.desactivarEntrada({cartelParaMostrarDesactivado:''}),
            this.botonCaballoSamurai.desactivarEntrada({cartelParaMostrarDesactivado:''}),
            this.botonReinaSamurai.desactivarEntrada({cartelParaMostrarDesactivado:''}),
            this.botonAlfilSamurai.desactivarEntrada({cartelParaMostrarDesactivado:''}),
            this.botonTorreSamurai.desactivarEntrada({cartelParaMostrarDesactivado:''}),
            sharedInstance.emit('zoom seleccion izquierda',textura, texto.toUpperCase())
        ];
    }
}

