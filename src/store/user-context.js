import React from "react";

const UserContext = React.createContext({
  user: {},
  posts: [],
  createPost: () => {},
  deletePost: () => {},
  editPost: () => {}
});

export default UserContext;
