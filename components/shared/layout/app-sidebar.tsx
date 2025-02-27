"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar"
import Image from "next/image"

import { cn } from "@/lib/utils"
import direLogo from "@/public/dire-logo.svg"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { GrCircleQuestion } from "react-icons/gr"
import { LuLayoutGrid } from "react-icons/lu"
import { menuItems } from "@/data/layout"

export function AppSidebar() {
  const pathname = usePathname();
  const [selectedItem, setSelectedItem] = useState("");

  useEffect(() => {
    const matchedItem = menuItems.find((item) => pathname == item.url);
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
              {menuItems.map((item) => (
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
        <a href="/admin/help-center" className="flex mt-auto items-center gap-2.5">
          <GrCircleQuestion stroke="#A0AEC0" size={20}/>
          <div className="font-bold text-sm">Help Center</div>
        </a>
      </SidebarContent>
    </Sidebar>
  )
}
