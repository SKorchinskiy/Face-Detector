"use client";
import Cookies from "js-cookie";
import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { fetchData } from "../(nav_pages)/_utils/fetch.util";

export const UserContext = createContext({
  currentUser: null,
  isSignedIn: false,
  toggleAuthState: () => {},
});

export default function UserProvider({ children }: PropsWithChildren) {
  const [isSignedIn, setIsSignedIn] = useState(!!Cookies.get("Authentication"));
  const [currentUser, setCurrentUser] = useState<any>({});

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = await fetchData({
        url: "http://localhost:8000/users",
        options: { method: "GET" },
      });
      setCurrentUser(user);
    };

    if (!isSignedIn) Cookies.remove("Authentication");
    if (isSignedIn) fetchCurrentUser();
  }, [isSignedIn]);

  const toggleAuthState = () => setIsSignedIn(!isSignedIn);

  return (
    <UserContext.Provider value={{ isSignedIn, toggleAuthState, currentUser }}>
      {children}
    </UserContext.Provider>
  );
}
