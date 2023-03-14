import { useState, useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { API_URL } from './../../utils/config';
import { fetchData } from './../../utils/functions';

const AdminPosts = () => {
  const [posts, setPosts] = useState([]);
  const [searchParams] = useSearchParams();
  const {id} = useParams();
  const userId = searchParams.get('userId');

  useEffect(() => {
    async function initPosts() {
      let postsData = []

      if (id) {
        postsData = [(await fetchData(`${API_URL}/posts/${id}?_embed=comments&_expand=user`))];
      } else {
        if (userId) {
          postsData = (await fetchData(`${API_URL}/posts?userId=${userId}&_embed=comments&_expand=user`));
        } else {
          postsData = (await fetchData(`${API_URL}/posts?_embed=comments&_expand=user`));
        }
      }
      
      setPosts(postsData);
    }
    
    initPosts();
  }, [id, userId])

  return (
    <div className="responsive-table">
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Type</th>
            <th>Content</th>
            <th>Comments</th>
            <th>Created date</th>
            <th>User</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {posts && posts.map((post, index) => {
          return (
            <tr key={index}>
              <td>{post.id}</td>
              <td>{post.type}</td>
              <td><input value={post.content} readOnly/></td>
              <td className="link-value">{post.comments.length > 0 ? <Link to={`/admin/comments?postId=${post.id}`}>{post.comments.length}</Link> : post.comments.length}</td>
              <td>{post.createdDate}</td>
              <td className="link-value"><Link to={`/admin/users/${post.user.id}`}>{post.user.name}</Link></td>
              <td>
                <Link className="btn small-btn secondary-btn" to={`/admin/posts/${post.id}/delete`}>X</Link>
              </td>
            </tr>
          );
        })}
        </tbody>
      </table>
    </div>
  )
}

export default AdminPosts