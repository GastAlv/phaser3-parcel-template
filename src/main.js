import Phaser from 'phaser'

import Preloads from './scenes/Preloads'
import MainMenu from './scenes/MainMenu'
import Creditos from './scenes/Creditos'
import SeleccionFaccion from './scenes/SeleccionFaccion'
import SeleccionPersonaje from './scenes/SeleccionPersonaje'
import VictoriaSamurai from './scenes/VictoriaSamurai'
import VictoriaVikingo from './scenes/VictoriaVikingo'
import Ui from './scenes/Ui'
import Opciones from './scenes/Opciones'
import Ayuda from './scenes/Ayuda'
import renderTest01 from './scenes/levelRenderer'
import Estadisticas from './js/estadisticas'

const config = {
	type: Phaser.AUTO,
	width: 1280,
	height: 720,
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		min: {
			width: 260,
			height: 280,
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
	scene: [Preloads, Estadisticas, MainMenu, Creditos, Opciones, Ayuda, SeleccionFaccion, SeleccionPersonaje, Ui, renderTest01, VictoriaSamurai, VictoriaVikingo ]
}

export default new Phaser.Game(config)
