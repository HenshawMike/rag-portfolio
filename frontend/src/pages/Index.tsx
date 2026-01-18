import AppSidebar from '@/components/layout/AppSidebar';
import ChatContainer from '@/components/chat/ChatContainer';
import { SidebarProvider, SidebarInset, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

const IndexContent = () => {
  const { open, isMobile } = useSidebar();

  return (
    <div className="flex min-h-screen w-full bg-background overflow-hidden">
      <AppSidebar />
      <SidebarInset className="flex flex-col flex-1 overflow-hidden">
        <header className="flex h-14 shrink-0 items-center px-4 md:px-6">
          {(!open || isMobile) && <SidebarTrigger />}
        </header>
        <main className="flex-1 overflow-hidden">
          <ChatContainer />
        </main>
      </SidebarInset>
    </div>
  );
};

const Index = () => {
  return (
    <SidebarProvider>
      <IndexContent />
    </SidebarProvider>
  );
};

export default Index;
