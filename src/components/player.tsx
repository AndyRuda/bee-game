import AbejitaArriba  from '../media/ABEJITA-ARRIBA.png';
import AbejitaAbajo  from '../media/ABEJITA-ABAJO.png';
import AbejitaDerecha  from '../media/ABEJIRA-DERECHA.png';
import AbejitaLeft  from '../media/ABEJITA-IZQ.png';
import player from "../config/player"


const playerUP = new Image(player.playerHeight, player.playerWidht);
playerUP.src = AbejitaArriba;

const playerDown = new Image(player.playerHeight, player.playerWidht);
playerDown.src = AbejitaAbajo;

const playerRight = new Image(player.playerHeight, player.playerWidht);
playerRight.src = AbejitaDerecha;

const playerLeft = new Image(player.playerHeight, player.playerWidht);
playerLeft.src = AbejitaLeft;

export {
    playerUP,
    playerDown,
    playerRight,
    playerLeft
}