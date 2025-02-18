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
    const isAuthenticated = async () => {
      if (typeof window === "undefined") return false;

      try {
        const storedUser = localStorage.getItem("user");
        console.log("Stored user from localStorage:", storedUser);

        if (!storedUser) return false;

        const user = JSON.parse(storedUser);
        console.log("Parsed user:", user);

        if (!user?.email) return false;

        // fetch from database
        const result = await convex.query(api.users.GetUser, {
          email: user.email,
        });
        console.log("Database query result:", result);

        if (result) {
          setUserDetail(result);
          return true;
        }
        return false;
      } catch (error) {
        console.error("Authentication check failed:", error);
        return false;
      }
    };

    isAuthenticated();
  }, [convex]);

  console.log("Current userDetail state:", userDetail);

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
