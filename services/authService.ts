import { User } from '../types';

const STORAGE_KEY_USERS = 'hk_users';
const STORAGE_KEY_SESSION = 'hk_session';

// Helper to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const register = async (name: string, email: string, password: string): Promise<User> => {
  await delay(800);
  
  const users = JSON.parse(localStorage.getItem(STORAGE_KEY_USERS) || '[]');
  
  if (users.find((u: any) => u.email === email)) {
    throw new Error('Bu e-posta adresi zaten kayıtlı.');
  }

  const newUser: User = {
    id: Date.now().toString(),
    name,
    email,
    watchlist: []
  };

  // Store password in a real app, but here we just mock auth
  const userRecord = { ...newUser, password };
  users.push(userRecord);
  
  localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
  localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(newUser));
  
  return newUser;
};

export const login = async (email: string, password: string): Promise<User> => {
  await delay(800);
  
  const users = JSON.parse(localStorage.getItem(STORAGE_KEY_USERS) || '[]');
  const user = users.find((u: any) => u.email === email && u.password === password);

  if (!user) {
    throw new Error('E-posta veya şifre hatalı.');
  }

  // Remove password from session
  const sessionUser: User = {
    id: user.id,
    name: user.name,
    email: user.email,
    watchlist: user.watchlist || []
  };

  localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(sessionUser));
  return sessionUser;
};

export const logout = () => {
  localStorage.removeItem(STORAGE_KEY_SESSION);
};

export const getCurrentUser = (): User | null => {
  const session = localStorage.getItem(STORAGE_KEY_SESSION);
  return session ? JSON.parse(session) : null;
};

export const toggleWatchlist = async (userId: string, brokerId: string): Promise<string[]> => {
  await delay(300);
  
  const users = JSON.parse(localStorage.getItem(STORAGE_KEY_USERS) || '[]');
  const userIndex = users.findIndex((u: any) => u.id === userId);
  
  if (userIndex === -1) return [];

  const user = users[userIndex];
  if (!user.watchlist) user.watchlist = [];

  if (user.watchlist.includes(brokerId)) {
    user.watchlist = user.watchlist.filter((id: string) => id !== brokerId);
  } else {
    user.watchlist.push(brokerId);
  }

  users[userIndex] = user;
  localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
  
  // Update session
  const session = JSON.parse(localStorage.getItem(STORAGE_KEY_SESSION) || '{}');
  session.watchlist = user.watchlist;
  localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(session));

  return user.watchlist;
};