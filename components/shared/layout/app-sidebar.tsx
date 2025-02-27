"use client"

import { Calendar, Home, Inbox, Search, Settings, Users, UserCog, ClipboardList } from "lucide-react"

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
import { LuLayoutGrid } from "react-icons/lu"
import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

// Menu items.
const items = [
  {
    title: "Employees",
    url: "/admin/employees",
    icon: Users,
  },
  {
    title: "Admins",
    url: "/admin/admins",
    icon: UserCog,
  },
  {
    title: "Orders",
    url: "/admin/orders",
    icon: ClipboardList,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  },
  {
    title: "Dashboard",
    url: "/admin",
    icon: "",
  }
]

export function AppSidebar() {
  const pathname = usePathname();
  const [selectedItem, setSelectedItem] = useState("");

  useEffect(() => {
    const matchedItem = items.find((item) => pathname == item.url);
    setSelectedItem(matchedItem ? matchedItem.title : "");
  }, [pathname]); // Re-run when pathname changes

  return (
    <Sidebar>
      <SidebarContent className="bg-[#060A87] text-white py-6 px-3 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <Image src={direLogo} alt="dire logo" width={185} />
        </div>
        <a href="/admin" className="w-full py-4 px-5 flex justify-between items-center rounded-[10px] font-bold bg-[#C7E7F6F5]">
          <div className="text-[#060A87] flex items-center justify-center">Dashboard</div>
          <LuLayoutGrid stroke="#060A87" size={24} />
        </a>
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                item.title !== "Dashboard" && <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className={cn("h-[50px] flex gap-2.5 p-0", selectedItem == item.title && "bg-[#030661] px-3")}>
                      <item.icon />
                      <span className="text-sm font-bold">{item.title}</span>
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
