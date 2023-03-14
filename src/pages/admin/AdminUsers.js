import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { API_URL } from '../../utils/config';
import { fetchData } from '../../utils/functions';

const AdminUsers = () => {
  const { id } = useParams();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function initUsers() {
      let usersData = []

      if (id) {
        usersData = [(await fetchData(`${API_URL}/users/${id}?_embed=posts`))];
      } else {
        usersData = (await fetchData(`${API_URL}/users?_embed=posts`));
      }
      
      setUsers(usersData);
    }
    
    initUsers();
  }, [id])

  return (
    <div className="responsive-table">
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Is admin</th>
            <th>Registration date</th>
            <th>Posts</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {users && users.map((user, index) => {
          return (
            <tr key={index}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.admin ? 'Yes' : 'No'}</td>
              <td>{user.createdDate}</td>
              <td className="link-value">{user.posts.length > 0 ? <Link to={`/admin/posts?userId=${user.id}`}>{user.posts.length}</Link> : user.posts.length}</td>
              <td>
                <Link className="btn small-btn" to={`/admin/users/${user.id}/edit`}>Edit</Link>
                <Link className="btn small-btn secondary-btn" to={`/admin/users/${user.id}/delete`}>X</Link>
              </td>
            </tr>
          );
        })}
        </tbody>
      </table>
    </div>
  )
}

export default AdminUsers