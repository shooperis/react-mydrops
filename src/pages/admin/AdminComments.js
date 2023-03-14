import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { API_URL } from './../../utils/config';
import { fetchData } from './../../utils/functions';

const AdminComments = () => {
  const [comments, setComments] = useState([]);
  const [searchParams] = useSearchParams();
  const postId = searchParams.get('postId');

  useEffect(() => {
    async function initComments() {
      let commentsData = []

      if (postId) {
        commentsData = (await fetchData(`${API_URL}/comments?postId=${postId}&_expand=post`));
      } else {
        commentsData = (await fetchData(`${API_URL}/comments?_expand=post`));
      }
      
      setComments(commentsData);
    }
    
    initComments();
  }, [postId])

  return (
    <div className="responsive-table">
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Comment</th>
            <th>Created date</th>
            <th>Post</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {comments && comments.map((comment, index) => {
          return (
            <tr key={index}>
              <td>{comment.id}</td>
              <td>{comment.name}</td>
              <td><input value={comment.text} readOnly/></td>
              <td>{comment.createdDate}</td>
              <td className="link-value"><Link to={`/admin/posts/${comment.post.id}`}>{comment.post.id}</Link></td>
              <td>
                <Link className="btn small-btn secondary-btn" to={`/admin/comments/${comment.id}/delete`}>X</Link>
              </td>
            </tr>
          );
        })}
        </tbody>
      </table>
    </div>
  )
}

export default AdminComments