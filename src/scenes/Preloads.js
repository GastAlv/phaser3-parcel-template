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
        this.load.image('seleccionPeonSamurai', 'assets/images/spPeonSamurai.png')
        this.load.image('seleccionPeonVikingo', 'assets/images/spPeonVikingo.png')
        this.load.image('seleccionCaballoSamurai', 'assets/images/spCaballoSamurai.png')
        this.load.image('seleccionCaballoVikingo', 'assets/images/spCaballoVikingo.png')
        this.load.image('seleccionReinaSamurai', 'assets/images/spReinaSamurai.png')
        this.load.image('seleccionReinaVikingo', 'assets/images/spReinaVikingo.png')

        // Interfaz
        this.load.image('botonMarco', 'assets/interfaz/botonMarco.png');
        this.load.image('botonVolver', 'assets/interfaz/botonVolver.png');
        this.load.image('botonOpciones', 'assets/interfaz/botonOpciones.png')
        this.load.image('botonListo', 'assets/interfaz/botonListo.png')
        this.load.image('interfaz', 'assets/interfaz/interfaz.png')
        this.load.image('botonAtaque', 'assets/interfaz/botonAtaque.png')


        // SPRITESHEET
        //this.load.spritesheet('botonesAtaque', 'assets/interfaz/botonesDeAtaques.png', { frameWidth: 420, frameHeight: 430 });
        this.load.spritesheet('botonesAtaque', 'assets/interfaz/botonesDeHabilidades.png', { frameWidth: 100, frameHeight: 100});
        this.load.spritesheet('botonesAtaque2', 'assets/interfaz/botonesDeHabilidades2.png', { frameWidth: 100, frameHeight: 100});
        this.load.spritesheet('botonesAtaquePeon', 'assets/interfaz/botonesDeHabilidadesPeon.png', { frameWidth: 100, frameHeight: 100});

        this.load.spritesheet('personajePeonVikingo', 'assets/spriteSheet/peonVikingoSheet.png', { frameWidth: 333, frameHeight: 195}); 

        this.load.spritesheet('personajePeonSamurai', 'assets/spriteSheet/peonSamuraiSheet.png', { frameWidth: 277, frameHeight: 195}); 

        this.load.spritesheet('personajeCaballoSamurai', 'assets/spriteSheet/caballoSamuraiSheet.png', { frameWidth: 318, frameHeight: 317}); 

        this.load.spritesheet('personajeCaballoVikingo', 'assets/spriteSheet/caballoVikingoSheet.png', { frameWidth: 235, frameHeight: 132}); 

        this.load.spritesheet('personajeReynaSamurai', 'assets/spriteSheet/reynaSamuraiSheet.png', { frameWidth: 286, frameHeight: 177}); 

        this.load.spritesheet('personajeReynaVikingo', 'assets/spriteSheet/reynaVikingoSheet.png', { frameWidth: 1280, frameHeight: 720});
        
        this.anims.create({
            key: 'peonSamuraiAtaque',
            frames: this.anims.generateFrameNumbers('personajePeonSamurai', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: 1
        });
        // this.anims.create({
        //     key: 'peonVikingoAtaque',
        //     frames: this.anims.generateFrameNumbers('personajePeonVikingo', { start: 0, end: 5 }),
        //     frameRate: 10,
        //     repeat: 1
        // });
        this.anims.create({
            key: 'reynaSamuraiAtaque',
            frames: this.anims.generateFrameNumbers('personajeReynaSamurai', { start: 0, end: 6 }),
            frameRate: 10,
            repeat: 1
        });
        this.anims.create({
            key: 'reynaVikingoAtaque',
            frames: this.anims.generateFrameNumbers('personajeReynaVikingo', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: 1
        });
        this.anims.create({
            key: 'caballoVikingoAtaque',
            frames: this.anims.generateFrameNumbers('personajeCaballoVikingo', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: 1
        });
        this.anims.create({
            key: 'caballoSamuraiAtaque',
            frames: this.anims.generateFrameNumbers('personajeCaballoSamurai', { start: 0, end: 6 }),
            frameRate: 10,
            repeat: 1
        });

        // this.load.spritesheet({
        //     key: 'botonAtaque',
        //     url: 'assets/interfaz/botonesDeAtaques.png',
        //     frameConfig: {
        //         frameWidth: 420,
        //         frameHeight: 430,
        //         startFrame: 0,
        //         endFrame: 9
        //     }
        // });


    }

    create(){
        this.scene.start('SeleccionPersonaje');

    } 


}