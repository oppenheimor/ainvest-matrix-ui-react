import { useState, useCallback } from 'react';
import { AutoCompleteOption } from '../types';

interface UseKeyboardNavigationOptions {
  options: AutoCompleteOption[];
  isOpen: boolean;
  onSelect: (option: AutoCompleteOption) => void;
  onClose: () => void;
}

export function useKeyboardNavigation({
  options,
  isOpen,
  onSelect,
  onClose,
}: UseKeyboardNavigationOptions) {
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (!isOpen || options.length === 0) {
        return;
      }

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setActiveIndex(prev =>
            prev < options.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          event.preventDefault();
          setActiveIndex(prev =>
            prev > 0 ? prev - 1 : options.length - 1
          );
          break;
        case 'Enter':
          event.preventDefault();
          if (activeIndex >= 0 && activeIndex < options.length) {
            onSelect(options[activeIndex]);
          }
          break;
        case 'Escape':
          event.preventDefault();
          onClose();
          break;
      }
    },
    [isOpen, options, activeIndex, onSelect, onClose]
  );

  const resetActiveIndex = useCallback(() => {
    setActiveIndex(-1);
  }, []);

  return {
    activeIndex,
    setActiveIndex,
    handleKeyDown,
    resetActiveIndex,
  };
}