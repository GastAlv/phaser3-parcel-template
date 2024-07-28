export function convertirClase(Clase) {
    return {
        vida: Math.round(Clase.vida),
        sprite: Clase.sprite,
        poderes: Clase.poderes,
        spriteSheet: Clase.spriteSheet,
        velocidad: Clase.velocidad,
        defensa: Clase.defensa,
        tipo: Clase.tipo,
        estaVivo: Clase.estaVivo,
        id: Clase.id,
        vidaBase: Clase.vidaBase,
        clase: Clase.clase,
        kills: Clase.getKills,
    }
}