"use client";
import lookup from "@/data/lookup";
import colors from "@/data/colors";
import { ArrowRight, Link2 } from "lucide-react";
import React, { useState, useContext } from "react";
import { MessagesContext } from "@/app/context/MessagesContext";
import { UserDetailContext } from "@/app/context/UserDetailContext";
import SignInDialog from "./SignInDialog";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
const Hero = () => {
  const [userInput, setUserInput] = useState();
  const { messages, setMessages } = useContext(MessagesContext);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [openDialog, setOpenDialog] = useState(false);
  const createWorkspace = useMutation(api.workspace.createWorkspace);

  const router = useRouter();
  const onGenerate = async (input) => {
    if (!userDetail?.name) {
      console.log("userDetail " + userDetail);

      console.log("userDetail._id" + userDetail._id);

      setOpenDialog(true);
      return;
    }
    const message = { role: "user", content: input };
    console.log("message" + message);

    setMessages(message);

    const workspaceId = await createWorkspace({
      user: userDetail._id,
      message: [message],
    });
    console.log(userDetail);
    console.log("workspaceId" + workspaceId);
    router.push(`/workspace/${workspaceId}`);
  };
  return (
    <div className="flex flex-col items-center justify-center mt-36 xl:mt-42 gap-2">
      <h2 className="text-4xl md:text-6xl font-bold mb-8">
        {lookup.HERO_HEADING}
      </h2>
      <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto font-medium">
        {lookup.HERO_DESC}
      </p>
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
      <div className="flex flex-wrap mt-8 max-w-2xl items-center justify-center gap-3 ">
        {lookup?.SUGGSTIONS?.map((item, index) => (
          <h2
            key={index}
            onClick={() => onGenerate(item)}
            className="p-1 px-2 border   rounded-full text-sm text-gray-400 hover:bg-gray-100 cursor-pointer"
          >
            {item}
          </h2>
        ))}
      </div>
      <SignInDialog
        openDialog={openDialog}
        closeDialog={(v) => setOpenDialog(v)}
      />
      {/* <div className="relative h-[600px] mb-20">
          <Image
            src="/dashboard-preview.png"
            alt="Bolt Dashboard Preview"
            fill
            className="object-contain"
            priority
          />
        </div> */}
    </div>
  );
};

export default Hero;
