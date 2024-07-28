import { sharedInstance } from "../../scenes/EventCenter";

export function curarSangrado({quienSeCura:quienSeCura}){
    (quienSeCura === 'Samurai')?sharedInstance.emit('curar sangrado samurai'):sharedInstance.emit('curar sangrado vikingo');
};