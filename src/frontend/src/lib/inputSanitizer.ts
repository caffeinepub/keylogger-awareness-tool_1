/**
 * Input sanitization utilities to prevent XSS attacks
 */

const HTML_ESCAPE_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
};

/**
 * Escapes HTML special characters to prevent XSS
 */
export function escapeHtml(text: string): string {
  return text.replace(/[&<>"'/]/g, (char) => HTML_ESCAPE_MAP[char] || char);
}

/**
 * Sanitizes keystroke input by removing potentially dangerous content
 */
export function sanitizeKeystroke(keystroke: string): string {
  // Remove any HTML tags
  const withoutTags = keystroke.replace(/<[^>]*>/g, '');
  
  // Escape special characters
  return escapeHtml(withoutTags);
}

/**
 * Validates that a string contains only safe characters
 */
export function isValidKeystrokeInput(input: string): boolean {
  // Check for script tags or event handlers
  const dangerousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /<iframe/i,
    /<object/i,
    /<embed/i,
  ];

  return !dangerousPatterns.some(pattern => pattern.test(input));
}

/**
 * Sanitizes text for safe display
 */
export function sanitizeDisplayText(text: string): string {
  if (!text) return '';
  
  // Validate input
  if (!isValidKeystrokeInput(text)) {
    console.warn('Potentially dangerous input detected and sanitized');
  }
  
  return sanitizeKeystroke(text);
}
