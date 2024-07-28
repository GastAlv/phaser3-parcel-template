export function crearPoder(nombre, dano, tipo, info) {
    return {
        nombre: nombre,
        dano: dano,
        tipo: tipo,
        info: info.toUpperCase()
    }
}