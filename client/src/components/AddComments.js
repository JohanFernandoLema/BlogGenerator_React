import { useState } from 'react'
import axios from 'axios'
const AddComments = ({ articleId, updatedArticle }) => {
  const [name, setName] = useState('')
  const [comment, setComment] = useState('')

  const updatedArticleAndComment = async () => {
    const response = await axios.post(`/api/articles/${articleId}/comments`, {
      postedBy: name,
      text: comment,
    })
    const updatedComment = response.data
    updatedArticle(updatedComment)
    setComment('')
    setName('')
  }
  return (
    <div>
      <label htmlFor="name">
        Name:
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          name="commentatorName"
          id="commentatorName"
        />
      </label>

      <label htmlFor="comment">
        Comment:
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
