"use client";
import React, { createContext, useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Header from "@/components/custom/Header";
import { MessagesContext } from "./context/MessagesContext";
import { UserDetailContext } from "./context/UserDetailContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
// 2. 단일 Provider 컴포넌트
export function Provider({ children }) {
  const [userDetail, setUserDetail] = useState(null);
  const [messages, setMessages] = useState([]);
  const convex = useConvex();
  useEffect(() => {
    IsAuthenticatd();
  }, []);
  const IsAuthenticatd = async () => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user"));
      //fetch from database
      const result = await convex.query(api.users.GetUser, {
        email: user.email,
      });
      console.log(IsAuthenticatd + " " + result);
      if (result) {
        return true;
      }
    }
    return false;
  };

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
        <MessagesContext.Provider value={{ messages, setMessages }}>
          <NextThemesProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
          </NextThemesProvider>
        </MessagesContext.Provider>
      </UserDetailContext.Provider>
    </GoogleOAuthProvider>
  );
}

export default Provider;
