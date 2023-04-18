import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import UserContext from "./store/user-context";

import Wrapper from "./components/Wrapper/Wrapper";
import Loading from "./components/UI/Loading/Loading";

import Posts from "./pages/Posts";
import Post from "./pages/Post";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Logout from "./pages/Logout";
import UserMenu from "./components/UserMenu/UserMenu";
import AdminLayout from "./components/AdminLayout/AdminLayout";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminUserDelete from "./pages/admin/AdminUserDelete";
import AdminUsersManipulate from "./pages/admin/AdminUsersManipulate";
import AdminPosts from "./pages/admin/AdminPosts";
import AdminPostDelete from "./pages/admin/AdminPostDelete";
import AdminComments from "./pages/admin/AdminComments";
import AdminCommentDelete from "./pages/admin/AdminCommentDelete";
import Error from "./components/UI/Error/Error";
import useGetUserData from "./hooks/use-get-user-data";

function App() {
  const userCtx = useContext(UserContext);

  useGetUserData();

  console.log(userCtx);

  if (userCtx.httpIndicator.errorMessage) {
    return (
      <Wrapper>
        <Error message={userCtx.httpIndicator.errorMessage} />
      </Wrapper>
    );
  }

  if (
    userCtx.httpIndicator.isLoading &&
    userCtx.httpIndicator.action === "GetUserData"
  ) {
    return (
      <Wrapper>
        <Loading />
      </Wrapper>
    );
  }

  return (
    <>
      {userCtx.user.id && <UserMenu expanded={userCtx.user.admin} />}
      <Wrapper>
        <Routes>
          <Route index element={userCtx.user.id ? <Posts /> : <Login />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/post/:key" element={<Post />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<PageNotFound />} />
          {userCtx.user.admin && (
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
              <Route
                path="comments/:id/delete"
                element={<AdminCommentDelete />}
              />
            </Route>
          )}
        </Routes>
      </Wrapper>
    </>
  );
}

export default App;
