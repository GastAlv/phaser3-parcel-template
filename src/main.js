import Phaser from 'phaser'

import Preloads from './scenes/Preloads'
import MainMenu from './scenes/MainMenu'
import Creditos from './scenes/Creditos'
import SeleccionFaccion from './scenes/SeleccionFaccion'
import SeleccionPersonaje from './scenes/SeleccionPersonaje'
import BatallaPuente from './scenes/BatallaPuente'
import BatallaBosque from './scenes/BatallaBosque'
import BatallaCiudad from './scenes/BatallaCiudad'
import BatallaCastillo from './scenes/BatallaCastillo'
import BatallaCosta from './scenes/BatallaCosta'
import VictoriaSamurai from './scenes/VictoriaSamurai'
import VictoriaVikingo from './scenes/VictoriaVikingo'

import Ui from './scenes/Ui'
import Mochila from './js/mochilas'
import Opciones from './scenes/Opciones'
import Ayuda from './scenes/Ayuda'
import renderTest01 from './js/levelRenderer'

const config = {
	type: Phaser.AUTO,
	width: 1280,
	height: 720,
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		min: {
			width: 800,
			height: 600,
		},
		max: {
			width: 1600,
			height: 1280,
		},
	},
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
			debug: false,
		}
	},
	audio: {
        disableWebAudio: true
    },
	scene: [Preloads, MainMenu, Creditos, Opciones, Ayuda, SeleccionFaccion, SeleccionPersonaje, Ui, renderTest01, Mochila, BatallaPuente, BatallaBosque, BatallaCiudad, BatallaCastillo, BatallaCosta, VictoriaSamurai, VictoriaVikingo ]
}

export default new Phaser.Game(config)
