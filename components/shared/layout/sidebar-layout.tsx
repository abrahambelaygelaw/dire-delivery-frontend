"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarMenu,
    SidebarMenuItem,
    useSidebar,
  } from '@/components/ui/sidebar';
  import { Home, Search, Dices, Film, Tv} from 'lucide-react';
  import plane from "@/public/Icons/plane.svg"
  import { ClipboardList, Settings, UserCog, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
  
  export default function SidebarLayout() {
    const { state } = useSidebar();
    const menuItems = [
        {
          title: 'Employees',
          url: '/admin/employees',
          icon: Users,
        },
        {
          title: 'Admins',
          url: '/admin/admins',
          icon: UserCog,
        },
        {
          title: 'Orders',
          url: '/admin/orders',
          icon: ClipboardList,
        },
        {
          title: 'Settings',
          url: '/admin/settings',
          icon: Settings,
        },
      ];

        const pathname = usePathname();
        const [selectedItem, setSelectedItem] = useState("");
      
        useEffect(() => {
          const matchedItem = menuItems.find((item) => pathname == item.url);
          setSelectedItem(matchedItem ? matchedItem.title : "");
        }, [pathname]); // Re-run when pathname changes
  
    return (
      <Sidebar
        collapsible="icon"
        className="fixed left-0 top-0 h-full pt-[68px] z-60 border-r border-gray-800"
        style={{
          transition: 'width 0.2s',
          width: state === 'collapsed' ? '3rem' : '16rem',
        }}
      >
        <SidebarContent className="bg-[#060A87] text-white py-6">
          <SidebarMenu className="gap-0 p-0 m-0">
            {menuItems.map((item, index) => (
              <SidebarMenuItem key={index}>
                <Link
                  href={item.url}
                  className={cn(`flex items-center justify-start gap-3 p-3 transition duration-300 ease-in-out`, 
                    selectedItem == item.title
                        ? 'bg-gray-800 text-white'
                        : 'hover:bg-gray-200 hover:text-gray-900')}
                >
                  <item.icon className="h-6 w-6" />
                  {state === 'expanded' && (
                    <div className="font-semibold">{item.title}</div>
                  )}
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-4">
          {state === 'expanded' ? (
            <p className="text-sm text-gray-500">© 2024 CineAtlas</p>
          ) : (
            <img src={plane} alt="logo" className="h-6 w-6" />
          )}
        </SidebarFooter>
      </Sidebar>
    );
  }