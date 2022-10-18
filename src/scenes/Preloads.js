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

        this.load.image('block', 'assets/interfaz/cursor.png')



        // SPRITESHEET
        //this.load.spritesheet('botonesAtaque', 'assets/interfaz/botonesDeAtaques.png', { frameWidth: 420, frameHeight: 430 });
        this.load.spritesheet('botonesAtaque', 'assets/interfaz/botonesDeHabilidades.png', { frameWidth: 100, frameHeight: 100});
        this.load.spritesheet('botonesAtaque2', 'assets/interfaz/botonesDeHabilidades2.png', { frameWidth: 100, frameHeight: 100});

        this.load.spritesheet('botonesAtaquePeon', 'assets/interfaz/botonesDeHabilidadesPeon.png', { frameWidth: 100, frameHeight: 100});
        this.load.spritesheet('botonesAtaqueCaballo', 'assets/interfaz/botonesDeHabilidadesCaballo.png', { frameWidth: 100, frameHeight: 100});
        this.load.spritesheet('botonesAtaqueReyna', 'assets/interfaz/botonesDeHabilidadesReyna.png', { frameWidth: 100, frameHeight: 100});




        this.load.spritesheet('personajePeonVikingo', 'assets/spriteSheet/peonVikingoSheet.png', { frameWidth: 164, frameHeight: 140}); 

        this.load.spritesheet('personajePeonSamurai', 'assets/spriteSheet/peonSamuraiSheet.png', { frameWidth: 147, frameHeight: 140}); 

        this.load.spritesheet('personajeCaballoSamurai', 'assets/spriteSheet/caballoSamuraiSheet.png', { frameWidth: 140, frameHeight: 140}); 

        this.load.spritesheet('personajeCaballoVikingo', 'assets/spriteSheet/caballoVikingoSheet.png', { frameWidth: 226, frameHeight: 140}); 

        this.load.spritesheet('personajeReynaSamurai', 'assets/spriteSheet/reynaSamuraiSheet.png', { frameWidth: 178, frameHeight: 140}); 

        this.load.spritesheet('personajeReynaVikingo', 'assets/spriteSheet/reynaVikingoSheet.png', { frameWidth: 183, frameHeight: 140});
    }

    create(){
        this.anims.create({
            key: 'ataqueRapidoPeonSamurai',
            frames: this.anims.generateFrameNames('personajePeonSamurai',{frames:[0,1,2,3, 4, 5, 6, 7, 0]}),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'ataqueRapidoPeonVikingo',
            frames: this.anims.generateFrameNumbers('personajePeonVikingo', { frames:[0,1,2,3, 4, 5,0] }),
            frameRate: 8,
            repeat: 0
        });
        this.anims.create({
            key: 'reynaSamuraiAtaque',
            frames: this.anims.generateFrameNumbers('personajeReynaSamurai', { frames:[0,1,2,3, 4, 5, 6, 0] }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'reynaVikingoAtaque',
            frames: this.anims.generateFrameNumbers('personajeReynaVikingo', { frames:[0,1,2,3, 4, 0] }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'caballoVikingoAtaque',
            frames: this.anims.generateFrameNumbers('personajeCaballoVikingo', { frames:[0,1,2,3, 4, 5, 0] }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'caballoSamuraiAtaque',
            frames: this.anims.generateFrameNumbers('personajeCaballoSamurai', { frames:[0,1,2,3, 4, 5, 6, 0] }),
            frameRate: 10,
            repeat: 0
        });

        this.load.spritesheet({
            key: 'botonAtaque',
            url: 'assets/interfaz/botonesDeAtaques.png',
            frameConfig: {
                frameWidth: 420,
                frameHeight: 430,
                startFrame: 0,
                endFrame: 9
            }
        });
        this.scene.start('SeleccionPersonaje');

    } 


}