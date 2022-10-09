import Phaser from "phaser";
import Poder from "./Poderes";

export class Personaje
{
    constructor(props){
        const {vida, tiempo, sprite, poderes = [], velocidad, defensa, id, estaVivo = true} = props
        this.vida = vida;
        this.tiempo = tiempo;
        this.sprite = sprite;
        this.poderes = poderes;
        this.velocidad = velocidad;
        this.defensa = defensa
        this.estaVivo = estaVivo
        this.id = id
       
    }
    atacar(nombre, ataque, enemigo){
/*         console.log(enemigo)
        console.log('Daño: ' + dano) */
        // console.log(nombre.poderes[ataque].dano)
        // nombre.poderes[ataque].dano
        // console.log(`Ataco con: ${nombre}`)
        enemigo.recibirDano(nombre.poderes[ataque].dano, this)
    }

    recibirDano(dano){
        this.vida -= dano;
        console.log('animacion recibir daño')
        if(this.vida <= 0)
        {
            this.estaVivo = false;
            this.vida = 0;
            console.log('animacion de muerte')
            console.log('murio!.')
        }
        // console.log(this.vida)
    }

    recibirCura(dano)
    {
        if(this.vida <= 0)
        {
            this.estaVivo = false;
            this.vida = 0
            return
        }        
        this.vida += dano;
        console.log('animacion recibir cura');
    }

    agregarPoder(keyPoder)
    {
        this.poderes.push(keyPoder)
    }

    elegirPoder(index)
    {
        return this.poderes[index]
    }
    actualizarDatos(objeto){
        this.vida = objeto.vida;
        this.tiempo = objeto.tiempo;
        this.sprite = objeto.sprite;
        this.poderes = objeto.poderes;
        this.velocidad = objeto.velocidad;
        this.defensa = objeto.defensa
        this.estaVivo = objeto.estaVivo
        this.id = objeto.id
    }



}