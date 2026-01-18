import { useState, useRef, useEffect } from 'react';
import { Square } from 'lucide-react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import SuggestedQuestions from './SuggestedQuestions';
import TypingIndicator from './TypingIndicator';
import { ApiClient } from '@/services/apiClient';
import { Message } from '@/types/chat';
import { Button } from '@/components/ui/button';

const WELCOME_MESSAGE = `Hey! I'm Mike's AI assistant. I can tell you all about his experience, projects, skills, and more. What would you like to know?`;

const ChatContainer = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      content: WELCOME_MESSAGE,
      isUser: false,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [abortController, setAbortController] = useState<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (content: string) => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content,
      isUser: true,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    const controller = new AbortController();
    setAbortController(controller);

    try {
      const data = await ApiClient.askQuestion(content, controller.signal);

      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        content: data.answer,
        isUser: false,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        // Chat aborted by user
      } else {
        setError(err instanceof Error ? err.message : 'Unable to connect to the API. Please try again later.');
      }
    } finally {
      setIsLoading(false);
      setAbortController(null);
    }
  };

  const handleStop = () => {
    if (abortController) {
      abortController.abort();
      setIsLoading(false);
      setAbortController(null);
    }
  };

  const handleSuggestionClick = (question: string) => {
    sendMessage(question);
  };

  return (
    <div className="flex flex-col h-full bg-background relative">
      {/* Messages area */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto scrollbar-thin"
      >
        <div className="max-w-3xl mx-auto px-4 py-8 md:py-12 space-y-6">
          {messages.map((message, index) => (
            <ChatMessage
              key={message.id}
              content={message.content}
              isUser={message.isUser}
              isNew={index === messages.length - 1}
            />
          ))}

          {isLoading && (
            <div className="space-y-4">
              <TypingIndicator />
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleStop}
                  className="flex items-center gap-2 text-xs h-8"
                >
                  <Square className="w-3 h-3 fill-current" />
                  Stop generating
                </Button>
              </div>
            </div>
          )}

          {error && (
            <div className="flex justify-center animate-message-in">
              <div className="bg-destructive/10 text-destructive px-4 py-2 rounded-lg text-sm">
                {error}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Suggestions - only show if just welcome message */}
      <div className="max-w-3xl mx-auto w-full">
        {messages.length === 1 && !isLoading && (
          <div className="px-4 pb-4">
            <SuggestedQuestions onSelect={handleSuggestionClick} disabled={isLoading} />
          </div>
        )}
      </div>

      {/* Input area - Floating and centered */}
      <div className="w-full">
        <div className="max-w-3xl mx-auto p-4 md:p-6 w-full">
          <ChatInput onSend={sendMessage} disabled={isLoading} />
          <p className="text-[10px] text-center text-muted-foreground mt-3">
            Mike AI can make mistakes. Check important info.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
