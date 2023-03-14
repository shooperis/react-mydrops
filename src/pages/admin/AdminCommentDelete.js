import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from '../../utils/config';
import { fetchData } from '../../utils/functions';

const AdminCommentDelete = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function deleteComment() {
      const commentData = (await fetchData(`${API_URL}/comments/${id}`, {
        method: 'DELETE'
      }));

      navigate("/admin/comments");
    }
    
    deleteComment();
  }, [])

  return (
    <div>Comment was deleted</div>
  )
}

export default AdminCommentDelete