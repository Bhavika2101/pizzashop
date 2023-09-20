// Import necessary modules and methods
const { signOut } = require('./main');
const sessionStorage = require('mock-local-storage');

// Mock necessary global objects and methods
global.sessionStorage = sessionStorage;
global.showOverlay = jest.fn();
global.updateMenu = jest.fn();
global.document = {
  querySelector: jest.fn().mockReturnValue({ className: '' })
};
global.switchPage = jest.fn();

// Test suite
describe('signOut', () => {
  // Reset all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should remove session key and clear session storage', () => {
    sessionStorage.setItem('SESSION_KEY', 'test-user');
    signOut();
    expect(sessionStorage.getItem('SESSION_KEY')).toBeNull();
    expect(sessionStorage.length).toBe(0);
  });

  test('should call showOverlay with correct parameters', () => {
    signOut();
    expect(global.showOverlay).toHaveBeenCalledWith('Thanks', ' ', undefined, 'Hope to see you back soon...');
  });

  test('should call updateMenu', () => {
    signOut();
    expect(global.updateMenu).toHaveBeenCalled();
  });

  test('should set #mn-home className to active', () => {
    signOut();
    expect(global.document.querySelector).toHaveBeenCalledWith('#mn-home');
    expect(global.document.querySelector().className).toBe('active');
  });

  test('should call switchPage with correct parameters', () => {
    signOut();
    expect(global.switchPage).toHaveBeenCalledWith(false, undefined, 'index');
  });
});
