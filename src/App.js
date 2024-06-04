import './App.css';
import { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';
function App() {
  const year = new Date().getFullYear();
  //const list = ['test1','test2']
  const [newitem,setNewItem] = useState("")
  const [list, setList] = useState(['test1']);

  const addItem = (stuff) =>{  
    setList((prev) =>
      prev.concat(stuff)
    )
    setNewItem("");
  }

  const deleteItem = (itemtodelete) =>{
    setList((prev) =>
      prev.filter(a => a!==itemtodelete)
    )
  }

  const editItem = (index) =>{
    const newitem = prompt('New todo: ');
    if (newitem !== null && newitem.trim() !== ''){
        setList((prev) =>
          prev.map((item,i) => (i===index ? newitem : item)
      ))
  }}

  return (
    <>
    <header> <h1>Todo List</h1> </header>
    <br></br>
      
    <div className='note'>
        <label htmlFor='newitem'>Do this: </label>
        <input type='text' name='newitem' id='newitem' 
        placeholder='Write your task' value={newitem} required
        onChange={(e)=> setNewItem(e.target.value)} />
        <button type='submit' value='submit' onClick={(e)=>addItem(newitem)}> 
          Add
        </button> 
    </div>
    <h3> List:</h3>

    <ListGroup>
      {list.map((item,index) =>{
        return (
          <div key={index}>
            <ListGroupItem>
              <div className='note'>
              <p>{item}</p>
              <button onClick={() => deleteItem(item)}>
                Delete
              </button>
              <button onClick={() => editItem(index)}>
                Edit
              </button>
              </div>
              <br></br>
            </ListGroupItem>
          </div>
        )
      })}



    </ListGroup>
      



    <footer> <p>Copyright @ {year}</p> </footer>
    </>
  );
}

export default App;
