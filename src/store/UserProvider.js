import { useState } from "react";
import UserContext from "./user-context";

const UserProvider = (props) => {
  const [userContext, setUserContext] = useState({
    user: {},
    posts: [],
    indicator: {},
    httpIndicator: {},
    setHttpIndicator: (data) => {
      setUserContext((prevState) => {
        const prevStateHttpIndicator = { ...prevState.httpIndicator, ...data };
        return { ...prevState, httpIndicator: prevStateHttpIndicator };
      });
    },
    clearIndicator: () => {
      setUserContext((prevState) => {
        return { ...prevState, indicator: {} };
      });
    },
    setUserData: (data) => {
      setUserContext((prevState) => {
        const sortedPosts = data.posts.sort(
          (a, b) => parseFloat(b.id) - parseFloat(a.id)
        );

        const updatedState = {
          ...prevState,
          user: {
            key: data.key,
            name: data.name,
            admin: data.admin,
            id: data.id,
          },
          posts: sortedPosts,
        };

        return updatedState;
      });
    },
    createPost: (data) => {
      setUserContext((prevState) => {
        const updatedPosts = [data, ...prevState.posts];
        return {
          ...prevState,
          posts: updatedPosts,
          indicator: { status: "POST_CREATED", data: data.id },
        };
      });
    },
    deletePost: (data) => {
      setUserContext((prevState) => {
        const updatedPosts = prevState.posts.filter((post) => post.id !== data);
        return { ...prevState, posts: updatedPosts };
      });
    },
    editPost: (data) => {
      setUserContext((prevState) => {
        const postIndex = prevState.posts.findIndex(
          (post) => post.id === data.id
        );
        const updatedPosts = [...prevState.posts];
        updatedPosts[postIndex] = data;
        return { ...prevState, posts: updatedPosts };
      });
    },
  });

  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
