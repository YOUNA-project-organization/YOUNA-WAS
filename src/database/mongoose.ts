import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost/youna', { useUnifiedTopology: true, useNewUrlParser: true })

const db = mongoose.connection;

db.on('error', console.error.bind(console, '❌ connection error: '))
db.once('open', () => {
    console.log('✅ Success to be connected to mongodb://localhost/*********')
})