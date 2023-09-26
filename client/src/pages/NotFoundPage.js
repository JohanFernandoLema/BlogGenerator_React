import { Link } from 'react-router-dom'
const NotFoundPage = () => {
  return (
    <>
      <h1>The page you are looking for does not exist!</h1>
      <Link to={'/'}>
        <button>Return Home</button>
      </Link>
    </>
  )
}
export default NotFoundPage
