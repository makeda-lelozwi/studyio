"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getToken, setUserDataToCookies } from "@/helper";
import { login, signup, getUserData, logout } from "../api/auth";
import { AuthContextType, User } from "@/types";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  //gets jwt set to cookies (in helper.tsx)
  const authToken = getToken();

  //check if user already logged in
  useEffect(() => {
    if (authToken) {
      fetchUserData(authToken);
    }
  }, [authToken]);

  const fetchUserData = async (token: string) => {
    setIsLoading(true);

    //calls strapi's user api to get the existing user (in auth.tsx)
    const userData = await getUserData(token);

    if (userData) {
      //used by front end
      setUser(userData);
    } else {
      setUser(null);
    }
    setIsLoading(false);
    return;
  };

  const handleLogin = async (identifier: string, password: string) => {
    const authData = await login(identifier, password);

    if (authData?.user) {
      setUserDataToCookies(authData);
      setUser(authData.user); //what happens if we comment this out?
    }
  };

  const handleSignup = async (
    username: string,
    email: string,
    password: string
  ) => {
    const authData = await signup(username, email, password);

    if (authData?.user) {
      setUserDataToCookies(authData);
      setUser(authData?.user); //and this?
    }
  };

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading: isLoading,
        login: handleLogin,
        signup: handleSignup,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
