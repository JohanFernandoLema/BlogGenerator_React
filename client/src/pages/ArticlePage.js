import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import CommentsList from '../components/CommentsList'
import articles from './article-content'
import NotFoundPage from './NotFoundPage'

const ArticlePage = () => {
  const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] })
  const { articleId } = useParams()

  useEffect(() => {
    const newArticleInfo = async () => {
      const res = await axios.get(`/api/articles/${articleId}`)
      setArticleInfo(res.data)
    }
    // setArticleInfo({ upvotes: 5, comments: [] })
    newArticleInfo()
  }, [])

  const article = articles.find((article) => article.name === articleId)

  const addUpvote = async () => {
    const res = await axios.put(`/api/articles/${articleId}/upvote`)
    const updatedArticle = res.data
    setArticleInfo(updatedArticle)
  }
  if (!article) {
    return (
      <>
        <NotFoundPage />
      </>
    )
  }
  return (
    <>
      <h1>{article.title}</h1>
      <div className="upvotes-section">
        <button onClick={addUpvote}>Upvote</button>
        <h6>
          This {article.name} has {articleInfo.upvotes} upvote(s)
        </h6>
      </div>
      {article.content.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      <CommentsList comments={articleInfo.comments} />
    </>
  )
}
export default ArticlePage
