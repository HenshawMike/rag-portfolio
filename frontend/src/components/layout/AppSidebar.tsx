import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    useSidebar,
} from "@/components/ui/sidebar";
import { Github, Linkedin, Mail, MessageCircle, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AppSidebar = () => {
    const { toggleSidebar } = useSidebar();
    const socials = [
        { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/michael-henshaw-85579a30a', color: 'text-blue-400' },
        { name: 'GitHub', icon: Github, url: 'https://github.com/HenshawMike', color: 'text-foreground' },
        { name: 'Email', icon: Mail, url: 'mailto:mikelhenshaw11@gmail.com', color: 'text-red-400' },
        { name: 'WhatsApp', icon: MessageCircle, url: 'https://wa.me/2348034469134', color: 'text-green-400' },
    ];

    return (
        <Sidebar className="border-r border-border">
            <SidebarHeader className="p-4">
                <div className="flex items-center justify-between px-2 py-2">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center">
                            <img
                                src="/images/Henshaw_Michael.jpeg"
                                alt="Mike"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <span className="font-semibold text-lg">Mike Portfolio</span>
                    </div>
                    <button
                        onClick={toggleSidebar}
                        className="p-1.5 hover:bg-secondary rounded-md text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Close Sidebar"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Connect
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {socials.map((social) => (
                                <SidebarMenuItem key={social.name}>
                                    <SidebarMenuButton
                                        asChild
                                        className="px-4 py-2 hover:bg-secondary/50 rounded-lg group text-muted-foreground hover:text-foreground"
                                    >
                                        <a href={social.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                            <social.icon className={`w-4 h-4 mr-3 opacity-70 group-hover:opacity-100 ${social.color}`} />
                                            <span className="truncate">{social.name}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="p-4 border-t border-border">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className="w-full rounded-lg p-2 flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="/images/Henshaw_Michael.jpeg" />
                                <AvatarFallback className="bg-primary/10 text-primary">M</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 text-left">
                                <p className="text-sm font-medium text-foreground">Mike</p>
                                <p className="text-xs text-muted-foreground">AI Engineer</p>
                            </div>
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
};

export default AppSidebar;
