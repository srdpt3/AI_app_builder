import React, { useContext } from "react";
import { UserDetailContext } from "@/app/context/UserDetailContext";
import { useConvex } from "convex/react";
import { useEffect } from "react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import Link from "next/link";
const WorkSpaceHistory = () => {
  const { userDetail } = useContext(UserDetailContext);
  const convex = useConvex();
  const [workspaceHistory, setWorkspaceHistory] = useState([]);
  useEffect(() => {
    if (userDetail) {
      GetAllWorkspaceHistory();
    }
  }, [userDetail]);

  const GetAllWorkspaceHistory = async () => {
    console.log("GetAllWorkspaceHistory triggered, userDetail:", userDetail);
    const data = await convex.query(api.workspace.GetAllWorkspaceHistory, {
      userId: userDetail?._id,
    });
    console.log(data);
    setWorkspaceHistory(data);
    return data;
  };

  return (
    <div>
      <h2 className="text-lg font-bold">WorkSpace History</h2>
      <div className="flex flex-col gap-2">
        {workspaceHistory?.map((workspace, index) => (
          <Link href={`/workspace/${workspace?._id}`} key={index}>
            <h2 className="text-sm text-gray-500 mt-2 font-bold" key={index}>
              {workspace?.message[0]?.content}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default WorkSpaceHistory;
