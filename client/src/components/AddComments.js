import { useState } from 'react'
import axios from 'axios'
import useUser from '../hooks/useUser'

const AddComments = ({ articleId, updatedArticle }) => {
  const [name, setName] = useState('')
  const [comment, setComment] = useState('')
  const { user } = useUser()
  const updatedArticleAndComment = async () => {
    const token = user && (await user.getIdToken())
    const headers = token ? { authtoken: token } : {}
    const response = await axios.post(
      `/api/articles/${articleId}/comments`,
      {
        postedBy: name,
        text: comment,
      },
      { headers }
    )
    const updatedComment = response.data
    updatedArticle(updatedComment)
    setComment('')
    setName('')
  }
  return (
    <div>
      {user && <p>You are commenting as: {user.email}</p>}
      <label htmlFor="comment">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          name="commentatorComment"
          id="commentatorComment"
          cols="30"
          rows="10"
        ></textarea>
      </label>
      <button onClick={updatedArticleAndComment}>Add Comment</button>
    </div>
  )
}
export default AddComments
