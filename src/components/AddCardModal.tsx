import { useState, useEffect, useCallback } from 'react';
import { X, Search } from 'lucide-react';
import * as Scry from 'scryfall-sdk';
import { Card } from '../types';

interface AddCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCard: (card: Card) => void;
  colorIdentity: string;
}

const CARD_TYPES = [
  'Legendary',
  'Creature',
  'Artifact',
  'Instant',
  'Sorcery',
  'Enchantment',
  'Planeswalker',
  'Land',
];

export default function AddCardModal({
  isOpen,
  onClose,
  onAddCard,
  colorIdentity,
}: AddCardModalProps) {
  const [search, setSearch] = useState('');
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const colors = (colorIdentity.match(/{[WUBRG]}/g) || []).map((c) => c[1]);

  const searchCards = useCallback(
    async (searchTerm: string, filters: string[]) => {
      if (!searchTerm) {
        setCards([]);
        return;
      }

      setLoading(true);
      try {
        let query = searchTerm;
        if (filters.length > 0) {
          query += ` (${filters.join(' OR ')})`;
        }
        query += ` color<=${colors.join('')}`;

        const results = await Scry.Cards.search(query).waitForAll();
        setCards(results);
      } catch (error) {
        console.error('Error searching cards:', error);
      } finally {
        setLoading(false);
      }
    },
    [colors]
  );

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      searchCards(search, activeFilters);
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [search, activeFilters]); // Removed searchCards

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute inset-4 sm:inset-6 md:inset-8 flex items-start justify-center overflow-hidden">
        <div className="relative bg-white rounded-xl w-full max-w-4xl shadow-2xl flex flex-col max-h-full">
          <div className="flex-none p-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-bold">Add Cards</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-none p-4 border-b space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search cards... (supports Scryfall syntax)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {CARD_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setActiveFilters((prev) =>
                      prev.includes(`t:${type.toLowerCase()}`)
                        ? prev.filter((f) => f !== `t:${type.toLowerCase()}`)
                        : [...prev, `t:${type.toLowerCase()}`]
                    );
                  }}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    activeFilters.includes(`t:${type.toLowerCase()}`)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {loading ? (
                <div className="col-span-full text-center py-8">
                  Searching cards...
                </div>
              ) : cards.length === 0 ? (
                <div className="col-span-full text-center py-8 text-gray-600">
                  {search
                    ? 'No cards found'
                    : 'Start typing to search for cards'}
                </div>
              ) : (
                cards.map((card) => (
                  <div
                    key={card.id}
                    className="border rounded-lg p-2 hover:border-blue-500 transition-colors"
                  >
                    {card.image_uris?.normal && (
                      <img
                        src={card.image_uris.normal}
                        alt={card.name}
                        className="w-full rounded"
                        loading="lazy"
                      />
                    )}
                    <div className="mt-2 flex justify-between items-center">
                      <h3 className="font-medium truncate mr-2">{card.name}</h3>
                      <button
                        onClick={() => onAddCard(card)}
                        className="flex-none px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm transition-colors"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
