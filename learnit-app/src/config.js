// Simple production check - if we're in a built version, use empty string
export const API_BASE_URL =
  window.location.hostname === 'localhost' && window.location.port === '3000'
    ? 'http://localhost:3001'
    : '';

console.log(
  'Current location:',
  window.location.hostname,
  window.location.port
);
console.log('Final API_BASE_URL:', API_BASE_URL);
