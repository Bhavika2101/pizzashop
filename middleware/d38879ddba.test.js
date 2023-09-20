const debug = require('debug')('final-mora0199-call0099:db');
const xss = require('xss');

// Sanitize function
function sanitize(input) {
  return xss(input);
}

describe('sanitizeBody', () => {
  let sourceString;

  beforeEach(() => {
    sourceString = '';
  });

  test('sanitize should remove script tags from input', () => {
    sourceString = '<script>alert("Hello World!")</script>';
    const result = sanitize(sourceString);
    expect(result).not.toContain('<script>');
    expect(result).not.toContain('</script>');
  });

  test('sanitize should not alter strings without script tags', () => {
    sourceString = 'Hello World!';
    const result = sanitize(sourceString);
    expect(result).toBe(sourceString);
  });

  test('sanitize should handle empty strings', () => {
    sourceString = '';
    const result = sanitize(sourceString);
    expect(result).toBe(sourceString);
  });

  test('sanitize should handle strings with only script tags', () => {
    sourceString = '<script></script>';
    const result = sanitize(sourceString);
    expect(result).toBe('');
  });
});
