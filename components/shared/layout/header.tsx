import { SidebarTrigger } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LuMenu } from "react-icons/lu"


function Header() {
  return (
    <div className="px-6 h-20 flex justify-between items-center bg-[#060A87] w-full">
      <SidebarTrigger />
      <div className="flex">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>                       
      </div>
    </div>
  )
}

export default Header