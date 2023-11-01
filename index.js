import express from 'express'
import cors from 'cors'
import { MongoClient } from 'mongodb'
import 'dotenv/config'

const client = new MongoClient(process.env.MONGO_URI)
const db = client.db('blogapp-c12')
const blogPosts = db.collection('blog-posts')

client.connect()
console.log('Connected to Mongo')

const app = express()
app.use(cors())
app.use(express.json())



app.get('/', async (req, res) => {
    const allPosts = await blogPosts.find().toArray()
    console.log('allPosts ->', allPosts)
    res.send(allPosts)
})

app.post('/', async (req, res) => {
    console.log('req.body ->', req.body)
    const newBlogPost = { title: req.body.title, content: req.body.content }
    const addedItem = await blogPosts.insertOne(newBlogPost)
    console.log('addedItem->', addedItem)
    res.send(addedItem)



})

app.listen('8080', () => console.log('Api listening on port 8080'))