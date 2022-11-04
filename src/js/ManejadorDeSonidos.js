export class ManejadorDeSonidos{
    constructor(props){
        const {scene:scene, volumen:volumen, loop:loop} = props;
        this.scene = scene;
        this.MainMenuSonido = this.scene.sound.add('MainMenuSong', {loop:loop, volumen:volumen})
        this.CombateSong = this.scene.sound.add('CombateSong', {loop:loop, volumen:volumen})
        this.GuardarObjeto = this.scene.sound.add('GuardarObjetos', {loop:false, volumen:volumen})
        this.HoverBoton = this.scene.sound.add('HoverBoton', {loop:false, volumen:.5})
        this.Damage = this.scene.sound.add('Damage', {loop:false, volumen:.5})
        this.DropObject = this.scene.sound.add('DropObject', {loop:false, volumen:.5})
        this.AbrirInventario = this.scene.sound.add('AbrirInventario', {loop:false, volumen:.5})
        this.UsarInventarioConObjeto = this.scene.sound.add('UsarInventarioConObjeto', {loop:false, volumen:.5})
        this.UsarInventarioSinObjeto = this.scene.sound.add('UsarInventarioSinObjeto', {loop:false, volumen:.5})
        this.DoparHabilidad = this.scene.sound.add('DoparHabilidad', {loop:false, volumen:.5})
        this.RobarVida = this.scene.sound.add('RobarVida', {loop:false, volumen:.5})
        this.Defensa = this.scene.sound.add('Defensa', {loop:false, volumen:.5})
        this.AtaqueCargadoCargando = this.scene.sound.add('AtaqueCargadoCargando', {loop:false, volumen:1})
        this.AtaqueCargado = this.scene.sound.add('AtaqueCargado', {loop:false, volumen:.5})
        this.Reloj = this.scene.sound.add('Reloj', {loop:false, volumen:.5})
    }
}