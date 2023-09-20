const formatValidationErrors = require('./errorHandler');

describe('formatValidationErrors', () => {
  let errors;

  beforeEach(() => {
    errors = {
      error1: {
        message: 'Error message 1',
        path: 'path1',
        value: 'value1'
      },
      error2: {
        message: 'Error message 2',
        path: 'path2',
        value: 'value2'
      }
    };
  });

  test('should return formatted errors', () => {
    const result = formatValidationErrors(errors);
    expect(result).toEqual([
      {
        status: 'Bad Request',
        code: '400',
        title: 'Validation Error',
        detail: 'Error message 1',
        source: {
          pointer: '/data/attributes/path1',
          value: 'value1'
        }
      },
      {
        status: 'Bad Request',
        code: '400',
        title: 'Validation Error',
        detail: 'Error message 2',
        source: {
          pointer: '/data/attributes/path2',
          value: 'value2'
        }
      }
    ]);
  });

  test('should handle empty errors object', () => {
    const result = formatValidationErrors({});
    expect(result).toEqual([]);
  });

  test('should handle null errors object', () => {
    const result = formatValidationErrors(null);
    expect(result).toEqual([]);
  });
});
