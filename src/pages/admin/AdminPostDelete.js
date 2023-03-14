import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from '../../utils/config';
import { fetchData } from '../../utils/functions';

const AdminPostDelete = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function deletePost() {
      const postData = (await fetchData(`${API_URL}/posts/${id}`, {
        method: 'DELETE'
      }));

      navigate("/admin/posts");
    }
    
    deletePost();
  }, [])

  return (
    <div>Post was deleted</div>
  )
}

export default AdminPostDelete