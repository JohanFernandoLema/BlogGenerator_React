import './App.css'
import { Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ArticlePage from './pages/ArticlePage'
import ArticlesListPage from './pages/ArticlesListPage'
import AboutPage from './pages/AboutPage'

function App() {
  return (
    <div className="App">
      <h1>Why working out is important!</h1>
      <HomePage />
      <Link to={'/article-info'}>
        <AboutPage />
      </Link>

      <ArticlePage />
      <ArticlesListPage />
    </div>
  )
}

export default App
