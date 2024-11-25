import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import DeckGrid from './components/DeckGrid';
import DeckView from './components/DeckView';
import CommanderModal from './components/CommanderModal';
import { guildCombos, shardCombos, nephilimCombos, type ColorCombo } from './data/colorCombos';
import type { Deck, Card } from './types';

function App() {
  const [selectedCombo, setSelectedCombo] = useState(guildCombos[0].nickname);
  const [decks, setDecks] = useState<Deck[]>([]);
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

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar selectedCombo={selectedCombo} onSelectCombo={setSelectedCombo} />

      <main className="flex-1">
        {selectedDeck ? (
          <DeckView deck={selectedDeck} />
        ) : (
          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">{selectedCombo} Decks</h1>
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