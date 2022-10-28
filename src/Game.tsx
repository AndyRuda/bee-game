import { useRef, useEffect, useState, useCallback } from "react"
import useKey from "./hooks/useKey"
import player from "./config/player"
import { Actions } from "./types/PlayerActions"
import './styles/game.css';
import { playerUP, playerDown, playerRight, playerLeft } from "./components/player"
import audio from "./components/audio"
import bee from "./components/bee"

// REALIZAR CODIGO QUE DETERMINE DIRECION DE MOVIMIENTO 
// LOGAR QUE LA ABEJA SE MAS GRANDE 
const Game = () => {
    const {XMoveUnit, yMoveUnit, playerHeight, playerWidht} = player;
    const canvas = useRef<HTMLCanvasElement>(null);

    const [canvasContext, setCanvasContext] = useState<CanvasRenderingContext2D>();
    const [audioPlay, setAudioPlay] = useState(false);
    const [playerX, setPlayerX] = useState(0);
    const [playerY, setPlayerY] = useState(0);

    // Draw Trace Line
    const drawChatacterLine = (x: number, y: number, xPlus: number, yPlus: number, direction: 'X' | 'Y') => {
        if(canvasContext){
            canvasContext.beginPath();
            canvasContext.setLineDash([1,3]);
            canvasContext.moveTo(x + xPlus, y + yPlus );
            if(direction === 'X'){
                canvasContext.lineTo(x + xPlus + 10, y + yPlus);
            }else if( direction === 'Y'){
                canvasContext.lineTo(x + xPlus, y + yPlus + 10);
            }
            canvasContext.stroke();
        }
    }

    // Draw The Character
    const drawCharacter =  useCallback( (x: number, y: number) => {
        if(canvasContext && canvas.current){
            canvasContext.clearRect(0, 0, canvas.current.width, canvas.current.height);
            if(checkWallCollition(x,y)) {
                x = canvas.current.width / 2
                y = canvas.current.height / 2
            }

            if(playerX < x && playerY === y){
                canvasContext.drawImage(playerRight, x, y, playerHeight, playerWidht );
                drawChatacterLine(x-5, y-5, -5, 10, 'X');
            }else if(playerX > x && playerY === y){
                canvasContext.drawImage(playerLeft, x, y, playerHeight, playerWidht );
                drawChatacterLine(x+5, y-5, 5, 10, 'X');
            }else if(playerX === x && playerY > y){
                canvasContext.drawImage(playerUP, x, y, playerHeight, playerWidht );
                drawChatacterLine(x, y, 5, 10, 'Y');
            }else if(playerX === x && playerY < y){
                canvasContext.drawImage(playerDown, x, y, playerHeight, playerWidht );
                drawChatacterLine(x, y, 5, -10, 'Y');

            }else{
                canvasContext.drawImage(
                    playerUP, 
                    canvas.current.width / 2, 
                    canvas.current.height / 2, 
                    playerHeight, 
                    playerWidht 
                );
            }

            setPlayerX(x);
            setPlayerY(y);
        }

    }, [canvasContext, canvas, playerX, playerY ])
    
    // Check For Wall Collitin
    const checkWallCollition = (x: number , y: number) => {
        const width = canvas.current!.width;
        const height = canvas.current!.height;
        if( x >= width - XMoveUnit || x <= 0 || y >= height - yMoveUnit || y <= 0 ){
            return true
        }
        return false
    }
    // Handler for Keypress by user
    const handleKeyPressPlayer = (action: Actions) => (e: KeyboardEvent) => {
        if(!audioPlay) { 
            audio.play();
            setAudioPlay(true); 
            setTimeout(()=>{setAudioPlay(false)}, (audio.duration + 1) *1000)
        }
        bee.play();
        switch (action) {
            case 'up':
                drawCharacter(playerX, playerY - yMoveUnit);
                break;
            case 'down':
                drawCharacter(playerX , playerY + yMoveUnit);
                break;
            case 'right':
                drawCharacter(playerX + XMoveUnit, playerY);
                break;
            case 'left':
                drawCharacter(playerX - XMoveUnit, playerY);
                break;
        }
    }
    // Init player
    useEffect(()=>{
        if(canvasContext) { 
            drawCharacter(canvas.current!.width/2, canvas.current!.height/2);
        }
    },[canvasContext])
    // Setup canvan
    useEffect(()=>{
        if(canvas && !canvasContext) setCanvasContext(canvas.current?.getContext('2d')!)
    }, [canvas])
    // Add eventListener for keypress   
    const useW = useKey("w", handleKeyPressPlayer('up'));
    const useS = useKey("s", handleKeyPressPlayer('down'));
    const useA = useKey("a", handleKeyPressPlayer('left'));
    const useD = useKey("d", handleKeyPressPlayer('right'));

    return (
        <div id="game-container">
            <canvas id="main" ref={canvas} width="700" height="550"></canvas>
        </div>
    )
}

export default Game;