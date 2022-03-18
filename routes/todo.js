const router = require('express').Router()
const todoModel = require('../models/todo');
const todoController = require('../controllers/todo');
const isauth = require('../middleware/is-auth');

router.get('/home', isauth,  todoController.getAllTodos);

router.post('/add/todo', isauth, todoController.saveTodo)

router.get('/delete/todo/:_id', isauth, todoController.deleteTodo)

router.get('/complete/todo/:_id', isauth, todoController.updateCompleted)

router.get('/active', isauth, todoController.getActiveTodos)

router.get('/completed', isauth, todoController.getCompletedTodos)

module.exports = router;