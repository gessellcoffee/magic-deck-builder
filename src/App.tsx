import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import DeckGrid from './components/DeckGrid';
import DeckView from './components/DeckView';
import CommanderModal from './components/CommanderModal';
import { guildCombos, shardCombos, nephilimCombos, type ColorCombo } from './data/colorCombos';
import type { Deck, Card } from './types';

import './App.css';
import { IDeck } from './models/IDeck.ts';
import { saveDeckToStorage, loadDeckFromStorage } from './utils/localStorage.ts';

function App() {
  const [selectedCombo, setSelectedCombo] = useState(guildCombos[0].nickname);
  const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null);
  const [isCommanderModalOpen, setIsCommanderModalOpen] = useState(false);

  const currentColorCombo = [...guildCombos, ...shardCombos, ...nephilimCombos].find(
    (combo) => combo.nickname === selectedCombo
  );

  const handleAddDeck = () => {
    setIsCommanderModalOpen(true);
  };

  const handleCommanderSelect = (commander: Card) => {
    const newDeck: Deck = {
      id: crypto.randomUUID(),
      name: `${commander.name} Deck`,
      commander,
      cards: [],
    };

    setDecks([...decks, newDeck]);
    setIsCommanderModalOpen(false);
  };

  const [currentView, setCurrentView] = useState('DeckGrid'); // Add state for view
  const [editingDeck, setEditingDeck] = useHashParam<IDeck | undefined>('deck', undefined);
  const [decks, setDecks] = useState<IDeck[]>(loadDeckFromStorage());

  useEffect(() => {
    saveDeckToStorage(decks);
  }, [decks]);

  const handleDeckSave = (deck: IDeck) => {
    if (editingDeck) {
      setDecks(decks.map((d) => (d.id === deck.id ? deck : d)));
    } else {
      setDecks([...decks, deck]);
    }
    setEditingDeck(deck);
    setCurrentView('DeckView'); // Switch to DeckView after saving
  };

  const handleGoBack = () => {
    setCurrentView('DeckGrid'); // Function to go back to DeckGrid
  };

  const handleNewDeck = () => {
    setEditingDeck(undefined);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar selectedCombo={selectedCombo} onSelectCombo={setSelectedCombo} />

      <main className="flex-1">
        {selectedDeck ? (
          <DeckView deck={selectedDeck} />
        ) : (
          <div className="p-8">
            <div className="flex justify-between items-center mb-6 bg-red">
              <h1 className="text-3xl font-bold bg-red">{selectedCombo} Decks</h1>
            </div>

            <DeckGrid
              decks={decks.filter((deck) => {
                const commanderColors =
                  deck.commander.mana_cost
                    .match(/{[WUBRG]}/g)
                    ?.map((color) => color[1]) || [];
                return currentColorCombo?.colors.every((color) =>
                  commanderColors.includes(color)
                );
              })}
              onAddDeck={handleAddDeck}
              onSelectDeck={setSelectedDeck}
            />
          </div>
        )}
      </main>

      <CommanderModal
        isOpen={isCommanderModalOpen}
        onClose={() => setIsCommanderModalOpen(false)}
        onSelect={handleCommanderSelect}
        colorIdentity={currentColorCombo?.colors || []}
      />
    </div>
  );
}

export default App;

function useHashParam<T>(arg0: string, undefined: undefined): [any, any] {
  throw new Error('Function not implemented.');
}
