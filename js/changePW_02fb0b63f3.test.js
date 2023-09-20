const { JSDOM } = require('jsdom');
const { changePW } = require('./main');

describe('changePW function', () => {
  let event;

  beforeEach(() => {
    const dom = new JSDOM();
    global.document = dom.window.document;
    global.window = dom.window;

    // Mock event object
    event = {
      preventDefault: jest.fn(),
    };

    // Mock switchPage function
    global.switchPage = jest.fn();
  });

  test('should prevent default event behavior', () => {
    changePW(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  test('should call switchPage with correct arguments', () => {
    changePW(event);
    expect(global.switchPage).toHaveBeenCalledWith(false, 2, "profile");
  });

  test('should not call switchPage if event is not provided', () => {
    changePW();
    expect(global.switchPage).not.toHaveBeenCalled();
  });
});
