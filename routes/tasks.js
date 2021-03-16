const express = require('express')
const router =new express.Router()
const Task = require('../model/task')
const auth = require('../middleware/auth')
router.post('/add_task', auth, async (req, res) => {
    try {
        const task = new Task({ ...req.body,owner:req.user._id })
        await task.save()
        res.send({msg:"task added successfully"})
    } catch (e) {
        
    }
})

router.get('/tasks', auth, async (req, res) => {
    const task = await Task.find({ owner: req.user._id })
    res.send(task)
})

module.exports = router