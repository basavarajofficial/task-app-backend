const express = require('express');
const router = express.Router();

const Todo = require("../models/todoSchema");


// create new todo item
router.post('/', async(req, res) => {
    try{
        console.log(req);
        const {title, completed} = req.body;
        const todo = new Todo({ title, completed});

        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    }catch(error){
        res.status(500).json({message : error.message})
    }
});


// get all todo items
router.get('/', async(req, res) => {
    try{
        const todos = await Todo.find();
        res.json(todos);
    }catch(err){
        res.status(500).json({message: err.message})
    }
});


// get by ID
router.get('/:id', async(req, res) => {
    try {
        let todo = await Todo.findById(req.params.id);
        if(todo == null){
            return res.status(404).json({message : "Item does not exist"})
        }

        return res.json(todo);
    } catch (err) {
        res.status(500).json({message: err.message})
    }
});

// update todo
router.patch('/:id', async(req, res) => {
    try {
        const {title} = req.body;
        const todo = await Todo.findById(req.params.id);

        todo.title = title;
        const updatedTodo = await todo.save();

        res.json(updatedTodo);

    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

// delete todo
router.delete('/:id', async(req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);

        if(!todo){
            return res.status(404).json({message : "item does not exists"})
        }
        return res.status(200).json({message : "item deleted successfully"});
    } catch (error) {
        res.json({message : error.message})
    }
});

// complete 
router.put('/complete/:id', async(req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);

        todo.completed = !todo.completed;
        todo.save();
        console.log(todo);
        res.json(todo);

    } catch (err) {
        res.json({message : err.message})
    }
})


module.exports = router;