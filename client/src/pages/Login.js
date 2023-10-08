import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()
  const logIn = async () => {
    try {
      await signInWithEmailAndPassword(getAuth(), email, password)
      navigate('/articles')
    } catch (error) {
      setError(error.message)
    }
  }
  return (
    <>
      {error && <p className="error">{error}</p>}
      <div>
        <label htmlFor="e_mail">
          E-mail
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            placeholder="john@example.com"
            type="email"
            name="userEmail"
            id="userEmail"
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            placeholder="Password"
            type="password"
            name="userPassword"
            id="userPassword"
          />
        </label>
        <button onClick={logIn}>Sing In</button>
        <h4>Do not have an account?</h4>
        <Link to={'/register'}>
          <button>Register</button>
        </Link>
      </div>
    </>
  )
}
export default Login
