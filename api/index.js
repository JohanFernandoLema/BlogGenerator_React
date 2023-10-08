import express from 'express'
import { MongoClient } from 'mongodb'
import fs from 'fs'
import admin from 'firebase-admin'

const credentials = JSON.parse(fs.readFileSync('../credentials.json'))
admin.initializeApp({ credential: admin.credential.cert(credentials) })
const app = express()

app.use(async (req, res, next) => {
  const { authtoken } = req.headers
  if (authtoken) {
    try {
      const user = await admin.auth().verifyIdToken(authtoken)
    } catch (error) {
      res.sendStatus(400)
    }
  }
  next()
})

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
  const { uid } = req.user

  const client = new MongoClient('mongodb://127.0.0.1:27017/react-blog-db')
  await client.connect()

  const db = client.db()

  const article = await db.collection('articles').findOne({ name })

  if (article) {
    const upvoteIds = article.upvoteIds || []
    article.canUpvote = uid && !upvoteIds.include(uid)
    res.json(article)
  } else {
    res.sendStatus(404)
  }
})

app.use((req, res, next) => {
  if (req.user) {
    next()
  } else {
    res.sendStatus(401)
  }
})

app.put('/api/articles/:name/upvote', async (req, res) => {
  const { name } = req.params
  const { uid } = req.user

  const article = await db.collection('articles').findOne({ name })
  const client = new MongoClient('mongodb://127.0.0.1:27017/react-blog-db')
  await client.connect()

  const db = client.db()
  if (article) {
    const upvoteIds = article.upvoteIds || []
    const canUpvote = uid && !upvoteIds.include(uid)
    if (canUpvote) {
      await db
        .collection('articles')
        .updateOne(
          { name },
          { $inc: { upvotes: 1 }, $push: { upvoteIds: uid } }
        )
    }

    const updatedArticle = await db.collection('articles').findOne({ name })

    res.json(updatedArticle)
  } else {
    res.sendStatus(404)
  }
})

app.post('/api/articles/:name/comments', async (req, res) => {
  const { name } = req.params
  const { text } = req.body
  const { email } = req.user

  const client = new MongoClient('mongodb://127.0.0.1:27017/react-blog-db')
  client.connect()

  const db = client.db()
  await db
    .collection('articles')
    .updateOne({ name }, { $push: { comments: { email, text } } })

  const article = await db.collection('articles').findOne({ name })

  if (article) {
    res.json(article)
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
