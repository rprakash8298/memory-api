const mongoose = require('mongoose')

mongoose.connect(`mongodb+srv://BlogSite:ravi2715@cluster0.0sicn.mongodb.net/MEMORY-API?retryWrites=true&w=majority`, {useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true,useFindAndModify:false})