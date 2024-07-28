import { sharedInstance } from "../scenes/EventCenter";

export class ManejadorDeSonidos{
    constructor(props){
        const {scene:scene, volumen:volumen, loop:loop} = props;
        this.volumen = volumen;
        this.scene = scene;
        this.MainMenuSonido = this.scene.sound.add('MainMenuSong', {loop:true, volumen: this.volumen})
        this.CombateSong = this.scene.sound.add('CombateSong', {loop:true, volumen:this.volumen})
        this.GuardarObjeto = this.scene.sound.add('GuardarObjetos', {loop:false, volumen:this.volumen})
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

        sharedInstance.on('bajar volumen', ()=>{
            this.controlarVolumen({bajarOsubir:'bajar'});
        });
        sharedInstance.on('subir volumen', ()=>{
            this.controlarVolumen({bajarOsubir:'subir'})
        });
    }
    //falta controlar un poco mas los porcentajes de cada sonido. Que no todos suban
    controlarVolumen({bajarOsubir}){
        (bajarOsubir === 'subir')?this.volumen += 0.1:this.volumen -= 0.1;
        (this.volumen <= 0)?[console.log('LLEGO AL VOLUMEN 0 :/'), this.volumen = 0]:null;
        (this.volumen >= 1)?[console.log('LLEGO AL VOLUMEN MAXIMO DE PHASER :/'), this.volumen = 1]:null;
        this.MainMenuSonido.setVolume(this.volumen)
        this.MainMenuSonido.setVolume(this.volumen)
        this.CombateSong.setVolume(this.volumen)
        this.GuardarObjeto.setVolume(this.volumen)
        this.HoverBoton.setVolume(this.volumen)
        this.Damage.setVolume(this.volumen)
        this.DropObject.setVolume(this.volumen)
        this.AbrirInventario.setVolume(this.volumen)
        this.UsarInventarioConObjeto.setVolume(this.volumen)
        this.UsarInventarioSinObjeto.setVolume(this.volumen)
        this.DoparHabilidad.setVolume(this.volumen)
        this.RobarVida.setVolume(this.volumen)
        this.Defensa.setVolume(this.volumen)
        this.AtaqueCargadoCargando.setVolume(this.volumen)
        this.AtaqueCargado.setVolume(this.volumen)
        this.Reloj.setVolume(this.volumen)
    }
}