export function removerEscuchas({ scene, idEscena }) {
    console.log(idEscena);
    scene.scene.stop('Ui');
    scene.scene.stop(idEscena);
    scene.registry.events.removeListener('Samurai poder1');
    scene.registry.events.removeListener('Samurai poder2');
    scene.registry.events.removeListener('Samurai poder3');
    scene.registry.events.removeListener('Samurai poder4');
    scene
    scene.registry.events.removeListener('Vikingo poder1');
    scene.registry.events.removeListener('Vikingo poder2');
    scene.registry.events.removeListener('Vikingo poder3');
    scene.registry.events.removeListener('Vikingo poder4');

    scene.registry.events.removeListener('siguiente combate');
    scene.registry.events.removeListener('victoria de combate');
    scene.registry.events.removeListener('Evaluar vivos');
}