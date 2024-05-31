const express =require("express");
const app=express();
const cors=require("cors")
const pool=require("./datab")
app.use(cors())
app.use(express.json())

// Routes

//create a todo

app.post("/todo",async(req,res)=>{
try {
    console.log(req.body)
    const { name, address, department } = req.body;
    const newtodo=pool.query("insert into todo(name,address,department) values($1,$2,$3)",[name,address,department] )
    res.json(newtodo)
} catch (err) {
    console.log(err.message);
}

})

// get all todos

app.get("/todo",async(req,res)=>{
    try {
        const todo=await pool.query("select * from todo")
        res.json(todo.rows)
    } catch (err) {
        console.log(err.message);
    }
})

// get a todo with id

app.get("/todo/:id",async(req,res)=>{
    try {
        console.log(req.params)
        const {id}=req.params;
        console.log(id)
        const list=await pool.query("select * from todo where id=$1",[id])
        res.json(list.rows[0])
        console.log(list)
    } catch (err) {
        console.log(err.message);
    }
})

// update 

// Update a todo
app.put("/todo/:id", async (req, res) => {
    try {
        const { name, address, department } = req.body;
        const { id } = req.params;
        const updatedTodo = await pool.query("UPDATE todo SET name = $1, address = $2, department = $3 WHERE id = $4 RETURNING *", [name, address, department, id]);
        // res.json(updatedTodo.rows[0]);
        res.json("update successfully")
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});



//delete

app.delete("/todo/:id",async(req,res)=>{
    try {
        console.log(req.params)
        const {id}=req.params;
        const list=await pool.query("delete from todo where id=$1",[id])
        res.json("deleted")
  
    } catch (err) {
        console.log(err.message);
    }
})

app.listen(5000,"127.0.0.1",()=>{
    console.log("server is running")
})