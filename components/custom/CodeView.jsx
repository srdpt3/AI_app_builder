"use client";

import React from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import { generateAICode } from "@/app/configs/AiModel";
import { useState, useContext, useEffect } from "react";
import lookup from "@/data/lookup";
import prompts from "@/data/prompts";
import { MessagesContext } from "@/app/context/MessagesContext";
import { updateFiles } from "@/convex/workspace";
import { useMutation } from "convex/react";
import axios from "axios";
import { useParams } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import { Loader2 } from "lucide-react";
const CodeView = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("code");
  const [files, setFiles] = useState(lookup.DEFAULT_FILE);
  const { messages, setMessages } = useContext(MessagesContext);
  const updateFiles = useMutation(api.workspace.updateFiles);
  const convex = useConvex();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    id && getFiles();
  }, [id]);

  const getFiles = async () => {
    setLoading(true);
    const workspace = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id,
    });
    const mergedFiles = { ...lookup.DEFAULT_FILE, ...workspace?.fileData };
    setFiles(mergedFiles);
    setLoading(false);
  };

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages?.length - 1]?.role;
      if (role === "user") {
        handleGenerateCode();
      }
    }
    //
  }, [messages]);
  const handleGenerateCode = async () => {
    setLoading(true);
    console.log(messages[messages?.length - 1]?.content);
    const prompt = JSON.stringify(messages) + " " + prompts.CODE_GEN_PROMPT;

    try {
      const response = await fetch("/api/gen-ai-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      console.log("API response:", data);

      let result = data.result;
      if (typeof result === "string") {
        try {
          result = JSON.parse(result);
        } catch (e) {
          console.error("Failed to parse result as JSON:", e);
          result = {
            files: {
              "main.js": {
                content: result,
              },
            },
          };
        }
      }

      const newFiles = { ...lookup.DEFAULT_FILE, ...data?.files };

      if (result && result.files) {
        Object.keys(result.files).forEach((key) => {
          newFiles[key] = result.files[key];
        });
      } else if (result) {
        newFiles["result.js"] = { content: JSON.stringify(result, null, 2) };
      }

      console.log("Updated files:", newFiles);
      setFiles(newFiles);
      await updateFiles({
        workspaceId: id,
        files: data?.files,
      });
      setLoading(false);
    } catch (error) {
      console.error("Error generating code:", error);
      // Optionally add user feedback here
    }
  };

  return (
    <div className="col-span-1 relative">
      <div
        className={`${loading ? "blur-sm transition-all duration-300" : ""}`}
      >
        <div className="bg-[#181818] w-full p-2 border">
          <div className="flex items-center justify-between flex-wrap shrink-0 rounded-full bg-black p-1 w-[140px] gap-2">
            <div className="flex gap-2 items-center">
              <h2
                onClick={() => setActiveTab("code")}
                className={`text-sm cursor-pointer flex items-center justify-center h-8 ${
                  activeTab === "code"
                    ? "text-blue-500 bg-blue-500 bg-opacity-25 p-1 px-2 rounded-full"
                    : "text-gray-400 p-1 px-2"
                }`}
              >
                Code
              </h2>
              <h2
                onClick={() => setActiveTab("preview")}
                className={`text-sm cursor-pointer flex items-center justify-center h-8 ${
                  activeTab === "preview"
                    ? "text-blue-500 bg-blue-500 bg-opacity-25 p-1 px-2 rounded-full"
                    : "text-gray-400 p-1 px-2"
                }`}
              >
                Preview
              </h2>
            </div>
          </div>
        </div>
        <SandpackProvider
          template="react"
          theme="dark"
          files={files}
          customSetup={{
            dependencies: {
              ...lookup.DEPENDANCY,
            },
          }}
          options={{
            externalResources: ["https://cdn.tailwindcss.com"],
          }}
        >
          <SandpackLayout className="h-[calc(100vh-200px)]">
            {activeTab === "code" ? (
              <>
                <SandpackFileExplorer style={{ height: "80vh" }} />
                <SandpackCodeEditor style={{ height: "80vh" }} />
              </>
            ) : (
              <SandpackPreview
                style={{ height: "100vh" }}
                showNavigator={true}
              />
            )}
          </SandpackLayout>
        </SandpackProvider>
      </div>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-10 flex-col gap-2 bg-black/10">
          <Loader2 className="w-10 h-10 animate-spin" />
          <h2 className="text-white text-sm">Generating code...</h2>
        </div>
      )}
    </div>
  );
};

export default CodeView;
