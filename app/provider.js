"use client";
import React, { createContext, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Header from "@/components/custom/Header";
import { MessagesContext } from "./context/MessagesContext";

export function MessagesProvider({ children }) {
  const [messages, setMessages] = useState([]);

  return (
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
  );
}

export default MessagesProvider;
