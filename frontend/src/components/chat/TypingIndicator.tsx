import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TypingIndicator = () => {
  return (
    <div className="flex gap-4 md:gap-6 py-6 animate-message-in">
      <div className="flex-shrink-0 pt-1">
        <Avatar className="h-8 w-8">
          <AvatarImage src="/images/Henshaw_Michael.jpeg" />
          <AvatarFallback className="bg-primary/10 text-primary">M</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex-1 space-y-2">
        <p className="text-xs font-semibold text-foreground/50 uppercase tracking-tight">
          Mike AI
        </p>
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-typing-dot" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-typing-dot" style={{ animationDelay: '150ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-typing-dot" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
