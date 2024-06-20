import './App.css';
import { useState } from 'react';

export default function App() {
  const [showNormal, setShowNormal] = useState(true);


  return (
    <>

    <button className='game-mode' onClick={() => setShowNormal(true)}>Normal TicTacToe</button>
    <button className='game-mode' onClick={() => setShowNormal(false)}><b>Ultimate TicTacToe</b> </button>
    <div id='game-shown'> 
      { showNormal ? <NormalGame /> : <Ultimategame />}

    </div>
    
    </>
  );
}
function NormalGame(){
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[history.length - 1];
  
  function resetBoard(){
    setHistory([Array(9).fill(null)]);
    setXIsNext(true);
  }

  function undoMove(){
    if (history.length <= 2){
      resetBoard();
      return;
    }
    setHistory(history.slice(0,-1));
    setXIsNext(!xIsNext);
  }

  function handlePlay(nextSquares) {
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(currentSquares);
    let status;
    if (winner) {
      status = "Winner: " + winner;
    }
    else if(checkFull(currentSquares)){
      status = "Tie. Play again!"
    }
    else{
      status = "Next player: " + (xIsNext ? "X" : "O");
    }

  return(
    <div className='game'>
      <div className='game-board'>
      <button className='game-button' onClick={() => resetBoard()}>Reset Board</button>
      <button className='game-button' onClick={() => undoMove()}>Undo</button>
      <div className='status'>{status}</div>
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className='game-info'>

      </div>
    </div>
  )
}

// 3x3 board of 3x3 games, each move forces the big square which the next move must be placed
// win one small game to claim the big square

function Ultimategame(){
  const [xIsNext, setXIsNext] = useState(true);
  const [activeBoard, setActiveBoard] = useState(null);
  const [activeHistory, setActiveHistory] = useState([]);
  const [history, setHistory] = useState([Array(9).fill([Array(9).fill(null)])]);
  const currentSquares = history[history.length - 1];

  function resetBoard(){
    setHistory([Array(9).fill([Array(9).fill(null)])]);
    setXIsNext(true);
    setActiveBoard(null);
    setActiveHistory([]);
  }

  function undoMove(){
    if (history.length <= 2){
      resetBoard();
      return;
    }
    setHistory(history.slice(0,-1));
    setXIsNext(!xIsNext);
    const lastActiveBoard = history.pop();
    setHistory(history);
    setActiveBoard(lastActiveBoard);
  }

  function handlePlay(nextSquares, nextBoard) {
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
    setActiveHistory(...activeHistory, activeBoard)
    setActiveBoard(nextBoard)
  }

  const winner = calculateWinner(currentSquares);
    let status;
    if (winner) {
      status = "Winner: " + winner;
    }
    else if(checkFull(currentSquares)){
      status = "Tie. Play again!"
    }
    else{
      status = "Next player: " + (xIsNext ? "X" : "O");
    }

  return(
    <div className='game'>
      <div className='game-board'>
      <button className='game-button' onClick={() => resetBoard()}>Reset Board</button>
      <button className='game-button' onClick={() => undoMove()}>Undo</button>
      <div className='status'>{status}</div>
      <UltimateBoard xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className='game-info'>

      </div>
    </div>
  )
}


function UltimateBoard({ xIsNext, squares, onPlay }){
  
  function handlePlay(i){
    
    if(squares[i] || calculateWinner(squares)){
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext){
      nextSquares[i] = "X";}
    else{
      nextSquares[i] = "O";
    }
    onPlay(nextSquares)
  }

  return( 
    <>
    <div className='ultimate-board'>
    <div className='ultimate-board-row'>
      <Board xIsNext={xIsNext} squares={squares[0]} onPlay={onPlay} />
      <Board xIsNext={xIsNext} squares={squares[1]} onPlay={onPlay} />
      <Board xIsNext={xIsNext} squares={squares[2]} onPlay={onPlay} />  
    </div>
    <div className='ultimate-board-row'>
      <Board xIsNext={xIsNext} squares={squares[3]} onPlay={onPlay} />
      <Board xIsNext={xIsNext} squares={squares[4]} onPlay={onPlay} />
      <Board xIsNext={xIsNext} squares={squares[5]} onPlay={onPlay} />
     
    </div>
    <div className='ultimate-board-row'>
      <Board xIsNext={xIsNext} squares={squares[6]} onPlay={onPlay} />
      <Board xIsNext={xIsNext} squares={squares[7]} onPlay={onPlay} />
      <Board xIsNext={xIsNext} squares={squares[8]} onPlay={onPlay} />
     
    </div></div>
    </>
  )
}


function Square({value, onSquareClick}){
  return (
  <button className='square' onClick={onSquareClick}> {value} </button>
)
}

function Board({ xIsNext, squares, onPlay }){

  function handleClick(i){
    
    if(squares[i] || calculateWinner(squares)){
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext){
      nextSquares[i] = "X";}
    else{
      nextSquares[i] = "O";
    }
    onPlay(nextSquares)
  }

  return( 
    <>
    <div className='board'>
    <div className='board-row'>
      <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
      <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
      <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
    </div>
    <div className='board-row'>
      <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
      <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
      <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
    </div>
    <div className='board-row'>
      <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
      <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
      <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
    </div>
    </div>
    </>
  )
}

function calculateWinner(squares){
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function checkFull(squares){
  let full = true
  for (let i = 0; i < squares.length; i++) {
    if(squares[i] == null){
      return false
    }
  }
  return full
  }


