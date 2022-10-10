import Phaser from "phaser";



export default class Preloads extends Phaser.Scene
{
	constructor()
	{
		super('Preloads')
	}

    preload(){
        //MENUS
        this.load.image('menuInicio', 'assets/images/menuInicio.png')
        this.load.image('elegirFaccion', 'assets/images/elegirFaccion.png')
        this.load.image('creditos', 'assets/images/creditos.png')
        this.load.image('seleccionpersonajes', 'assets/images/seleccionpersonaje.png')
        this.load.image('pta', 'assets/images/SeleccionPjback.png')

        this.load.image('escenarioBosque', 'assets/images/escenarioBosque.png')
        this.load.image('escenarioPuente', 'assets/images/escenarioPuente.png');
        this.load.image('escenarioCiudad', 'assets/images/escenarioCiudad.png');

        //SPRITES
        this.load.image('personajePeonSamurai', 'assets/images/spPeonSamurai.png')
        this.load.image('personajePeonVikingo', 'assets/images/spPeonVikingo.png')
        this.load.image('personajeCaballoSamurai', 'assets/images/spCaballoSamurai.png')
        this.load.image('personajeCaballoVikingo', 'assets/images/spCaballoVikingo.png')
        this.load.image('personajeReinaSamurai', 'assets/images/spReinaSamurai.png')
        this.load.image('personajeReinaVikingo', 'assets/images/spReinaVikingo.png')
        ,

        // Interfaz
        this.load.image('botonMarco', 'assets/interfaz/botonMarco.png');
        this.load.image('botonVolver', 'assets/interfaz/botonVolver.png');
        this.load.image('botonOpciones', 'assets/interfaz/botonOpciones.png')
        this.load.image('botonListo', 'assets/interfaz/botonListo.png')
        this.load.image('interfaz', 'assets/interfaz/interfaz.png')
        this.load.image('botonAtaque', 'assets/interfaz/botonAtaque.png')


    }

    create(){
        this.scene.start('SeleccionPersonaje');

    } 


}