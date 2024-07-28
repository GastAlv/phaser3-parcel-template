import { curarSangrado } from "./CurarSangrado";
import { rebote } from "./Rebote";

// funcion que evalua que metodo/funcion usar para la habilidad
export function escuchaDeHabilidades(tipo, index, atacante, enemigo) {
    console.log(tipo);
    (tipo === 1) ? atacante.atacar(index, enemigo) : null;
    (tipo === 2) ? atacante.doparHabilidad(0, atacante.poderes[index].dano, enemigo) : null;
    (tipo === 3) ? atacante.setDefensa(true) : null;
    (tipo === 4) ? atacante.robarVida(index, enemigo) : null;
    (tipo === 5) ? atacante.multipleAtaque(index, enemigo) : null;
    (tipo === 6) ? atacante.recibirCura(atacante.poderes[index].dano) : null;
    (tipo === 7) ? atacante.cargarAtaque(index) : null;
    (tipo === 8) ? atacante.robarTurno(enemigo) : null;
    (tipo === 9) ? atacante.danoPorTurno(atacante.poderes[index].dano) : null;
    (tipo === 'CurarSangrado') ? curarSangrado({ quienSeCura: atacante.tipo }) : null;
    (tipo === 'Rebote') ? rebote({ usuario: atacante, enemigo: enemigo, indexDelPoder: null }) : null;
    (tipo === 'Atacar') ? console.log('Atacar') : null;
    (tipo === 'Revivir') ? console.log('Revivir') : null;
    (tipo === 'Escudo divino') ? console.log('Escudo divino') : null;
    // const queHabilidadUsar = {
    //     1:atacante.atacar(index, enemigo),
    //     2:atacante.doparHabilidad(0, atacante.poderes[index].dano, enemigo),
    //     3:atacante.setDefensa(true),
    //     4:atacante.robarVida(index, enemigo),
    //     5:atacante.multipleAtaque(index, enemigo),
    //     6:atacante.recibirCura(atacante.poderes[index].dano),
    //     7:atacante.cargarAtaque(index),
    //     8:atacante.robarTurno(enemigo),
    //     9:atacante.danoPorTurno(atacante.poderes[index].dano),
    // }
    // queHabilidadUsar[tipo];
};
/*
A modificar para las funciones en los ataque 

*DOPAR HABILIDAD: ver de que no se hardcodee el poder que dopa en, porque es el index:0 siempre y ver si el usuario puede eleguir cual potenciar, 
sino potencia su ataque 0 siempre. porque  habria que cambiarlos en todos los personajes para que decidan que poder dopar y se tendria que llamar dopar habilidad
(Aumenta las estadisticas del poder seleccionado)

*
*/