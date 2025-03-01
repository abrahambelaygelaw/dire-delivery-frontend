"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarMenu,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { Home, Search, Dices, Film, Tv } from 'lucide-react';
import plane from "@/public/Icons/plane.svg"
import { ClipboardList, Settings, UserCog, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { LuLayoutGrid } from 'react-icons/lu';
import SidebarToggle from './sidebar-toggle';

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
            className="fixed left-0 top-0 h-full z-60 border-r border-gray-800"
            style={{
                transition: 'width 0.2s',
                width: state === 'collapsed' ? '5rem' : '16rem',
            }}
        >
            <SidebarContent className="bg-[#060A87] text-white py-6 flex gap-6">
                <div className={cn("transition-all duration-300 ease-in-out hidden opacity-0 scale-90",
                    state !== "collapsed" && "scale-100 opacity-100 flex justify-between")}>
                    <div className="flex items-center gap-0">
                        <Image src={plane} alt="plane image" className="w-11 h-auto rotate-0 " />
                        <div className="font-extrabold text-2xl text-white">Dire <span className="text-red-600 ml-[-4px]">Express</span></div>
                    </div>
                    <div className='mr-4 flex items-center'>
                        <SidebarToggle reversed={false}/>
                    </div>

                </div>
                <div className={cn('flex mr-2', state !== 'collapsed' ? 'hidden': '')}>
                    <Image src={plane} alt="plane image" className={"w-11 mx-auto h-auto rotate-0"} />
                    <SidebarToggle reversed={true}/>
                </div>
                <a href="/admin" className={cn(" ml-5 mr-5 py-4 px-5 flex justify-between items-center rounded-[10px] font-bold bg-[#C7E7F6F5]", state == "collapsed" && "hidden")}>
                    <div className="text-[#060A87] flex items-center justify-center">Dashboard</div>
                    <LuLayoutGrid stroke="#060A87" size={24} />
                </a>
                <a href="/admin" className={cn(" ml-2 mr-2 py-4 px-5 flex justify-between items-center rounded-[10px] font-bold bg-[#C7E7F6F5]", state !== "collapsed" && "hidden")}>
                    <LuLayoutGrid stroke="#060A87" size={24} />
                </a>
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
                                <item.icon className={cn("h-6 w-6", state == "collapsed" && "mx-auto")} />
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