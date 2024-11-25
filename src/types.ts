export interface ColorCombo {
  name: string;
  colors: string[];
  nickname: string;
  gradient: string;
}

export interface Deck {
  id: string;
  name: string;
  commander: Card;
  cards: Card[];
}

export interface Card {
  id: string;
  name: string;
  image_uris: { art_crop: string; normal: string } | null | undefined;
  mana_cost: string;
  type_line: string;
  oracle_text: string;
}
