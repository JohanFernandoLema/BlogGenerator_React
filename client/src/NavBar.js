import { Link } from 'react-router-dom'
import useUser from './hooks/useUser'
const NavBar = () => {
  const user = useUser()
  return (
    <nav>
      {user ? (
        <ul>
          <li>
            <Link to={'/'}>Home</Link>
          </li>
          <li>
            <Link to={'/about'}> About</Link>
          </li>
          <li>
            <Link to={'/articles'}>Articles</Link>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to={'/'}>Home</Link>
          </li>
          <li>
            <Link to={'/about'}> About</Link>
          </li>
          <li>
            <Link to={'/articles'}>Articles</Link>
          </li>
          <li>
            <Link to={'/login'}>Login</Link>
          </li>
        </ul>
      )}
    </nav>
  )
}
export default NavBar
