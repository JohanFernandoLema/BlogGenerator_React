import express from 'express'

const app = express()

const articlesInfo = [
  { name: 'learn-react', upvotes: 0, comments: [] },
  { name: 'learn-node', upvotes: 0, comments: [] },
  { name: 'learn-mongoDB', upvotes: 0, comments: [] },
]

//Middleware
// This middleware is for reading json data
app.use(express.json())

const PORT = 5000

// Mock CODE

// app.get('/hello/:name', (req, res) => {
//   const { name } = req.params
//   res.send(`Hello my friend ${name}`)
// })
app.put('/api/articles/:name/upvote', (req, res) => {
  const { name } = req.params
  const article = articlesInfo.find((a) => a.name === name)

  if (article) {
    article.upvotes += 1
    res.send(`The ${name} article has now ${article.upvotes} upvotes`)
  } else {
    res.send(`This article does not\ 'n exist `)
  }
})

app.post('/api/articles/:name/comments', (req, res) => {
  const { name } = req.params
  const { postedBy, text } = req.body
  const article = articlesInfo.find((a) => a.name === name)

  if (article) {
    article.comments.push({ postedBy, text })
    res.send(article.comments)
  } else {
    res.send(`This article does not\ 'n exist `)
  }
})
// app.post('/hello', (req, res) => {
//   console.log(req.body)
//   res.send('Hi')
// })

app.listen(PORT, () => {
  console.log(`App successfully running on port ${PORT}`)
})
