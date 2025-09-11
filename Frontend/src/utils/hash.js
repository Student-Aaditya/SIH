// src/utils/hash.js
// Utility to compute SHA-256 hash for a File or ArrayBuffer or string.
// Returns hex string.

export async function fileToHash(input) {
  let buffer;
  if (!input) return '';
  if (input instanceof ArrayBuffer) {
    buffer = input;
  } else if (typeof input === 'string') {
    buffer = new TextEncoder().encode(input);
  } else if (input instanceof File || (typeof Blob !== 'undefined' && input instanceof Blob)) {
    buffer = await input.arrayBuffer();
  } else {
    // fallback
    buffer = new TextEncoder().encode(String(input));
  }

  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
