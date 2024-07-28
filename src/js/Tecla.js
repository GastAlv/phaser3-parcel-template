import Phaser from "phaser"

export class Tecla{
    constructor(props){
        const {scene:scene, x:x, y:y, textura:textura, texto:texto, tamaño:tamaño, textoExplicativo:textoExplicativo} = props;

        this.contenedor = scene.add.container(x, y)
        this.img = scene.add.image(0, 0, textura)
        this.texto = scene.add.text(0,0,texto, {color:'#000000', fontFamily:'asian', fontSize:tamaño}).setOrigin(.5)
        this.textoExplicativo = scene.add.text(x+50,y-10,textoExplicativo, {color:'#000000', fontFamily:'asian', fontSize:'20px', wordWrap: { width: 300 },})
        this.contenedor.add([this.img, this.texto])
    }
}

export function CrearYPresioarTecla({scene:scene, teclaValor:teclaValor}){
    let keyCreada = scene.input.keyboard.addKey(teclaValor);

    const JustPressed = Phaser.Input.Keyboard.JustDown(keyCreada)

    return JustPressed
}