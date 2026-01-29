import { QRData } from '../types/qr';

const STORAGE_KEY = 'qrage_history';
const MAX_HISTORY = 10;

export function getHistory(): QRData[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addToHistory(item: QRData): void {
  try {
    const history = getHistory();
    const filtered = history.filter(h => h.id !== item.id);
    const updated = [item, ...filtered].slice(0, MAX_HISTORY);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    console.error('Failed to save to history');
  }
}

export function removeFromHistory(id: string): void {
  try {
    const history = getHistory();
    const updated = history.filter(h => h.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    console.error('Failed to remove from history');
  }
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    console.error('Failed to clear history');
  }
}
