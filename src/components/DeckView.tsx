import React from 'react';
import { Plus } from 'lucide-react';
import { Card, Deck } from '../types';
import ManaSymbols from './ManaSymbols';
import CardList from './CardList';
import AddCardModal from './AddCardModal';

interface DeckViewProps {
  deck: Deck | null;
}

export default function DeckView({ deck }: DeckViewProps) {
  const [isAddCardModalOpen, setIsAddCardModalOpen] = React.useState(false);

  if (!deck) {
    return <div className="p-8">Select a deck to view its contents</div>;
  }

  const handleAddCard = (card: Card) => {
    // TODO: Implement add card functionality
    console.log('Adding card:', card);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">{deck.name}</h1>
          <ManaSymbols manaCost={deck.commander.mana_cost} />
        </div>
        <button
          onClick={() => setIsAddCardModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Card
        </button>
      </div>

      {deck.cards.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
          <p className="text-xl text-gray-600">No cards in this deck yet</p>
          <button
            onClick={() => setIsAddCardModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-6 h-6" />
            Add Your First Card
          </button>
        </div>
      ) : (
        <CardList cards={deck.cards} />
      )}

      <AddCardModal
        isOpen={isAddCardModalOpen}
        onClose={() => setIsAddCardModalOpen(false)}
        onAddCard={handleAddCard}
        colorIdentity={deck.commander.mana_cost}
      />
    </div>
  );
}