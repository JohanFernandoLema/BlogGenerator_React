import { Link } from 'react-router-dom'

// pass articles as a prop so we can re-use it inside any other component
const ArticlesList = ({ articles }) => {
  return (
    <>
      {articles.map((article, index) => (
        <Link
          className="article-list-item"
          to={`/articles/${article.name}`}
          key={index}
        >
          <h3>{article.title}</h3>
          <p>{article.content[0].substring(0, 250)}...</p>
        </Link>
      ))}
    </>
  )
}
export default ArticlesList
