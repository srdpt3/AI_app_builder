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
export function AppSidebar() {
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
      </SidebarHeader>
      <SidebarContent className="p-5">
        <Button className="w-full">
          <Plus />
          Start New Chat
        </Button>
        <SidebarGroup>
          <WorkSpaceHistory />
        </SidebarGroup>
        <SidebarGroup>
          <WorkSpaceHistory />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
