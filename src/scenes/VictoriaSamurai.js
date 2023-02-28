import Phaser from 'phaser'
import { findMatch, saveMatch } from '../firebaseDB/saveMatch';
import { getIp } from '../ipApi/ipApiConfig';
import {BotonSencillo} from '../js/button';
import { getPhrase } from '../services/translations';


// Manejador de eventos centralizados para comunicacion de componentes

// Importacion
//import { sharedInstance as events } from './EventCenter'

// Emisor de mensaje de difusion
// Recibe el nombre del mensaje y los valores de parametro
// events.emit('health-changed', this.health)

// Receptor de mensaje, por ejemplo escena de UI
// Recibe el nombre del mensaje y una funcion callback a ejecutar
// events.on('health-changed', this.handleHealthChanged, this)


export default class VictoriaSamurai extends Phaser.Scene
{
    #ip;
    matchData;
	constructor()
	{
		super('VictoriaSamurai')
	}
    init(data){
        this.sonidos = data.sonidos
        this.languaje = data.language

        this.#ip = getIp().toString()

        this.match = data.match;
        console.log(this.match);
        saveMatch(this.match);
        findMatch().then((data) => {
            this.matchData = data;
            // console.log(match);
        });
    }
    create()
    {
        let key;
        (this.match.winner === "Samurais")?[key = 1]:[key = 2];
        
        console.log(key);
        let backgroundKeys ={
            1: 'victoriaSamurai',
            2: 'victoriaVikingo',
        }
        // this.sonidos.MainMenuSonido.pause()
        let victoriaSamurai = this.add.image( this.cameras.main.centerX , this.cameras.main.centerY , backgroundKeys[key]);
        victoriaSamurai.setScale(1.25)

        new BotonSencillo({scene:this, x:900, y:600, texture:'botonMarco', text:getPhrase('VOLVER AL MENU'), size:40,  callback:() => {
            this.sonidos.MainMenuSonido.stop(), 
            this.scene.start('MainMenu'),{languaje: this.languaje, sonidos:this.sonidos}
        }, scale:0.4, callbackHover:()=>{}, callbackOut:()=>{}})
        let style = {
            fontSize: '20px',
            fontFamily: 'Asian',
            color: '#000',
            backgroundColor: '#ffff',
            padding: {
                x: 5,
                y: 10
            },
            wordWrap: { width: 150 }
        };

        let contentStyle = {
            fontSize: '20px',
            fontFamily: 'Asian',
            color: '#000',
            backgroundColor: '#555',
            padding: {
                x: 5,
                y: 10
            },
            wordWrap: { width: 150 }
        };
        let titles = ["faccion ganadora", "perdedor", "mejor ficha de la partida", "eliminaciones"];
        let xHead = (this.cameras.main.centerX);
        let yHead = (this.cameras.main.centerY - 100);
        let xBody = (this.cameras.main.centerX + 10);
        let yBody = (this.cameras.main.centerY);
        const table = async () => {
            try {
                let dataMatch = await findMatch().then((data) => {
                    this.matchData = data;
                    console.log(this.matchData);

                    for (let index = 0; index < titles.length; index++) {
                        let title = titles[index];
                        let tableContentHead = {
                            x: xHead,
                            y: yHead,
                            text: title.toUpperCase(),
                            style: style
                        };
                        this.make.text(tableContentHead)
                        xHead += 120;
                    }
                    let objLength = data


                    let claves = ["winner", "loser", "MVP", "MVPKilss"]

                    setTimeout(() => {

                        let i = 0;

                        // console.log(objLength.winner);
                        for (let index = 0; index <= 3; index++) {
                            let content;
                            for(const [clave, valor] of Object.entries(objLength)) {(clave === claves[index])?[content = valor]:[null]}
                            console.log(content);
                            let tableContentBody = {
                                x: xBody,
                                y: yBody,
                                text: content,
                                style: contentStyle
                            };
                            this.make.text(tableContentBody);
                            xBody += 125;
                        }
                    }, 1000)
                });
            } catch (error) {
                console.error("aaaaaaaaa");
            }
        };
        let tableStat = table();

    }
}
