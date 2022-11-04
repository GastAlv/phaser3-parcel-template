import { sharedInstance } from "../scenes/EventCenter";
export let listaDeTodosLosObjetos = [
    {nombre:'CurarSangrado', textureIndex:1},
    {nombre:'Atacar', textureIndex:2},
    {nombre:'Revivir', textureIndex:3},
    {nombre:'Escudo divino', textureIndex:4},
    {nombre:'Choque de escarcha', textureIndex:5},
    {nombre:'Miedo', textureIndex:6},
    {nombre:'Golpe bajo', textureIndex:7},
]

export class EntidadBase{
    constructor(props){
        const {scene, x, y, vida, sprite, indexSpriteSheet, velocidad, defensa, dano, animacion, tipo, estaVivo = true}=props

        this.scene = scene;
        this.x = x;
        this.y = y;
        this.vida = vida;
        this.sprite = sprite;
        this.velocidad = velocidad;
        this.defensa = defensa;
        this.indexSpriteSheet = indexSpriteSheet;
        this.tipo = tipo;
        this.animacion = animacion;
        this.dano = dano;

        this.img = this.scene.add.image(this.x, this.y, this.sprite, this.indexSpriteSheet);
        this.img.play(this.animacion)
    }
    atacar(enemigo){
        enemigo.recibirDano(this.dano)
    }
    defenderAlInvocador(){

    }
    
    /*
    Fuciones:
    Ataca al enemigo
    Defiende al invocador(recibiendo su daño por x turnos)

    */

}
export function curarSangrado({quienSeCura:quienSeCura}){
    (quienSeCura === 'Samurai')?sharedInstance.emit('curar sangrado samurai'):sharedInstance.emit('curar sangrado vikingo');
};
export function rebote({usuario:usuario, enemigo:enemigo, indexDelPoder:indexDelPoder}){
    usuario.setDefensa()
    enemigo.recibirDano(enemigo.poderes[indexDelPoder].dano)
};