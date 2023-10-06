import { Link } from 'react-router-dom'
const Login = () => {
  return (
    <>
      <div>
        Input your credentials down here
        <h4>Do not have an account?</h4>
        <Link to={'/register-account'}>
          <button>Register</button>
        </Link>
      </div>
    </>
  )
}
export default Login
