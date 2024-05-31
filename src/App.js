// import Newadd from './components/Newadd';
import {useState,useEffect} from 'react'


function App() {
  const [todos, setTodos] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    department: 'IT'
  });
  const [showModal, setShowModal] = useState(false);
  const [editingTodoId, setEditingTodoId] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await fetch('http://localhost:5000/todo');
    const data = await response.json();
    setTodos(data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingTodoId) {
      // Edit existing todo
     let s=editingTodoId%10;
      const response = await fetch(`http://localhost:5000/todo/${s}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      alert(response.ok)
      if (response.ok) {
        fetchTodos();
        setShowModal(false);
        setFormData({ name: '', address: '', department: 'IT' });
        setEditingTodoId(null);
      }
    } else {
      // Add new todo
      const response = await fetch('http://localhost:5000/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        fetchTodos();
        setShowModal(false);
        setFormData({ name: '', address: '', department: 'IT' });

      }
    }
  };

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/todo/${id}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      fetchTodos();
    }
  };

  const openEditModal = (todo) => {
    setFormData({ ...todo });
    setShowModal(true);
    setEditingTodoId(todo.id);
  };

  return (
    <div className="App">
      <h1>CRUD</h1>
      <button className="add-button" onClick={() => setShowModal(true)}>Add New</button>
      <table className="todo-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Department</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo,index) => (
            <tr key={index}>
              <td>{index+1}</td>
              <td>{todo.name}</td>
              <td>{todo.address}</td>
              <td>{todo.department}</td>
              <td>
                <button className="edit-button" onClick={() => openEditModal(todo)}>Edit</button>
                <button className="delete-button" onClick={() => handleDelete(todo.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

{/* {showModal && <Newadd/>} */}




     {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>{editingTodoId ? 'Edit Data' : 'Add Data'}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
              <br></br>
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
              />
              <br></br>
              <select name="department" value={formData.department} onChange={handleChange}>
                <option value="IT">IT</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
              </select>
              <div className="button-container">
                <button className="submit-button" type="submit">{editingTodoId ? 'Save' : 'Add'}</button>
                <button className="cancel-button" type="button" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )} 
    </div>
  );
}

export default App;