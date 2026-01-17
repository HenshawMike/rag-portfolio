import AppSidebar from '@/components/layout/AppSidebar';
import ChatContainer from '@/components/chat/ChatContainer';
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background overflow-hidden">
        <AppSidebar />
        <SidebarInset className="flex flex-col flex-1 overflow-hidden">
          <header className="flex h-14 shrink-0 items-center px-4 md:px-6">
            <SidebarTrigger />
          </header>
          <main className="flex-1 overflow-hidden">
            <ChatContainer />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;
