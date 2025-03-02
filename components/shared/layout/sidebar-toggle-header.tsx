"use client"

import { Button } from '../custom-shadcn/custom-button-sidebar';
import { Menu } from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';
import { LuChevronLeft, LuMenu } from 'react-icons/lu';
import { cn } from '@/lib/utils';

  
  const SidebarToggleHeader = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <Button className='flex gap-0' variant="ghost" size="icon" onClick={toggleSidebar}>
      <LuMenu stroke='white' className='w-7 h-auto'/>
    </Button>
  );
};

export default SidebarToggleHeader;