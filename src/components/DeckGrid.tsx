import React from 'react';
import { Plus } from 'lucide-react';
import type { Deck } from '../types';

interface DeckGridProps {
  decks: Deck[];
  onAddDeck: () => void;
  onSelectDeck: (deck: Deck) => void;
}

export default function DeckGrid({ decks, onAddDeck, onSelectDeck }: DeckGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <button
        onClick={onAddDeck}
        className="h-64 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-4 hover:border-gray-400 transition-colors"
      >
        <Plus className="w-12 h-12 text-gray-400" />
        <span className="text-gray-600 font-medium">Add New Deck</span>
      </button>

      {decks.map((deck) => (
        <div
          key={deck.id}
          onClick={() => onSelectDeck(deck)}
          className="h-64 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer relative group"
        >
          <img
            src={deck.commander.image_uris?.art_crop}
            alt={deck.commander.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
            <h3 className="text-xl font-bold text-white">{deck.name}</h3>
            <p className="text-gray-300">{deck.commander.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}