// Check if we're in development mode (localhost:3000 for Vite dev server)
const isDev =
  window.location.hostname === 'localhost' &&
  (window.location.port === '3000' || window.location.port === '5173');

export const API_BASE_URL = isDev ? 'http://localhost:3001' : '';

console.log(
  'Current location:',
  window.location.hostname,
  window.location.port
);
console.log('Is development:', isDev);
console.log('Final API_BASE_URL:', API_BASE_URL);
