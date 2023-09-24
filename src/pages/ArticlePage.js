import { useParams } from 'react-router-dom'
const ArticlePage = () => {
  const { articleId } = useParams()
  return <h1>You are about to read the article with the id: </h1>
}
export default ArticlePage
