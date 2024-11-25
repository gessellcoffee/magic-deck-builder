import React, { useState, useEffect } from 'react';
import { X, Search } from 'lucide-react';
import * as Scry from 'scryfall-sdk';
import type { Card } from '../types';

interface CommanderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (commander: Card) => void;
  colorIdentity: string[];
}

export default function CommanderModal({
  isOpen,
  onClose,
  onSelect,
  colorIdentity,
}: CommanderModalProps) {
  const [commanders, setCommanders] = useState<Card[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      const fetchCommanders = async () => {
        setLoading(true);
        try {
          const query = `is:commander color=${colorIdentity.join('')}`;
          const cards = await Scry.Cards.search(query).waitForAll();
          setCommanders(cards);
        } catch (error) {
          console.error('Error fetching commanders:', error);
        }
        setLoading(false);
      };

      fetchCommanders();
    }
  }, [isOpen, colorIdentity]);

  if (!isOpen) return null;

  const filteredCommanders = commanders.filter((card) =>
    card.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Select Commander</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search commanders..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
        </div>

        <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto max-h-[60vh]">
          {loading ? (
            <div className="col-span-full text-center py-8">
              Loading commanders...
            </div>
          ) : (
            filteredCommanders.map((card) => (
              <div
                key={card.id}
                onClick={() => onSelect(card)}
                className="border rounded-lg p-2 cursor-pointer hover:border-blue-500 transition-colors"
              >
                {card.image_uris?.normal && (
                  <img
                    src={card.image_uris.normal}
                    alt={card.name}
                    className="w-full rounded"
                  />
                )}
                <h3 className="mt-2 font-medium text-center">{card.name}</h3>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
