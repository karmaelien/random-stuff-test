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
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} ultimate={false} />
      </div>
      <div className='game-info'>
        <br></br>
        Classic TicTacToe, you know the rules!
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
    const lastBoard = activeBoard
    setActiveHistory([...activeHistory, lastBoard]);
    setActiveBoard(nextBoard);
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
      <UltimateBoard activeBoard={activeBoard} xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className='game-info'>
        <br></br>
        Ultimate TicTacToe! A spinoff of the original! Nested TicTacToe, if you place in the 
        top right of a smaller 3x3, you're opponent's next move must be in the corresponding square 
        of the big 3x3! Hope that makes sense! You'll learn as you go! 

        The goal is similar, to get 3 in a row on the big board. But in order to place on the big
        board you must win the underlying small board!!
      </div>
    </div>
  )
}


function UltimateBoard({ xIsNext, squares, onPlay, activeBoard }){
  
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
      <Board activeBoard={activeBoard} ultBoard={squares} xIsNext={xIsNext} boardIndex={0} squares={squares[0]} onPlay={onPlay} ultimate={true}/>
      <Board activeBoard={activeBoard} ultBoard={squares} xIsNext={xIsNext} boardIndex={1} squares={squares[1]} onPlay={onPlay} ultimate={true}/>
      <Board activeBoard={activeBoard} ultBoard={squares} xIsNext={xIsNext} boardIndex={2} squares={squares[2]} onPlay={onPlay} ultimate={true}/>  
    </div>
    <div className='ultimate-board-row'>
      <Board activeBoard={activeBoard} ultBoard={squares} xIsNext={xIsNext} boardIndex={3} squares={squares[3]} onPlay={onPlay} ultimate={true}/>
      <Board activeBoard={activeBoard} ultBoard={squares} xIsNext={xIsNext} boardIndex={4} squares={squares[4]} onPlay={onPlay} ultimate={true}/>
      <Board activeBoard={activeBoard} ultBoard={squares} xIsNext={xIsNext} boardIndex={5} squares={squares[5]} onPlay={onPlay} ultimate={true}/>
     
    </div>
    <div className='ultimate-board-row'>
      <Board activeBoard={activeBoard} ultBoard={squares}  xIsNext={xIsNext} boardIndex={6} squares={squares[6]} onPlay={onPlay} ultimate={true}/>
      <Board activeBoard={activeBoard} ultBoard={squares} xIsNext={xIsNext} boardIndex={7} squares={squares[7]} onPlay={onPlay} ultimate={true}/>
      <Board activeBoard={activeBoard} ultBoard={squares} xIsNext={xIsNext} boardIndex={8} squares={squares[8]} onPlay={onPlay} ultimate={true}/>
     
    </div></div>
    </>
  )
}


function Square({value, onSquareClick}){
  return (
  <button className='square' onClick={onSquareClick}> {value} </button>
)
}

function Board({ xIsNext, squares, onPlay, ultimate, boardIndex, ultBoard, activeBoard }){

  function handleClick(i){
    
    if (ultimate){ 
      if(squares[i] || calculateWinner(squares) || (activeBoard !== boardIndex && activeBoard !== null)){
        return;
      }
      const nextSquares = squares.slice();
      const newBoards = ultBoard.slice();
      if (xIsNext){
        nextSquares[i] = "X";}
      else{
        nextSquares[i] = "O";
      }
      newBoards[boardIndex] = nextSquares
      onPlay(newBoards, i)

    }
    else{
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


