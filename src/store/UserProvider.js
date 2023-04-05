import { useState, useEffect } from "react";
import { API_URL } from "../utils/config";
import { fetchData } from "../utils/functions";
import UserContext from "./user-context";

const UserProvider = (props) => {
  const loggedUserKey = JSON.parse(localStorage.getItem("user"));

  const [userContext, setUserContext] = useState({
    user: {},
    posts: [],
    indicator: {},
    clearIndicator: () => {
      setUserContext(prevState => {
        return {...prevState, indicator: {}};
      });
    },
    createPost: (data) => {
      setUserContext(prevState => {
        const updatedPosts = [data, ...prevState.posts];
        return {...prevState, posts: updatedPosts, indicator: {status: 'POST_CREATED', data: data.id}};
      });
    },
    deletePost: (data) => {
      setUserContext(prevState => {
        const updatedPosts = prevState.posts.filter(post => post.id !== data);
        return {...prevState, posts: updatedPosts};
      });
    },
    editPost: (data) => {
      setUserContext(prevState => {
        const postIndex = prevState.posts.findIndex(post => post.id === data.id);
        const updatedPosts = [...prevState.posts];
        updatedPosts[postIndex] = data;
        return {...prevState, posts: updatedPosts};
      });
    }
  });

  useEffect(() => {
    async function initUser(key) {
      const userData = (
        await fetchData(`${API_URL}/users?key=${key}&_embed=posts`)
      )[0];

      if (userData.id) {
        setUserContext((prevState) => {
          const sortedPosts = userData.posts.sort((a, b) => parseFloat(b.id) - parseFloat(a.id));

          const updatedState = {
            ...prevState,
            user: {
              key: userData.key,
              name: userData.name,
              admin: userData.admin,
              id: userData.id,
            },
            posts: sortedPosts,
          };

          return updatedState;
        });
      }
    }

    if (loggedUserKey) {
      initUser(loggedUserKey);
    }
  }, [loggedUserKey]);

  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;