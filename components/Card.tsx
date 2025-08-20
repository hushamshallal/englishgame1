
import React from 'react';
import { CardState } from '../types';

interface CardProps {
  card: CardState;
  onClick: (id: string) => void;
  isFlippingBack: boolean;
}

const Card: React.FC<CardProps> = React.memo(({ card, onClick, isFlippingBack }) => {
  const { id, text, isFlipped, isMatched } = card;

  const handleClick = () => {
    if (!isFlipped && !isMatched) {
      onClick(id);
    }
  };

  const cardBaseClasses = "relative w-full aspect-[3/2] rounded-lg shadow-md cursor-pointer transition-transform duration-500 flex items-center justify-center text-center p-2";
  const cardTransformStyle = { transformStyle: 'preserve-3d' as const };
  
  const frontClasses = `absolute w-full h-full bg-white dark:bg-slate-700 rounded-lg flex items-center justify-center backface-hidden`;
  const backClasses = `absolute w-full h-full bg-sky-500 dark:bg-sky-700 rounded-lg text-white font-bold text-lg md:text-xl flex items-center justify-center backface-hidden [transform:rotateY(180deg)]`;

  const cardInnerClasses = `relative w-full h-full transition-transform duration-500 ${isFlipped || isMatched ? '[transform:rotateY(180deg)]' : ''}`;
  const matchedClasses = isMatched ? 'opacity-50 scale-95 cursor-default' : '';
  const flippingBackClasses = isFlippingBack ? 'animate-shake' : '';

  return (
    <div className={`perspective-[1000px] ${matchedClasses}`} onClick={handleClick}>
      <div className={`${cardBaseClasses} ${flippingBackClasses}`} style={cardTransformStyle}>
        <div className={cardInnerClasses} style={cardTransformStyle}>
          <div className={frontClasses}>
            {/* Front is empty, just color */}
          </div>
          <div className={backClasses}>
            <span className={card.lang === 'en' ? 'font-mono' : 'font-serif'}>{text}</span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Card;
