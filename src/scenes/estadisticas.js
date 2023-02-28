import Phaser from "phaser";
import { findMatch, saveMatch } from "../firebaseDB/saveMatch";
import { getIp } from "../ipApi/ipApiConfig";
export class shape {
    constructor({ props }) {
        const { scene: scene, x: x, y: y, text: text, style: style, cols: cols, rows: match = {}, titles = [] } = props;
        this.scene = scene;
        scene;
        x;
        y;
        text;
        style;
        cols;
        match;
        titles;
        // scene.add.existing(this);
        this.scene.add.text(text);
        for (let index = 0; index < titles.length; index++) {
            let title = titles[index];
            let tableContentHead = {
                x: x,
                y: y,
                text: title.toUpperCase(),
                style: style
            };
            this.scene.make.text(tableContentHead)
            for (let index = 0; index < match.length; index++) {
                let content = match[index];
                let tableContentBody = {
                    x: x,
                    y: y,
                    text: content.toUpperCase(),
                    style: style
                };
                this.scene.make.text(tableContentBody);
            }

        }
    }
}
export default class Estadisticas extends Phaser.Scene {
    #ip;
    matchData;
    constructor() {
        super('Estadisticas')
    }
    init(data) {
        this.#ip = getIp().toString()

        let match = data.match;
        saveMatch(match);
        findMatch().then((data) => {
            this.matchData = data;
            // console.log(match);
        });
    }
    create() {
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'menuInicio').setScale(1.135);
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

                        console.log(objLength.winner);
                        for (let index = 0; index <= 3; index++) {
                            let content;
                            for(const [clave, valor] of Object.entries(objLength)) {(clave === claves[i])?[content = valor]:[null]}
                            let tableContentBody = {
                                x: xBody,
                                y: yBody,
                                text: content,
                                style: contentStyle
                            };
                            this.make.text(tableContentBody);
                            xBody += 125;
                            i++;
                        }
                    }, 1000)
                });
            } catch (error) {
                console.error("aaaaaaaaa");
            }
        };
        let tableStat = table();
    }
    update() {

    }
}