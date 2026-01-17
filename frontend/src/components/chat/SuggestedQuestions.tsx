import { Plus } from 'lucide-react';

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
  disabled?: boolean;
}

const suggestions = [
  "What's your tech stack?",
  "Tell me about your projects",
  "What's your experience?",
  "How can I contact you?",
];

const SuggestedQuestions = ({ onSelect, disabled = false }: SuggestedQuestionsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-2xl mx-auto">
      {suggestions.map((question) => (
        <button
          key={question}
          onClick={() => onSelect(question)}
          disabled={disabled}
          className="px-4 py-3 text-sm text-left rounded-xl border border-border bg-secondary/30 text-foreground/80 hover:bg-secondary/50 hover:text-foreground transition-all disabled:opacity-50 disabled:cursor-not-allowed group flex items-center justify-between"
        >
          <span>{question}</span>
          <Plus className="w-4 h-4 opacity-0 group-hover:opacity-50 transition-opacity" />
        </button>
      ))}
    </div>
  );
};

export default SuggestedQuestions;
