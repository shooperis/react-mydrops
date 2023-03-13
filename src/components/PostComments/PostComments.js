import './PostComments.scss';
import { useState } from 'react';
import { API_URL } from './../../utils/config';
import { fetchData, getTimeStamp } from './../../utils/functions';

const PostComments = ({postId, commentsData, postOwner}) => {
  const loggedUserKey = JSON.parse(localStorage.getItem("user"));
  const [comments, setComments] = useState(commentsData);
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const renderComments = () => {
    if (!comments || comments.length < 1) {
      return <div className="no-comments">No comments</div>;
    }

    if (comments.length > 0) {
      return comments.map((comment, index) => (
        <div key={index} className="comment">
          <div className="name">
            {postOwner === loggedUserKey && <button className="delete-button" onClick={() => {onDeleteCommentHandler(comment.id)}}>X</button>}
            {comment.name}
          </div>
          <div className="date">{comment.createdDate}</div>
          <div className="text">{comment.text}</div>
        </div>
      ));
    }
  }

  const onSubmitFormHandler = async event => {
    event.preventDefault();

    if (!comment && !name) {
      setError('Both fields are required');
      return;
    }

    createComment(comment, name, postId);
  };

  async function createComment(comment, name, postId) {
    const data = { 
      name: name,
      text: comment,
      createdDate: getTimeStamp(),
      postId: postId
    };

    const commentResponse = await fetchData(`${API_URL}/comments`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(data)
    });

    if (commentResponse) {
      setComments(prevState => [...prevState, commentResponse]);

      setError('');
      setComment('');
      setName('');
    }
  }

  const onDeleteCommentHandler = async id => {
    await fetchData(`${API_URL}/comments/${id}`, {
      method: 'DELETE'
    });

    setComments(prevState => prevState.filter(comment => comment.id !== id));
  }

  return (
    <>
      <div className="content post-comments">
        <h2 className="title">Comments</h2>

        <div className="comments-list">
          {renderComments()}
        </div>
      </div>

      <form className="content post-comments-form" onSubmit={onSubmitFormHandler} noValidate>
        <h3 className="title">Add comment</h3>
        <div className="form-control comment">
          <label htmlFor="comment">Your comment</label>
          <textarea 
            name="comment" 
            id="comment"
            value={comment}
            onChange={event => setComment(event.target.value)}
            className={error && 'error'} 
          ></textarea>
        </div>
        <div className="form-control name">
          <label htmlFor="name">Your name</label>
          <input 
            type="text" 
            name="name" 
            id="name" 
            placeholder='Joe Doe'
            value={name}
            onChange={event => setName(event.target.value)}
            className={error && 'error'}
          />
          <button className='btn small-btn third-btn'>Send</button>
        </div>

        {error && (
          <span className="error">{error}</span>
        )}
      </form>
    </>
  )
}

export default PostComments