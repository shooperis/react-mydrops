import { useCallback, useContext } from "react";
import UserContext from "./../store/user-context";

const useHttp = () => {
  const userCtx = useContext(UserContext);

  const fetchData = useCallback(async (requestConfig) => {
    userCtx.setHttpIndicator({ isLoading: true });
    userCtx.setHttpIndicator({ errorMessage: null });
    try {
      if (requestConfig.actionOrigin) {
        userCtx.setHttpIndicator({ action: requestConfig.actionOrigin });
      }

      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.method
          ? { "Content-type": "application/json; charset=UTF-8" }
          : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();

      userCtx.setHttpIndicator({ isLoading: false });
      userCtx.setHttpIndicator({ action: null });
      return data;
    } catch (error) {
      userCtx.setHttpIndicator({ isLoading: false });
      userCtx.setHttpIndicator({ action: null });
      userCtx.setHttpIndicator({
        errorMessage: error.message ? error.message : "Something went wrong!",
      });
    }
  }, []);

  return fetchData;
};

export default useHttp;
