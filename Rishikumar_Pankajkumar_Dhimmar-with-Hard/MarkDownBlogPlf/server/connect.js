const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://dhimmarpankaj1976:0tRo0YN0zuqsdYUB@cluster0.s3xi4sm.mongodb.net/BlogApp?retryWrites=true&w=majority&appName=Cluster0').then(() => {
    console.log('Connected to database')
}).catch((e) => {
    console.log('Error white connecting to database')
})