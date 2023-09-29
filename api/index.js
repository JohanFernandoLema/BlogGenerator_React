import express from 'express'
import { MongoClient } from 'mongodb'

const app = express()

//Middleware
// This middleware is for reading json data
app.use(express.json())

const PORT = 5000

// Mock CODE

// app.get('/hello/:name', (req, res) => {
//   const { name } = req.params
//   res.send(`Hello my friend ${name}`)
// })

app.get('/api/articles/:name', async (req, res) => {
  const { name } = req.params

  const client = new MongoClient('mongodb://127.0.0.1:27017/react-blog-db')
  await client.connect()

  const db = client.db()

  const article = await db.collection('articles').findOne({ name })

  if (article) {
    res.json(article)
  } else {
    res.sendStatus(404)
  }
})

app.put('/api/articles/:name/upvote', async (req, res) => {
  const { name } = req.params
  const client = new MongoClient('mongodb://127.0.0.1:27017/react-blog-db')
  await client.connect()

  const db = client.db()
  await db.collection('articles').updateOne({ name }, { $inc: { upvotes: 1 } })

  const article = await db.collection('articles').findOne({ name })

  if (article) {
    res.send(`The ${name} article has ${article.upvotes} upvotes`)
  } else {
    res.sendStatus(404)
  }
})

app.post('/api/articles/:name/comments', async (req, res) => {
  const { name } = req.params
  const { postedBy, text } = req.body

  const client = new MongoClient('mongodb://127.0.0.1:27017/react-blog-db')
  client.connect()

  const db = client.db()
  await db
    .collection('articles')
    .updateOne({ name }, { $push: { comments: { postedBy, text } } })

  const article = await db.collection('articles').findOne({ name })

  if (article) {
    res.send(article.comments)
  } else {
    res.sendStatus(404)
  }
})
// app.post('/hello', (req, res) => {
//   console.log(req.body)
//   res.send('Hi')
// })

app.listen(PORT, () => {
  console.log(`App successfully running on port ${PORT}`)
})
