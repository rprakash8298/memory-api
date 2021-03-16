const express = require('express')
const router = new express.Router()
const User = require('../model/users')
const bcrypt = require('bcryptjs')
const auth = require('../middleware/auth')
router.post('/add_user', async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        const token =await user.genAuthToken()
        res.json(token)
    } catch (e) {
        res.send(e)
    }
})
router.post('/login', async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    try {
        const user = await User.findOne({ email })
        if (!user) {
            res.send("Email not registered")
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            res.send("password is in valid")
        } else {
            const token = await user.genAuthToken()
            res.json({user,token})
        }
    } catch (e) {
        res.send(e)
    }
})

router.patch('/update_user',auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidUpdates = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidUpdates) {res.send('update is not valid')}
    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.send(e)
    }
})
router.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send('logged out successfully ')
    } catch (e) {
        res.send(e)
    }
})

router.delete('/delete_user', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.send(e)
    }
})

module.exports=router