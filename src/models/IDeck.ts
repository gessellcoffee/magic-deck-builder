export interface IDeck {
    id: string;
    name: string;
    commander: string;
    cards: {
      [cardName: string]: number; 
    };
  }