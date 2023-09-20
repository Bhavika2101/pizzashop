const main = require('./main');

describe('hideOverlay function', () => {
  let e, overlayMenu, overlay;

  beforeEach(() => {
    // Mock preventDefault and stopPropagation
    e = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn()
    };

    // Mock DOM elements
    overlayMenu = {
      classList: {
        remove: jest.fn(),
        add: jest.fn()
      }
    };

    overlay = {
      classList: {
        remove: jest.fn(),
        add: jest.fn()
      }
    };

    global.document.querySelector = jest.fn();

    // Mock hideModal function
    main.hideModal = jest.fn();
  });

  test('should call preventDefault, stopPropagation and hideModal if event is provided', () => {
    global.document.querySelector
      .mockReturnValueOnce(overlayMenu)
      .mockReturnValueOnce(overlay);

    main.hideOverlay(e);

    expect(e.preventDefault).toHaveBeenCalled();
    expect(e.stopPropagation).toHaveBeenCalled();
    expect(main.hideModal).toHaveBeenCalledWith(e);
    expect(overlayMenu.classList.remove).toHaveBeenCalledWith('show');
    expect(overlayMenu.classList.add).toHaveBeenCalledWith('hide');
    expect(overlay.classList.remove).toHaveBeenCalledWith('show');
    expect(overlay.classList.add).toHaveBeenCalledWith('hide');
  });

  test('should call hideModal without event if event is not provided', () => {
    global.document.querySelector
      .mockReturnValueOnce(overlayMenu)
      .mockReturnValueOnce(overlay);

    main.hideOverlay();

    expect(main.hideModal).toHaveBeenCalled();
    expect(overlayMenu.classList.remove).toHaveBeenCalledWith('show');
    expect(overlayMenu.classList.add).toHaveBeenCalledWith('hide');
    expect(overlay.classList.remove).toHaveBeenCalledWith('show');
    expect(overlay.classList.add).toHaveBeenCalledWith('hide');
  });

  test('should not throw error if overlayMenu or overlay is null', () => {
    global.document.querySelector
      .mockReturnValueOnce(null)
      .mockReturnValueOnce(null);

    expect(() => main.hideOverlay(e)).not.toThrow();
  });
});
