
export function rebote({usuario:usuario, enemigo:enemigo, indexDelPoder:indexDelPoder}){
    usuario.setDefensa()
    enemigo.recibirDano(enemigo.poderes[indexDelPoder].dano)
};