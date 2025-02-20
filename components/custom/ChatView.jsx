"use client";
import { useQuery } from "convex/react";
import React, { useEffect, useContext } from "react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { useConvex } from "convex/react";
import { MessagesContext } from "@/app/context/MessagesContext";
import { UserDetailContext } from "@/app/context/UserDetailContext";
import Image from "next/image";
import colors from "@/data/colors";

const ChatView = () => {
  const { id } = useParams();
  const convex = useConvex();
  const { messages, setMessages } = useContext(MessagesContext);
  const { userDetail } = useContext(UserDetailContext);

  useEffect(() => {
    id && GetWorkspaceData();
  }, [id]);

  const GetWorkspaceData = async () => {
    const workspace = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id,
    });
    setMessages(workspace?.message || []);
    console.log(workspace);
  };

  const messageList = Array.isArray(messages) ? messages : [];

  return (
    <div>
      {messageList.map((msg, index) => (
        <div
          key={index}
          className="p-3 rounded-lg flex items-start gap-2 mb-2"
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
          <h2>{msg.content}</h2>
        </div>
      ))}
    </div>
  );
};

export default ChatView;
