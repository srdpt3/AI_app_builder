"use client";

import React from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import { useState } from "react";
import lookup from "@/data/lookup";
const CodeView = () => {
  const [activeTab, setActiveTab] = useState("code");
  const [files, setFiles] = useState(lookup.DEFAULT_FILE);
  return (
    <div className="col-span-1">
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
            <SandpackPreview style={{ height: "100vh" }} showNavigator={true} />
          )}
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
};

export default CodeView;
