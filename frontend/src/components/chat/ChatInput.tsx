import { useState, KeyboardEvent, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const ChatInput = ({ onSend, disabled = false }: ChatInputProps) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Small delay to ensure the browser has updated the DOM if needed, 
      // but usually not necessary in React unless there's layout churn
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [input]);

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative flex items-end gap-2 bg-secondary/50 backdrop-blur-sm border border-border rounded-2xl p-2 shadow-sm focus-within:ring-1 focus-within:ring-primary/20 transition-all">
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Message Mike AI..."
        disabled={disabled}
        rows={1}
        className="flex-1 resize-none bg-transparent border-none rounded-xl px-3 py-2 text-sm md:text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0 transition-all disabled:opacity-50 overflow-y-auto scrollbar-thin"
        style={{ minHeight: '44px', maxHeight: '200px' }}
      />
      <Button
        onClick={handleSend}
        disabled={disabled || !input.trim()}
        size="icon"
        className="h-10 w-10 shrink-0 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground transition-all disabled:opacity-20 flex items-center justify-center mb-0.5"
      >
        <Send className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default ChatInput;
