import React from 'react';

interface ManaSymbolsProps {
  manaCost: string;
}

export default function ManaSymbols({ manaCost }: ManaSymbolsProps) {
  const symbols = manaCost.match(/{[^}]+}/g) || [];

  return (
    <div className="flex gap-1">
      {symbols.map((symbol, index) => {
        const manaClass = symbol.replace(/{|}/g, '').toLowerCase();
        return (
          <div
            key={`${symbol}-${index}`}
            className="w-6 h-6 rounded-full flex items-center justify-center bg-gradient-to-br shadow-sm"
            style={{
              background: getManaBackground(manaClass),
              color: ['w'].includes(manaClass) ? '#000' : '#fff',
            }}
          >
            {getManaSymbol(manaClass)}
          </div>
        );
      })}
    </div>
  );
}

function getManaBackground(mana: string): string {
  const colors: Record<string, string> = {
    w: 'from-slate-100 to-slate-300',
    u: 'from-blue-400 to-blue-600',
    b: 'from-gray-700 to-gray-900',
    r: 'from-red-400 to-red-600',
    g: 'from-green-400 to-green-600',
  };
  return colors[mana] || 'from-gray-400 to-gray-600';
}

function getManaSymbol(mana: string): string {
  const symbols: Record<string, string> = {
    w: '☀',
    u: '💧',
    b: '💀',
    r: '🔥',
    g: '🌳',
  };
  return symbols[mana] || mana.toUpperCase();
}