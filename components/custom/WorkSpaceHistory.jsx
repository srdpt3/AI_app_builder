import React, { useContext } from "react";
import { getWorkspaceHistory } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { UserDetailContext } from "@/app/context/UserDetailContext";
import { useConvex } from "convex/react";
import { useEffect } from "react";
import { api } from "@/convex/_generated/api";
const WorkSpaceHistory = () => {
  const { userDetail } = useContext(UserDetailContext);
  const convex = useConvex();

  const GetAllWorkspaceHistory = async () => {
    const data = await convex.query(api.workspace.getWorkspaceHistory, {
      userId: "j972ab3681ekrhp86wtatpv5j17axrk5",
    });
    console.log(data);
    return data;
  };

  useEffect(() => {
    userDetail && GetAllWorkspaceHistory();
  }, [userDetail]);

  return (
    <div>
      <h2 className="text-lg font-bold">WorkSpace History</h2>
      {/* {data?.map((workspace) => (
        <div key={workspace._id}>{workspace.name}</div>
      ))} */}
    </div>
  );
};

export default WorkSpaceHistory;
