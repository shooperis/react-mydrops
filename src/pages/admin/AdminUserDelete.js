import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from '../../utils/config';
import { fetchData } from '../../utils/functions';

const AdminUserDelete = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function deleteUser() {
      const userData = (await fetchData(`${API_URL}/users/${id}`, {
        method: 'DELETE'
      }));

      navigate("/admin/users");
    }
    
    deleteUser();
  }, [])

  return (
    <div>User was deleted</div>
  )
}

export default AdminUserDelete