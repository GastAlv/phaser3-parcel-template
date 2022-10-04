import Phaser from "phaser";

export default class Poder 
{
    constructor(props) {
        const { nombre, dano, tipo, poderes = []} = props;
        this.nombre = nombre;
        this.dano = dano;
        this.tipo = tipo;
        this.poderes = poderes
    }
    /* 
    elegirPoder(poder){
        console.log(`estamos eligiendo el poder}`)
        this.equiparPoder(poder)
    }


    equiparPoder(poder, jugadorUno){

        jugadorUno.atacar(this.poderes[poder])

    }
    
    
    curarAliados(curacion){
        console.log('estamos curando a los aliados' + curacion)
    } */

}


