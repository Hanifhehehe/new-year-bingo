interface GoalChipProps {
  title: string;
  onRemove?: () => void;
  onAdd?: () => void;
  type: 'user' | 'suggestion';
}

export function GoalChip({ title, onRemove, onAdd, type }: GoalChipProps) {
  const handleClick = () => {
    if (type === 'user' && onRemove) {
      onRemove();
    } else if (type === 'suggestion' && onAdd) {
      onAdd();
    }
  };

  return (
    <button 
      onClick={handleClick}
      className={`
        inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium
        ${type === 'user' 
          ? 'bg-[#7BDFF2] text-white' 
          : 'bg-[#B2F7EF] text-white opacity-75 hover:opacity-100'
        }
        transition-all duration-300 m-1
      `}
    >
      <span className="truncate max-w-[150px]">{title}</span>
      {type === 'user' && (
        <span className="hover:text-[#F2B5D4] transition-colors">×</span>
      )}
      {type === 'suggestion' && (
        <span className="hover:text-[#F2B5D4] transition-colors">+</span>
      )}
    </button>
  );
}

