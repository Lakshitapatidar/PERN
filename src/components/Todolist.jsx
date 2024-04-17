import { useState } from "react";
// import { MdOutlineAddCircle } from "react-icons/md";
const Todolist=()=>{
const [items,setitems]=useState("");
const [dates,setdates]=useState("");
const [todoList, setTodoList] = useState([]);
const handledate=(event)=>{
    setdates(event.target.value)
}


const handledelete = (itemToDelete) => {
    const newTodoList = todoList.filter((todo) => todo.item !== itemToDelete);
    setTodoList(newTodoList);
  };
  

const handleitem=(event)=>{
    setitems(event.target.value)
}

 const clickedevent=()=>{
    if (items && dates) {
        const newTodo = {
          item: items,
          date: dates
        };
        setTodoList([...todoList, newTodo]);
        setitems(" ");
        setdates(" ");
      }
}
    return(
        <>
    <h1 id="head">Todo-App</h1>
<div class="container text-center tbb  item">

<div class="row  kg-row  item ">
<div class="col-2"><input type="text" placeholder='enter the data' value={items}  onChange={handleitem}></input></div>
<div class="col-2"><input type="date" placeholder='enter the data' value={dates} onChange={handledate}></input></div>
<div class="col-2"><button type="button" class="btn btn-success  btnkg" onClick={clickedevent}>Add</button></div>
</div>

{todoList.length==0 &&  <h2>Add  Some Items</h2>}

<div class="row kg-row  item ">
    
         {todoList.map((todo, index) => (
            <>
            <div class="col-4">{todo.item}</div>
            <div class="col-4">{todo.date}</div>
            <div class="col-2 bt"><button type="button" class="btn btn-danger btnkg" onClick={() => handledelete(todo.item)}>Delete</button></div>
            </>
          ))}
          
    
</div>


       </div>
       </>
    )
}

export default Todolist;



