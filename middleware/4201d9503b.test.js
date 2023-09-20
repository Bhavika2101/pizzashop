const jwt = require('jsonwebtoken');

function parseToken(header) {
  if (!header) return undefined;
  
  const parts = header.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') return undefined;

  const token = parts[1];

  if (!token) return undefined;

  return token;
}

describe('parseToken function', () => {
  test('should return token when header is valid', () => {
    const header = 'Bearer some-token';
    const result = parseToken(header);
    expect(result).toBe('some-token');
  });

  test('should return undefined when header is not valid', () => {
    const header = 'InvalidHeader';
    const result = parseToken(header);
    expect(result).toBeUndefined();
  });

  test('should return undefined when type is not Bearer', () => {
    const header = 'Basic some-token';
    const result = parseToken(header);
    expect(result).toBeUndefined();
  });

  test('should return undefined when token is not present', () => {
    const header = 'Bearer ';
    const result = parseToken(header);
    expect(result).toBeUndefined();
  });

  test('should return undefined when header is not provided', () => {
    const result = parseToken();
    expect(result).toBeUndefined();
  });
});
