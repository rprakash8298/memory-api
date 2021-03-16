const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
    name: {
        type:String
    },
     email: {
         type: String,
         required: true,
         unique:true
    },
      password: {
        type:String
    },
     age: {
        type:String
    },
    tokens: [{
        token: {
            type: String,
            required:true
        }
    }]
})

userSchema.virtual('tasks', {
    ref: "Task",
    localField: '_id',
    foreignField:'owner'
})

userSchema.methods.genAuthToken = async function () {
    const user = this
    const token = await jwt.sign({ _id: user._id.toString() }, 'secret')
    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
    
}

userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password =await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('User', userSchema)
module.exports=User