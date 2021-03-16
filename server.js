const express = require('express')
const app = express()
const Cors = require('cors')
require('./db/mongoose')
const userRouter = require('./routes/user')
const taskRouter = require('./routes/tasks')
const port = process.env.PORT || 4000
app.use(express.json())
app.use(Cors())
app.use('/api',userRouter )
app.use('/api1',taskRouter)
app.listen(port, () => {
    console.log('app running on ', port)
})