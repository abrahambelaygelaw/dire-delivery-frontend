import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"

import direLogo from "@/public/dire-logo.svg"
import { LuChevronLeft, LuLayoutGrid } from "react-icons/lu"
import Link from "next/link"

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="bg-[#060A87] text-white py-6 px-3 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <Image src={direLogo} alt="dire logo" width={185}></Image>
        </div>
        <Link href="/admin" className="w-full py-4 px-5 flex justify-between items-center rounded-[10px] font-bold bg-[#C7E7F6F5]">
          <div className="text-[#060A87] flex items-center justify-center">Dashboard</div>
          <LuLayoutGrid stroke="#060A87" size={24}/>
        </Link>
        <SidebarGroup>
          <SidebarGroupLabel className="text-white">Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
