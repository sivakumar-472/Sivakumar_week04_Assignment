 // using Express


 const express = require('express');
 const mongoose = require('mongoose');
 const cors = require('cors')


 //create an instance of express
 const app = express();
 app.use(express.json())
 app.use(cors())

 //sample in-memory storage for todo items

//  let todos =[];

//connecting mongodb

mongoose.connect('mongodb+srv://siva2002:siva123@hardiksiva.eny0b9u.mongodb.net/')
.then(()=>{
    console.log('DB connected')
    
})
.catch(()=>{
    console.log(err);
    
})

//creating Schema

const todoSchema = new mongoose.Schema({

    title:{
        required:true,
        type:String
    },

    description:String

})


//model

const todoModel = mongoose.model('Todo',todoSchema)





//Create a new toDo item

 app.post('/todos', async (req,res)=>{
      const{title,description} = req.body;
//    const newToDo ={
//     id: todos.length + 1,
//     title,
//     description
//    };

//    todos.push(newToDo);
//    console.log(todos);

try {
    const newTodo = new todoModel({title,description});
    await newTodo.save();
    res.status(201).json(newTodo)
    
} catch (error) {
     console.log(error);
    res.status(500).json({message:error.message});
}

 })


    
    








 

 //get all items

 app.get('/todos',async (req,res)=>{
    try {
       const todos = await todoModel.find() 
       res.json(todos); 
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message});
        
    }
   
 })

 //update todo item

 app.put('/todos/:id', async (req,res)=>{

    try {
         const{title,description} = req.body;
    const id =  req.params.id;
   const updatedTodo = await todoModel.findByIdAndUpdate(
        id,
        {title,description},
        {new:true}
    )
    if (!updatedTodo) {
        return res.status(404).json({message: 'Todo not found'})
        
    }
    res.json(updatedTodo)
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message});
        
    }
    
 })


 //Delete a Todo item

 app.delete('/todos/:id', async (req,res)=>{

    try {
        const id = req.params.id;


    await todoModel.findByIdAndDelete(id);
    res.status(204).end();
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message});
        
    }
    
 })
 
    

 










 //start the server
 const port =5000;
 app.listen(port,()=>{
    console.log(`Server is listening to ${port} `);
    
 })

