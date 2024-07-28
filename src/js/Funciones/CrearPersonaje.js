import { getPhrase } from "../../services/translations";
import { Datos } from "../Datos"
import { Random } from "random-js";
import {crearPoder}from "../Funciones/CrearPoder"

const random = new Random()

export function CrearPersonaje(tipo, clase) {
    const clases = {
        Peon: Datos(Math.round(random.integer(60, 68)), [
            crearPoder(`Animacion poderUno${clase}${tipo}`, (Math.round(random.integer(11, 14))), 1, getPhrase('Ataca al enemigo con un daño: min:11 a max:14').toUpperCase()),
            crearPoder(`ataqueEstandar`, (Math.round(random.integer(9, 15))), 1, getPhrase('Ataca al enemigo con un daño: min:9 a max:15').toUpperCase()),
            crearPoder(`momentoHisteria`, 0.3, 2, getPhrase('Aumenta el daño base en un 30%').toUpperCase()),
            crearPoder(`gritoDeGuerra`, (Math.round(random.integer(0.2, 0.3))), 3, getPhrase(`Intimida al enemigo reduciendo el dano recibido en un min:20% y max:30%`).toUpperCase()),
        ], random.integer(4, 6), false, clase, tipo),
        Alfil: Datos(Math.round(random.integer(60, 68)), [
            crearPoder(`Animacion poderUno${clase}${tipo}`, (Math.round(random.integer(10, 16))), 1, getPhrase('Ataca al enemigo con un daño: min:10 a max:16').toUpperCase()),
            crearPoder(`sangrado`, 10, 9, getPhrase('Causa daño:10 en cada turno al enemigo').toUpperCase()),
            crearPoder(`curacion`, null, 6, getPhrase('Se cura un 45% HP, hasta un maximo de tre veces').toUpperCase()),
            crearPoder(`cantoMotivador`, null, 2, getPhrase('Aumenta el daño base en un 30%').toUpperCase())
        ], random.integer(6, 7), false, clase, tipo),
        Torre: Datos(Math.round(random.integer(85, 95)), [
            crearPoder(`Animacion poderUno${clase}${tipo}`, (Math.round(random.integer(18, 22))), 1, getPhrase('Ataca al enemigo con un daño: min:18 a max:22').toUpperCase()),
            crearPoder(`ataqueCargado`, (Math.round(random.integer(60, 65))), 7, getPhrase('Se carga el ataque y al tercer turno hace daño: min:60 a max:65').toUpperCase()),
            crearPoder(`arrollar`, 10, 8, getPhrase('Paraliza al enemigo por un turno').toUpperCase()),
            crearPoder(`refuerzo`, (Math.round(random.integer(0.40, 0.50))), 3, getPhrase('Reduce el daño recibido un 45% del daño').toUpperCase())
        ], random.integer(2, 3), false, clase, tipo),
        Caballo: Datos(Math.round(random.integer(65, 75)), [
            crearPoder(`Animacion poderUno${clase}${tipo}`, (Math.round(random.integer(17, 20))), 1, getPhrase('Ataca al enemigo con un daño: min:17 a max:20').toUpperCase()),
            crearPoder(`ataqueEstandar`, (Math.round(random.integer(13, 15))), 1, getPhrase('Ataca al enemigo con un daño: min:13 y max:15').toUpperCase()),
            crearPoder(`estampida`, 8, 5, getPhrase('Se ataca un numero repetida de veces con un daño menor al normal').toUpperCase()),
            crearPoder(`relinchar`, null, 6, getPhrase('Se cura un hasta un 75% HP cuando tiene menos de 50% de HP').toUpperCase())
        ], random.integer(7, 8), false, clase, tipo),
        Reyna: Datos(Math.round(random.integer(75, 85)), [
            crearPoder(`Animacion poderUno${clase}${tipo}`, (Math.round(random.integer(17, 25))), 1, getPhrase('Ataca al enemigo con un daño: min:17 a max:25').toUpperCase()),
            crearPoder(`boostCritico`, 0.80, 2, getPhrase('Aumenta el ataque en un 80% por un turno').toUpperCase()),
            crearPoder(`roboDeVida`, (Math.round(random.integer(10, 15))), 4, getPhrase('Se cura entre min:10% y max:15% del daño realizado').toUpperCase()),
            crearPoder(`esquiva`, 1, 3, getPhrase('Esquiva el siguiente ataque enemigo').toUpperCase())
        ], random.integer(8, 9), false, clase, tipo)
    }
    return clases[clase]
}