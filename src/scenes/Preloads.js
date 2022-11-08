import Phaser from "phaser";
import { getLanguageConfig, getTranslations } from "../services/translations";
import { loadFont } from "../js/button";

import { ManejadorDeSonidos } from "../js/ManejadorDeSonidos";


export default class Preloads extends Phaser.Scene
{
    #language;
    
	constructor()
	{
		super('Preloads')
	}

    preload(){
        this.load.image('barco', 'assets/interfaz/barcoPrecarga.png')
        
        // var progress = this.add.graphics();
        // this.load.on('progress', (value)=>{
            // progress.clear();
            // progress.fillStyle(0xffffff, 1);
            // progress.fillRect(0, 270, 800 * value, 60);
            // barquito.setPosition(400*value, this.cameras.main.centerY)
            // barquito.setX(value)
        // });
        
        // this.load.on('complete', function () {
            // progress.destroy();
            // barquito.destroy();
        // });
        loadFont("asian", "assets/fuentes/OPTIAsian.otf");
        this.#language = getLanguageConfig();
        console.log(this.#language);
        
        //MENUS
        this.load.image('menuInicio', 'assets/images/menuInicio.png')
        this.load.image('elegirFaccion', 'assets/images/elegirFaccion.png')
        this.load.image('creditos', 'assets/images/creditos.png')
        this.load.image('seleccionpersonajes', 'assets/images/seleccionpersonaje.png')
        this.load.image('pta', 'assets/images/seleccionPersonaje.png')
        this.load.image('victoriaVikingo', 'assets/images/victoriaVikingo.png')
        this.load.image('victoriaSamurai', 'assets/images/victoriaSamurai.png')

        this.load.image('escenarioBosque', 'assets/images/escenarioBosque.png')
        this.load.image('escenarioPuente', 'assets/images/escenarioPuente.png');
        this.load.image('escenarioCiudad', 'assets/images/escenarioCiudad.png');
        this.load.image('escenarioCosta', 'assets/images/escenarioCosta.png');
        this.load.image('escenarioCastillo', 'assets/images/escenarioCastillo.png');
        this.load.image('escenarioAyuda', 'assets/images/escenarioAyuda.png');

        //SPRITES SELECCION
        this.load.image('seleccionPeonSamurai', 'assets/images/spPeonSamurai.png')
        this.load.image('seleccionPeonVikingo', 'assets/images/spPeonVikingo.png')
        this.load.image('seleccionReinaVikingo', 'assets/images/spReinaVikingo.png')
        this.load.image('seleccionAlfilVikingo', 'assets/images/spAlfilVikingo.png')
        this.load.image('seleccionTorreVikingo', 'assets/images/spTorreVikingo.png')

        this.load.image('seleccionCaballoSamurai', 'assets/images/spCaballoSamurai.png')
        this.load.image('seleccionCaballoVikingo', 'assets/images/spCaballoVikingo.png')
        this.load.image('seleccionReinaSamurai', 'assets/images/spReinaSamurai.png')
        this.load.image('seleccionAlfilSamurai', 'assets/images/spAlfilSamurai.png')
        this.load.image('seleccionTorreSamurai', 'assets/images/spTorreSamurai.png')

        this.load.image('seleccionPeonSamuraiZoom', 'assets/interfaz/spzoomPeonSamurai.png')
        this.load.image('seleccionPeonVikingoZoom', 'assets/interfaz/spzoomPeonVikingo.png')
        this.load.image('seleccionCaballoSamuraiZoom', 'assets/interfaz/spzoomCaballoSamurai.png')
        this.load.image('seleccionCaballoVikingoZoom', 'assets/interfaz/spzoomCaballoVikingo.png')
        this.load.image('seleccionReinaSamuraiZoom', 'assets/interfaz/spzoomReinaSamurai.png')
        this.load.image('seleccionReinaVikingoZoom', 'assets/interfaz/spzoomReinaVikingo.png')
        this.load.image('seleccionAlfilSamuraiZoom', 'assets/interfaz/spzoomAlfilSamurai.png')
        this.load.image('seleccionAlfilVikingoZoom', 'assets/interfaz/spzoomAlfilVikingo.png')
        this.load.image('seleccionTorreSamuraiZoom', 'assets/interfaz/spzoomTorreSamurai.png')
        this.load.image('seleccionTorreVikingoZoom', 'assets/interfaz/spzoomTorreVikingo.png')
        

        // Interfaz
        this.load.image('alemanDE', 'assets/interfaz/deDEIcono.png');
        this.load.image('españolAR', 'assets/interfaz/esARIcono.png');
        this.load.image('inglesUK', 'assets/interfaz/enUKIcono.png');
        this.load.image('portuguezPR', 'assets/interfaz/ptPRIcono.png');
        
        this.load.image('botonMarco', 'assets/interfaz/botonMarco.png');
        this.load.image('botonVolver', 'assets/interfaz/botonVolver.png');
        this.load.image('botonOpciones', 'assets/interfaz/botonOpciones.png')
        this.load.image('botonListo', 'assets/interfaz/botonListo.png')
        this.load.image('interfaz', 'assets/interfaz/interfaz.png')
        this.load.image('botonAtaque', 'assets/interfaz/botonAtaque.png')
        
        this.load.image('teclaIcono', 'assets/interfaz/teclaIcono.png');
        this.load.image('ratonIcono', 'assets/interfaz/ratonIcono.png');
        this.load.image('samuraiIcono', 'assets/interfaz/samuraiIcono.png');
        this.load.image('vikingoIcono', 'assets/interfaz/vikingoIcono.png');

        this.load.image('FondoVida', 'assets/interfaz/fondoVida.png');

        this.load.image('mochilaAbierta', 'assets/interfaz/mochilaAbierta.png')
        this.load.image('mochilaCerrada', 'assets/interfaz/mochilaCerrada.png')
        
        this.load.image('crus', 'assets/interfaz/crus.png')
        this.load.image('empty', 'assets/interfaz/empty.png')
        this.load.spritesheet('lootUno', 'assets/interfaz/lootUno.png', { frameWidth: 40, frameHeight: 40});

        this.load.image('marcoSelector', 'assets/interfaz/marcoSeleccionSamurai.png')
        
        this.load.image('subirVolumen', 'assets/interfaz/subirVolumen.png')
        this.load.image('bajarVolumen', 'assets/interfaz/bajarVolumen.png')

        //SPRITESHEETS

        this.load.spritesheet(`botonesAtaquePeon`, 'assets/interfaz/newBotonPeon.png', { frameWidth: 120, frameHeight: 120});
        this.load.spritesheet(`botonesAtaqueCaballo`, 'assets/interfaz/newBotonCaballo.png', { frameWidth: 120, frameHeight: 120});
        this.load.spritesheet(`botonesAtaqueReyna`, 'assets/interfaz/newBotonReyna.png', { frameWidth: 120, frameHeight: 120});
        this.load.spritesheet(`botonesAtaqueAlfil`, 'assets/interfaz/newBotonAlfil.png', { frameWidth: 120, frameHeight: 120});
        this.load.spritesheet(`botonesAtaqueTorre`, 'assets/interfaz/newBotonTorre.png', { frameWidth: 120, frameHeight: 120});

        this.load.spritesheet(`personajePeonSamurai`, 'assets/spriteSheet/peonSamuraiSheet.png', { frameWidth: 147, frameHeight: 140});
        this.load.spritesheet(`personajeCaballoSamurai`, 'assets/spriteSheet/caballoSamuraiSheet.png', { frameWidth: 140, frameHeight: 140});
        this.load.spritesheet(`personajeReynaSamurai`, 'assets/spriteSheet/reynaSamuraiSheet.png', { frameWidth: 178, frameHeight: 140});
        this.load.spritesheet(`personajeAlfilSamurai`, 'assets/spriteSheet/alfilSamuraiSheet.png', { frameWidth: 92, frameHeight: 140});
        this.load.spritesheet(`personajeTorreSamurai`, 'assets/spriteSheet/torreSamuraiSheet.png', { frameWidth: 93, frameHeight: 140});

        this.load.spritesheet(`personajePeonVikingo`, 'assets/spriteSheet/peonVikingoSheet.png', { frameWidth: 164, frameHeight: 140});
        this.load.spritesheet(`personajeCaballoVikingo`, 'assets/spriteSheet/caballoVikingoSheet.png', { frameWidth: 226, frameHeight: 140});
        this.load.spritesheet(`personajeReynaVikingo`, 'assets/spriteSheet/reynaVikingoSheet.png', { frameWidth: 183, frameHeight: 140});
        this.load.spritesheet(`personajeAlfilVikingo`, 'assets/spriteSheet/alfilVikingoSheet.png', { frameWidth: 140, frameHeight: 300});
        this.load.spritesheet(`personajeTorreVikingo`, 'assets/spriteSheet/torreVikingoSheet.png', { frameWidth: 140, frameHeight: 300});


        //AUDIO
        
        this.load.audio('MainMenuSong', 'assets/sonidos/mainMenuSong.ogg');
        this.load.audio('CombateSong', 'assets/sonidos/combatSong.ogg');
        this.load.audio('GuardarObjetos', 'assets/sonidos/guardarObjeto.mp3');
        this.load.audio('HoverBoton', 'assets/sonidos/hoverBoton.mp3');
        this.load.audio('Damage', 'assets/sonidos/damage.mp3');
        this.load.audio('DropObject', 'assets/sonidos/dropObject.mp3');
        this.load.audio('AbrirInventario', 'assets/sonidos/abrirInventario.mp3');
        this.load.audio('UsarInventarioConObjeto', 'assets/sonidos/usarInventarioConObjeto.mp3');
        this.load.audio('UsarInventarioSinObjeto', 'assets/sonidos/usarInventarioSinObjeto.mp3');
        this.load.audio('DoparHabilidad', 'assets/sonidos/doparHabilidad.mp3');
        this.load.audio('RobarVida', 'assets/sonidos/robarVida.mp3');
        this.load.audio('Defensa', 'assets/sonidos/defensa.mp3');
        this.load.audio('AtaqueCargadoCargando', 'assets/sonidos/ataqueCargadoCargando.mp3');
        this.load.audio('AtaqueCargado', 'assets/sonidos/ataqueCargado.mp3');
        this.load.audio('Reloj', 'assets/sonidos/reloj.mp3');
    }

    create(){
        var barquito = this.add.image(400, this.cameras.main.centerY,'barco')
        this.load.on('progress', (value)=>{
            // progress.clear();
            // progress.fillStyle(0xffffff, 1);
            // progress.fillRect(0, 270, 800 * value, 60);
            barquito.setPosition(400*value, this.cameras.main.centerY)
            // barquito.setX(value)
        });
        
        this.load.on('complete', function () {
            // progress.destroy();
            // barquito.destroy();
        });

        this.anims.create({
            key: `Animacion poderUnoPeonSamurai`,
            frames: this.anims.generateFrameNames(`personajePeonSamurai`,{frames:[0,1,2,3, 4, 5, 6, 7, 0]}),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: `Animacion poderUnoPeonVikingo`,
            frames: this.anims.generateFrameNumbers(`personajePeonVikingo`, { frames:[0,1,2,3, 4, 5,0] }),
            frameRate: 8,
            repeat: 0
        });
        this.anims.create({
            key: `Animacion poderUnoReynaSamurai`,
            frames: this.anims.generateFrameNumbers(`personajeReynaSamurai`, { frames:[0,1,2,3, 4, 5, 6, 0] }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: `Animacion poderUnoReynaVikingo`,
            frames: this.anims.generateFrameNumbers(`personajeReynaVikingo`, { frames:[0,1,2,3, 4, 0] }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: `Animacion poderUnoCaballoVikingo`,
            frames: this.anims.generateFrameNumbers(`personajeCaballoVikingo`, { frames:[0,1,2,3, 4, 5, 0] }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: `Animacion poderUnoCaballoSamurai`,
            frames: this.anims.generateFrameNumbers(`personajeCaballoSamurai`, { frames:[0,1,2,3, 4, 5, 6, 0] }),
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
        const sonidos = new ManejadorDeSonidos({scene:this, volumen:.5, loop:true});
        getTranslations(
            this.#language,
            ()=> {this.scene.start('MainMenu', { language: this.#language, sonidos:sonidos })}
        )
    } 


}