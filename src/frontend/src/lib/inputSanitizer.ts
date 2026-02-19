/**
 * Input sanitization utilities to prevent XSS attacks
 * Enhanced with comprehensive pattern detection and validation
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
 * Comprehensive XSS pattern detection
 * Blocks common attack vectors before HTML escaping
 */
const XSS_PATTERNS = [
  // Script tags
  /<script[\s\S]*?>/gi,
  /<\/script>/gi,
  
  // JavaScript protocol
  /javascript:/gi,
  
  // Data URIs that could contain HTML
  /data:text\/html/gi,
  
  // Inline event handlers
  /on(abort|blur|change|click|dblclick|error|focus|keydown|keypress|keyup|load|mousedown|mousemove|mouseout|mouseover|mouseup|reset|resize|select|submit|unload)/gi,
  
  // Additional event handlers
  /on(drag|drop|scroll|wheel|copy|cut|paste|contextmenu|input|invalid|search|animationstart|animationend|animationiteration|transitionend)/gi,
  
  // iframe, object, embed tags
  /<iframe[\s\S]*?>/gi,
  /<object[\s\S]*?>/gi,
  /<embed[\s\S]*?>/gi,
  
  // SVG with script
  /<svg[\s\S]*?>/gi,
  
  // Meta refresh
  /<meta[\s\S]*?>/gi,
  
  // Link with javascript
  /<link[\s\S]*?>/gi,
  
  // Base tag manipulation
  /<base[\s\S]*?>/gi,
  
  // Form tag
  /<form[\s\S]*?>/gi,
  
  // Import statements
  /@import/gi,
  
  // Expression in CSS
  /expression\s*\(/gi,
  
  // VBScript
  /vbscript:/gi,
];

/**
 * Validates input against XSS patterns
 * Returns true if input is safe, false if dangerous patterns detected
 */
export function validateAgainstXSS(input: string): boolean {
  if (!input || typeof input !== 'string') {
    return true;
  }
  
  return !XSS_PATTERNS.some(pattern => pattern.test(input));
}

/**
 * Escapes HTML special characters to prevent XSS
 */
export function escapeHtml(text: string): string {
  return text.replace(/[&<>"'/]/g, (char) => HTML_ESCAPE_MAP[char] || char);
}

/**
 * Removes HTML tags from input
 */
export function removeHtmlTags(input: string): string {
  return input.replace(/<[^>]*>/g, '');
}

/**
 * Sanitizes keystroke input with defense-in-depth approach
 * 1. First validates against XSS patterns
 * 2. Then removes HTML tags
 * 3. Finally escapes special characters
 */
export function sanitizeKeystroke(keystroke: string): string {
  if (!keystroke || typeof keystroke !== 'string') {
    return '';
  }
  
  // First line of defense: block dangerous patterns
  if (!validateAgainstXSS(keystroke)) {
    console.warn('XSS pattern detected and blocked:', keystroke.substring(0, 50));
    return '';
  }
  
  // Remove any HTML tags
  const withoutTags = removeHtmlTags(keystroke);
  
  // Escape special characters
  return escapeHtml(withoutTags);
}

/**
 * Validates that a string contains only safe characters
 * Legacy function maintained for backward compatibility
 */
export function isValidKeystrokeInput(input: string): boolean {
  return validateAgainstXSS(input);
}

/**
 * Sanitizes text for safe display
 */
export function sanitizeDisplayText(text: string): string {
  if (!text) return '';
  
  // Validate input
  if (!validateAgainstXSS(text)) {
    console.warn('Potentially dangerous input detected and sanitized');
    return '';
  }
  
  return sanitizeKeystroke(text);
}
