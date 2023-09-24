import ArticlesList from '../components/ArticlesList'
import articles from './article-content'

const ArticlesListPage = () => {
  return (
    <>
      <ArticlesList articles={articles} />
    </>
  )
}
export default ArticlesListPage
