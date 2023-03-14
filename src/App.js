import { Route, Routes, useNavigate } from 'react-router-dom';
import { API_URL } from './utils/config';
import { fetchData } from './utils/functions';
import { useState, useEffect } from 'react';
import Wrapper from './components/Wrapper/Wrapper';
import Posts from './pages/Posts';
import Post from './pages/Post';
import Registration from './pages/Registration';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Logout from './pages/Logout';
import UserMenu from './components/UserMenu/UserMenu';
import AdminLayout from './components/AdminLayout/AdminLayout';
import AdminUsers from './pages/admin/AdminUsers';
import AdminUserDelete from './pages/admin/AdminUserDelete';
import AdminUsersManipulate from './pages/admin/AdminUsersManipulate';
import AdminPosts from './pages/admin/AdminPosts';
import AdminPostDelete from './pages/admin/AdminPostDelete';
import AdminComments from './pages/admin/AdminComments';
import AdminCommentDelete from './pages/admin/AdminCommentDelete';

function App() {
  const navigate = useNavigate();
  const loggedUserKey = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState({});

  async function initUser(key) {
    const userData = (await fetchData(`${API_URL}/users?key=${key}&_embed=posts`))[0];

    if (userData.id) {
      setUser(userData);
    } else {
      navigate("/login");
    }
  }

  useEffect(() => {
    if (loggedUserKey) {
      initUser(loggedUserKey);
    }
  }, [loggedUserKey])

  return (
    <>
      {user.id && <UserMenu expanded={user.admin} />}
      <Wrapper>
        <Routes>
          <Route index element={user.id ? <Posts user={user.id} /> : <Login />} />
          <Route path="/posts" element={<Posts user={user.id} />} />
          <Route path="/post/:key" element={<Post />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<PageNotFound />} />
          {user.admin && (
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminUsers />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="users/:id" element={<AdminUsers />} />
              <Route path="users/new" element={<AdminUsersManipulate />} />
              <Route path="users/:id/edit" element={<AdminUsersManipulate />} />
              <Route path="users/:id/delete" element={<AdminUserDelete />} />
              <Route path="posts" element={<AdminPosts />} />
              <Route path="posts/:id" element={<AdminPosts />} />
              <Route path="posts/:id/delete" element={<AdminPostDelete />} />
              <Route path="comments" element={<AdminComments />} />
              <Route path="comments/:id/delete" element={<AdminCommentDelete />} />
            </Route>
          )}
        </Routes>
      </Wrapper>
    </>
  );
}

export default App;