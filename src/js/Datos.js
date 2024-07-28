export function Datos(vida, poderes, velocidad, defensa, clase, tipo) {
    let id = 0;

    (tipo === 'Samurai' && clase === 'Peon') ? id = 11 : null;
    (tipo === 'Samurai' && clase === 'Caballo') ? id = 22 : null;
    (tipo === 'Samurai' && clase === 'Reyna') ? id = 33 : null;
    (tipo === 'Samurai' && clase === 'Alfil') ? id = 44 : null;
    (tipo === 'Samurai' && clase === 'Torre') ? id = 55 : null;


    (tipo === 'Vikingo' && clase === 'Peon') ? id = 1 : null;
    (tipo === 'Vikingo' && clase === 'Caballo') ? id = 2 : null;
    (tipo === 'Vikingo' && clase === 'Reyna') ? id = 3 : null;
    (tipo === 'Vikingo' && clase === 'Alfil') ? id = 4 : null;
    (tipo === 'Vikingo' && clase === 'Torre') ? id = 5 : null;
    return {
        vida: vida,
        sprite: `${'personaje'}${clase}${tipo}`,
        poderes: poderes,
        spriteSheet: `${`botonesAtaque`}${clase}`,
        velocidad: velocidad,
        defensa: defensa,
        tipo: tipo,
        estaVivo: true,
        id: id,
        vidaBase: vida,
        clase: clase
    }
}