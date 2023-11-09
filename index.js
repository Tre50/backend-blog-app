import express from 'express'
import cors from 'cors'
import { MongoClient } from 'mongodb'
import 'dotenv/config'

const app = express()
app.use(cors())
app.use(express.json())


const client = new MongoClient(process.env.MONGO_URI)
const db = client.db('blogapp-c12')
const blogPosts = db.collection('blog-posts')
const userDb = db.collection('users')
client.connect()
console.log('Connected to Mongo')


app.get('/', async (req, res) => {
    const allPosts = await blogPosts.find().toArray()
    console.log('allPosts ->', allPosts)
    res.send(allPosts)
})

app.post('/', async (req, res) => {
    const newBlogPost = { title: req.body.title, content: req.body.content }
    await blogPosts.insertOne(newBlogPost)
    const allPosts = await blogPosts.find().toArray()
    res.send(allPosts)
})

app.post('/signup', async (req, res) => {
    const userAdded = await userDb.insertOne({ email: req.body.email, password: req.body.password })
    res.send(userAdded)

})

app.post('/login',async (req, res) => {
    console.log(req.body)
    
})

app.listen('8080', () => console.log('Api listening on port 8080'))

//Get the following working on backend and frontend
//Signup -> adding user to the database
//Login -> confirming the user is in database