import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatMessageProps {
  content: string;
  isUser: boolean;
  isNew?: boolean;
}

const ChatMessage = ({ content, isUser, isNew = false }: ChatMessageProps) => {
  return (
    <div
      className={`group flex items-start gap-4 md:gap-6 py-6 ${isNew ? 'animate-message-in' : ''
        }`}
    >
      <div className="flex-shrink-0 pt-1">
        {isUser ? (
          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
            <User className="w-5 h-5 text-foreground" />
          </div>
        ) : (
          <Avatar className="h-8 w-8">
            <AvatarImage src="/images/Henshaw_Michael.jpeg" />
            <AvatarFallback className="bg-primary/10 text-primary">M</AvatarFallback>
          </Avatar>
        )}
      </div>

      <div className="flex-1 space-y-2">
        <p className="text-xs font-semibold text-foreground/50 uppercase tracking-tight">
          {isUser ? 'You' : 'Mike AI'}
        </p>
        <div className="max-w-none break-words">
          {isUser ? (
            <p className="text-sm md:text-base leading-relaxed text-foreground">{content}</p>
          ) : (
            <div className="prose-chat text-foreground/90 leading-relaxed md:text-base">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  a: ({ node, ...props }) => (
                    <a
                      {...props}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline underline-offset-4 transition-colors"
                    />
                  )
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
