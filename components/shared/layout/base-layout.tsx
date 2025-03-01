import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "./header";
import { AppSidebar } from "./app-sidebar";
import SidebarLayout from "./sidebar-layout";

export default function BaseLayout({ children }: BaseLayoutProps) {
    return (
        <SidebarProvider>
            {/* <AppSidebar /> */}
            <SidebarLayout/>
            <div className="flex flex-col w-full">
                <Header></Header>
                {children}
            </div>
        </SidebarProvider>
    );
}
