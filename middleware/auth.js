const jwt = require('jsonwebtoken')
const User = require('../model/users')
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decode = jwt.verify(token, 'secret')
        const user =await User.findOne({ _id: decode._id, 'tokens.token': token })
        if (!user) {
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({error:'plase Authenticate'})
    }
}


module.exports = auth