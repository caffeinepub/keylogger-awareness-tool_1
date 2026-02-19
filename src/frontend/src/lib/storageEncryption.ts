/**
 * Storage encryption utility using Web Crypto API
 * Enhanced with HMAC integrity verification and key rotation
 */

const ALGORITHM = 'AES-GCM';
const KEY_LENGTH = 256;
const IV_LENGTH = 12;
const VERSION = 1;

interface EncryptedPayload {
  version: number;
  hmac: string;
  data: string;
}

// Generate or retrieve encryption key from sessionStorage (rotates per session)
async function getEncryptionKey(): Promise<CryptoKey> {
  const keyData = sessionStorage.getItem('_enc_key');
  
  if (keyData) {
    try {
      const rawKey = Uint8Array.from(atob(keyData), c => c.charCodeAt(0));
      return await crypto.subtle.importKey(
        'raw',
        rawKey,
        { name: ALGORITHM, length: KEY_LENGTH },
        false,
        ['encrypt', 'decrypt']
      );
    } catch (error) {
      console.error('Failed to import stored key, generating new key:', error);
    }
  }

  // Generate new key (key rotation on new session)
  const key = await crypto.subtle.generateKey(
    { name: ALGORITHM, length: KEY_LENGTH },
    true,
    ['encrypt', 'decrypt']
  );

  // Store key in sessionStorage (cleared on tab close)
  const exportedKey = await crypto.subtle.exportKey('raw', key);
  const keyString = btoa(String.fromCharCode(...new Uint8Array(exportedKey)));
  sessionStorage.setItem('_enc_key', keyString);

  return key;
}

// Generate or retrieve HMAC key from sessionStorage
async function getHMACKey(): Promise<CryptoKey> {
  const keyData = sessionStorage.getItem('_hmac_key');
  
  if (keyData) {
    try {
      const rawKey = Uint8Array.from(atob(keyData), c => c.charCodeAt(0));
      return await crypto.subtle.importKey(
        'raw',
        rawKey,
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign', 'verify']
      );
    } catch (error) {
      console.error('Failed to import stored HMAC key, generating new key:', error);
    }
  }

  // Generate new HMAC key
  const key = await crypto.subtle.generateKey(
    { name: 'HMAC', hash: 'SHA-256' },
    true,
    ['sign', 'verify']
  );

  // Store key in sessionStorage
  const exportedKey = await crypto.subtle.exportKey('raw', key);
  const keyString = btoa(String.fromCharCode(...new Uint8Array(exportedKey)));
  sessionStorage.setItem('_hmac_key', keyString);

  return key;
}

// Generate HMAC signature for data integrity
async function generateHMAC(data: string): Promise<string> {
  const key = await getHMACKey();
  const encodedData = new TextEncoder().encode(data);
  const signature = await crypto.subtle.sign('HMAC', key, encodedData);
  return btoa(String.fromCharCode(...new Uint8Array(signature)));
}

// Verify HMAC signature
async function verifyHMAC(data: string, signature: string): Promise<boolean> {
  try {
    const key = await getHMACKey();
    const encodedData = new TextEncoder().encode(data);
    const signatureBytes = Uint8Array.from(atob(signature), c => c.charCodeAt(0));
    return await crypto.subtle.verify('HMAC', key, signatureBytes, encodedData);
  } catch (error) {
    console.error('HMAC verification failed:', error);
    return false;
  }
}

export async function encryptData(data: string): Promise<string> {
  try {
    const key = await getEncryptionKey();
    const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
    const encodedData = new TextEncoder().encode(data);

    const encryptedData = await crypto.subtle.encrypt(
      { name: ALGORITHM, iv },
      key,
      encodedData
    );

    // Combine IV and encrypted data
    const combined = new Uint8Array(iv.length + encryptedData.byteLength);
    combined.set(iv, 0);
    combined.set(new Uint8Array(encryptedData), iv.length);
    const encryptedString = btoa(String.fromCharCode(...combined));

    // Generate HMAC for integrity verification
    const hmac = await generateHMAC(encryptedString);

    // Create versioned payload
    const payload: EncryptedPayload = {
      version: VERSION,
      hmac,
      data: encryptedString,
    };

    return JSON.stringify(payload);
  } catch (error) {
    console.error('Encryption failed:', error);
    throw new Error('Failed to encrypt data');
  }
}

export async function decryptData(encryptedString: string): Promise<string | null> {
  try {
    // Parse payload
    let payload: EncryptedPayload;
    try {
      payload = JSON.parse(encryptedString);
    } catch {
      // Legacy format without HMAC - reject for security
      console.warn('Legacy encrypted data format detected, rejecting for security');
      return null;
    }

    // Verify version
    if (payload.version !== VERSION) {
      console.warn('Unsupported encryption version:', payload.version);
      return null;
    }

    // Verify HMAC integrity
    const isValid = await verifyHMAC(payload.data, payload.hmac);
    if (!isValid) {
      console.error('HMAC verification failed - data may be corrupted or tampered');
      return null;
    }

    // Decrypt data
    const key = await getEncryptionKey();
    const combined = Uint8Array.from(atob(payload.data), c => c.charCodeAt(0));

    const iv = combined.slice(0, IV_LENGTH);
    const encryptedData = combined.slice(IV_LENGTH);

    const decryptedData = await crypto.subtle.decrypt(
      { name: ALGORITHM, iv },
      key,
      encryptedData
    );

    return new TextDecoder().decode(decryptedData);
  } catch (error) {
    console.error('Decryption failed:', error);
    return null;
  }
}

export function clearEncryptionKey(): void {
  sessionStorage.removeItem('_enc_key');
  sessionStorage.removeItem('_hmac_key');
}
