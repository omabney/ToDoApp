const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//ToDo Schema
const todoSchema = new Schema({
    todo:{
        type: String, 
        required: true,
    },
    isCompleted:{
        type: Boolean,
        default: false,
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = new mongoose.model('todoLists', todoSchema);