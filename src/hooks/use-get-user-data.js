import { useEffect, useContext, useMemo } from "react";
import { API_URL } from "../utils/config";
import UserContext from "../store/user-context";
import useHttp from "./use-http";

const useGetUserData = () => {
  const loggedUserKey = useMemo(() => JSON.parse(localStorage.getItem("user")));

  const userCtx = useContext(UserContext);
  const fetchData = useHttp();

  useEffect(() => {
    async function initUser(key) {
      const userData = (
        await fetchData({
          url: `${API_URL}/users?key=${key}&_embed=posts`,
          actionOrigin: "GetUserData",
        })
      )[0];

      if (userData.id) {
        userCtx.setUserData(userData);
      }
    }

    if (loggedUserKey) {
      initUser(loggedUserKey);
    }
  }, [loggedUserKey, fetchData]);
};

export default useGetUserData;
