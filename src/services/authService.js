import { STORAGE_KEYS } from '../utils/constants';

const mockUsers = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@erp.com',
    password: 'admin123',
    role: 'Administrator',
  },
  {
    id: 2,
    name: 'Sales Manager',
    email: 'sales@erp.com',
    password: 'sales123',
    role: 'Sales Manager',
  },
];

export const loginUser = async ({ email, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find(
        (item) => item.email === email && item.password === password
      );
      if (user) {
        const payload = { ...user, token: 'mock-jwt-token' };
        localStorage.setItem(STORAGE_KEYS.auth, JSON.stringify(payload));
        resolve(payload);
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 600);
  });
};

export const logoutUser = () => {
  localStorage.removeItem(STORAGE_KEYS.auth);
};

export const getStoredUser = () => {
  const raw = localStorage.getItem(STORAGE_KEYS.auth);
  return raw ? JSON.parse(raw) : null;
};
