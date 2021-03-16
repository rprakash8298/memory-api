const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    name: {
        type:String
    },
    completed: {
        type: String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    }
})


const Task = mongoose.model('Task', taskSchema)
module.exports=Task