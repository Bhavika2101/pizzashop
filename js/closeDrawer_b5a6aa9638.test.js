// Import the methods from main.js
const main = require('./main');

// Mock the setTimeout function to avoid waiting during tests
jest.useFakeTimers();

// Mock the hideOverlay function to check if it's called
jest.mock('./main', () => ({
  ...jest.requireActual('./main'),
  hideOverlay: jest.fn(),
}));

describe('closeDrawer function', () => {
  beforeEach(() => {
    main.hideOverlay.mockClear();
    jest.clearAllTimers();
  });

  test('calls hideOverlay after 5 seconds', () => {
    main.closeDrawer();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 5000);

    jest.runAllTimers();
    expect(main.hideOverlay).toHaveBeenCalledTimes(1);
  });

  test('does not call hideOverlay before 5 seconds', () => {
    main.closeDrawer();
    expect(main.hideOverlay).not.toHaveBeenCalled();

    jest.advanceTimersByTime(4999);
    expect(main.hideOverlay).not.toHaveBeenCalled();
  });
});
