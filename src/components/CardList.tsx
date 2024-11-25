import React from 'react';
import { Card } from '../types';

interface CardListProps {
  cards: Card[];
}

export default function CardList({ cards }: CardListProps) {
  const sortedCards = [...cards].sort((a, b) => {
    const getCMC = (card: Card) => {
      const matches = card.mana_cost.match(/{[^}]+}/g) || [];
      return matches.reduce((total, symbol) => {
        const value = parseInt(symbol.replace(/[^0-9]/g, '')) || 1;
        return total + value;
      }, 0);
    };
    return getCMC(a) - getCMC(b);
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {sortedCards.map((card) => (
        <div
          key={card.id}
          className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
        >
          <img
            src={card.image_uris?.normal}
            alt={card.name}
            className="w-full h-auto"
            loading="lazy"
          />
          <div className="p-2 bg-white">
            <h3 className="font-medium text-sm">{card.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}