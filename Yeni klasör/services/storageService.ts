
const STORAGE_KEY_WATCHLIST = 'hk_watchlist';

export const getWatchlist = (): string[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_WATCHLIST);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error("Error loading watchlist", e);
    return [];
  }
};

export const saveWatchlist = (watchlist: string[]) => {
  try {
    localStorage.setItem(STORAGE_KEY_WATCHLIST, JSON.stringify(watchlist));
  } catch (e) {
    console.error("Error saving watchlist", e);
  }
};

export const toggleWatchlistId = (currentList: string[], brokerId: string): string[] => {
  if (currentList.includes(brokerId)) {
    return currentList.filter(id => id !== brokerId);
  }
  return [...currentList, brokerId];
};
