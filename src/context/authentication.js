import { useEffect } from "react";
import { createContext, useState } from "react";
import { isExpired, decodeToken } from "react-jwt";
import { getToken } from "../utilities/utilities";

export const authContext = createContext(null);

export const AuthProvider = ({ children }) => {
      const [token, setToken] = useState(localStorage.getItem("token"));
      const [user, setUser] = useState(null);
      console.log(getToken());
      const logout = () => {
            localStorage.removeItem("token");
            setToken(null);
            setUser(null);
      };

      const login = (data) => {
            setToken(data.payload.token);
            setUser(data.payload.user);
            localStorage.setItem("token", JSON.stringify(data.payload.token));

            // setTimeout(() => {
            //       logout();
            // }, data.payload.expiresAt * 1000 - Date.now());
      };

      useEffect(() => {
            if (token) {
                  const isMyTokenExpired = isExpired(token);
                  const user = decodeToken(token);

                  console.log(user.exp * 1000 - Date.now());
                  if (isMyTokenExpired) {
                        logout();
                  } else {
                        const id = setTimeout(() => {
                              logout();
                        }, user.exp * 1000 - Date.now());
                        return () => {
                              clearTimeout(id);
                        };
                  }
            }
      }, [token]);
      return (
            <authContext.Provider
                  value={{
                        token,
                        setToken,
                        setUser,
                        user,
                        login,
                        logout,
                  }}
            >
                  {children}
            </authContext.Provider>
      );
};
