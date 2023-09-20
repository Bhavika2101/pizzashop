const genKey = require('./genKey');

describe('genKey', () => {
  test('should return a string', () => {
    const result = genKey();
    expect(typeof result).toBe('string');
  });

  test('should return a string of length 30', () => {
    const result = genKey();
    expect(result).toHaveLength(30);
  });

  test('should only contain lowercase alphanumeric characters', () => {
    const result = genKey();
    expect(result).toMatch(/^[a-z0-9]*$/);
  });

  test('should generate different keys on each call', () => {
    const result1 = genKey();
    const result2 = genKey();
    expect(result1).not.toEqual(result2);
  });
});
