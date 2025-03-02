import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "./header";
import { AppSidebar } from "./app-sidebar";
import SidebarLayout from "./sidebar-layout";

export default function BaseLayout({ children }: BaseLayoutProps) {
    return (
        <SidebarProvider>
            <div className="flex">
                <SidebarLayout />
                <div className="flex flex-col">
                    <Header></Header>
                    {children}
                </div>
            </div>
        </SidebarProvider>
    );
}
