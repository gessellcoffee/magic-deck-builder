import { useState } from 'react';
import { ChevronDown, ChevronRight, Swords } from 'lucide-react';
import { guildCombos, shardCombos, nephilimCombos } from '../data/colorCombos';
import type { ColorCombo } from '../data/colorCombos';

interface SidebarProps {
  selectedCombo: string;
  onSelectCombo: (nickname: string) => void;
}

interface CollapsibleSectionProps {
  title: string;
  combos: ColorCombo[];
  selectedCombo: string;
  onSelectCombo: (nickname: string) => void;
  defaultOpen?: boolean;
}

function CollapsibleSection({
  title,
  combos,
  selectedCombo,
  onSelectCombo,
  defaultOpen = false,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-2 p-2 text-gray-300 hover:text-white transition-colors"
      >
        {isOpen ? (
          <ChevronDown className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
        <span className="font-medium">{title}</span>
      </button>
      
      {isOpen && (
        <div className="ml-2 space-y-1">
          {combos.map((combo) => (
            <button
              key={combo.nickname}
              onClick={() => onSelectCombo(combo.nickname)}
              className={`w-full text-left p-2 rounded-lg transition-all ${
                selectedCombo === combo.nickname
                  ? `bg-gradient-to-r ${combo.gradient} text-white`
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              {combo.nickname}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Sidebar({
  selectedCombo,
  onSelectCombo,
}: SidebarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div 
      className={`w-64 h-screen bg-gray-900 text-white transform transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="p-4">
        <div className="flex items-center gap-2 mb-8">
          <Swords className="w-8 h-8 cursor-pointer" onClick={toggleSidebar} />
          <h1 className="text-xl font-bold">MTG Decks</h1>
        </div>

        <nav className="space-y-4">
          <CollapsibleSection
            title="Guilds"
            combos={guildCombos}
            selectedCombo={selectedCombo}
            onSelectCombo={onSelectCombo}
            defaultOpen={true}
          />
          <CollapsibleSection
            title="Shards/Wedges"
            combos={shardCombos}
            selectedCombo={selectedCombo}
            onSelectCombo={onSelectCombo}
          />
          <CollapsibleSection
            title="Nephilim"
            combos={nephilimCombos}
            selectedCombo={selectedCombo}
            onSelectCombo={onSelectCombo}
          />
        </nav>
      </div>
    </div>
  );
}