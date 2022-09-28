import Phaser from "phaser"


export default class Button
{
    constructor(scene, x, y, texture, text, size, callback, scale)
    {
        this.container = scene.add.container(x, y)

        this.img = scene.add.image(0, 0, texture)
        .setInteractive({ useHandCursor: true })
        .setScale(scale)
        .on("pointerdown", () => callback())
        .on("pointerover", ()=> this.img.setScale(scale - 0.02))
        .on("pointerout", ()=> this.img.setScale(scale))
        
        this.txt = scene.add.text(0, 0, text, {fontSize: size})
        .setOrigin(0.5)
        .setStyle({fontFamily: 'asian'});

        this.container.add([this.img, this.txt])
    }
}


function loadFont(name, url) {
    var newFont = new FontFace(name, `url(${url})`);
    newFont.load().then(function (loaded) {
        document.fonts.add(loaded);
    }).catch(function (error) {
        return error;
    });
}

/* function Borrar(bAtaque){
    bAtaque.visible = false;
    bObEstats.visible = false;
    bObjeto.visible = false;

    if(bAtaque.visible === true){
    bAtaque.visible = false;;
    };
}; */

loadFont("asian", "assets/fuentes/OPTIAsian.otf")
