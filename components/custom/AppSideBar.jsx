import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import WorkSpaceHistory from "./WorkSpaceHistory";
import { UserDetailContext } from "@/app/context/UserDetailContext";
import { useContext } from "react";
import SideBarFooter from "./SideBarFooter";
export function AppSidebar() {
  const { userDetail } = useContext(UserDetailContext);
  // Remove or comment out debug log
  // console.log(userDetail);
  return (
    <Sidebar>
      <SidebarHeader className="p-5">
        <Image
          src="/logo.jpeg"
          alt="Logo"
          width={40}
          height={40}
          priority
          className="rounded-full object-cover"
        />{" "}
        <Button className="w-full mt-5">
          <Plus />
          Start New Chat
        </Button>
      </SidebarHeader>
      <SidebarContent className="p-5">
        {/* <SidebarGroup> */}
        <WorkSpaceHistory userDetail={userDetail} />
        {/* </SidebarGroup> */}
      </SidebarContent>
      <SidebarFooter>
        <SideBarFooter />
      </SidebarFooter>
    </Sidebar>
  );
}
