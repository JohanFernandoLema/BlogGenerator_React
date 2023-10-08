import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
const RegisterAccount = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const createAccount = async () => {
    if (password !== confirmPassword) {
      setError('Invalid credentials - try again')
      return
    }
    try {
      await createUserWithEmailAndPassword(getAuth(), email, password)
      navigate('/login')
    } catch (error) {
      setError(error.message)
    }
  }
  return (
    <>
      {error && <p className="error">{error}</p>}
      <label htmlFor="userEmail">
        Email:
        <input
          type="email"
          placeholder="john@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
        />
      </label>
      <label htmlFor="userEmail">
        Password:
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          type="password"
          placeholder="Input your password"
        />
      </label>
      <label htmlFor="userEmail">
        Confirm your Password:
        <input
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value)
          }}
          type="password"
          placeholder="Re-enter your password"
        />
      </label>
      <button onClick={createAccount}>Create Account</button>
    </>
  )
}
export default RegisterAccount
