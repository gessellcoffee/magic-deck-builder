// utils/localStorage.ts
import { IDeck } from '../models/IDeck'; // Assuming you have IDeck.ts

const DECK_STORAGE_KEY = 'magic-decks'; 

export const saveDeckToStorage = (decks: IDeck[]) => {
  try {
    const decksJSON = JSON.stringify(decks);
    localStorage.setItem(DECK_STORAGE_KEY, decksJSON);
  } catch (error) {
    console.error('Error saving decks to local storage:', error);
  }
};

export const loadDeckFromStorage = (): IDeck[] => {
  try {
    const decksJSON = localStorage.getItem(DECK_STORAGE_KEY);
    if (decksJSON) {
      return JSON.parse(decksJSON);
    }
  } catch (error) {
    console.error('Error loading decks from local storage:', error);
  }
  return []; // Return an empty array if there's an error or no decks stored
};