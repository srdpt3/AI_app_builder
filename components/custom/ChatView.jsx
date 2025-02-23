"use client";
import { useQuery } from "convex/react";
import React, { useEffect, useContext, useRef } from "react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { useConvex } from "convex/react";
import { MessagesContext } from "@/app/context/MessagesContext";
import { UserDetailContext } from "@/app/context/UserDetailContext";
import Image from "next/image";
import colors from "@/data/colors";
import { ArrowRight, Link2, Loader2Icon } from "lucide-react";
import { useState } from "react";
import lookup from "@/data/lookup";
import axios from "axios";
import Prompt from "@/data/prompt";
import { useMutation } from "convex/react";
import ReactMarkdown from "react-markdown";

const ChatView = () => {
  const { id } = useParams();
  const convex = useConvex();
  const { messages, setMessages } = useContext(MessagesContext);
  const { userDetail } = useContext(UserDetailContext);
  const updateMessage = useMutation(api.workspace.updateMessage);
  const [userInput, setUserInput] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const messageEndRef = useRef(null);

  useEffect(() => {
    id && GetWorkspaceData();
  }, [id]);

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages?.length - 1]?.role;
      if (role === "user") {
        GetAIResponse();
      }
    }
    //
  }, [messages]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const GetWorkspaceData = async () => {
    const workspace = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id,
    });
    setMessages(workspace?.message || []);
    console.log(messages);
  };

  const GetAIResponse = async () => {
    setIsLoading(true);
    const promptData = JSON.stringify(messages) + Prompt.DEFAULT_PROMPT;
    console.log(promptData);
    const result = await axios.post("/api/ai-chat", {
      prompt: promptData,
    });
    console.log(result.data.result);
    const aiResponse = {
      role: "assistant",
      content: result.data.result,
    };
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: result.data.result },
    ]);
    await updateMessage({
      workspaceId: id,
      message: [...messages, aiResponse],
    });
    setIsLoading(false);
  };

  const onGenerate = async () => {
    setMessages((prev) => [...prev, { role: "user", content: userInput }]);
    setUserInput("");
  };

  const messageList = Array.isArray(messages) ? messages : [];

  return (
    <div className="relative h-[85vh] flex flex-col">
      <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]">
        {messageList.map((msg, index) => (
          <div
            key={index}
            className="p-3 rounded-lg flex items-start gap-2 mb-2 leading-7"
            style={{
              backgroundColor: colors.CHAT_BACKGROUND,
            }}
          >
            {msg?.role === "user" && userDetail?.image && (
              <Image
                src={userDetail.image}
                alt="user"
                width={35}
                height={35}
                className="rounded-full"
                unoptimized
              />
            )}
            <div className="markdown-content">
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          </div>
        ))}
        {isLoading && (
          <div
            className="p-3 rounded-lg flex items-start gap-2 mb-2"
            style={{
              backgroundColor: colors.CHAT_BACKGROUND,
            }}
          >
            <h2>Generating repsonse...</h2>
            <Loader2Icon className="animate-spin" />
          </div>
        )}
        <div ref={messageEndRef} />
      </div>
      {/* Input Section */}
      <div
        className="p-5 border border-gray-200 rounded-3xl max-w-xl w-full mt-3"
        style={{
          backgroundColor: colors.BACKGROUND,
        }}
      >
        <div className="flex gap-2">
          <textarea
            placeholder={lookup.INPUT_PLACEHOLDER}
            onChange={(e) => setUserInput(e.target.value)}
            className="outline-none border-none bg-transparent w-full  h-32 resize-none"
            value={userInput}
          />
          {userInput && (
            <ArrowRight
              onClick={() => onGenerate(userInput)}
              className="bg-blue-500 text-white p-2 h-10 w-10 rounded-md cursor-pointer"
            />
          )}
        </div>
        <div>
          <Link2 className="text-blue-500 h-5 w-5 font-medium"></Link2>
        </div>
      </div>
    </div>
  );
};

export default ChatView;
