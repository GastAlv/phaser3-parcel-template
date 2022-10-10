import Phaser from 'phaser'

import Preloads from './scenes/Preloads'
import MainMenu from './scenes/MainMenu'
import Creditos from './scenes/Creditos'
import SeleccionFaccion from './scenes/SeleccionFaccion'
import SeleccionPersonaje from './scenes/SeleccionPersonaje'
import BatallaPuente from './scenes/BatallaPuente'
import BatallaBosque from './scenes/BatallaBosque'
import BatallaCiudad from './scenes/BatallaCiudad'
import Ui from './scenes/Ui'

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
			height: 1200,
		},
	},
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
			debug: false,
		}
	},
	scene: [Preloads, MainMenu, Creditos, SeleccionFaccion, SeleccionPersonaje, Ui, BatallaPuente, BatallaBosque, BatallaCiudad ]
}

export default new Phaser.Game(config)
