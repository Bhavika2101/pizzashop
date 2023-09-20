const showOverlay = require('./main');

describe('showOverlay function', () => {
  let overlayMenu;
  let overlay;

  beforeAll(() => {
    global.document.body.innerHTML = `
      <div class="overlay-menu hide"></div>
      <div class="overlay hide"></div>
    `;
    overlayMenu = document.querySelector(".overlay-menu");
    overlay = document.querySelector(".overlay");
  });

  test('should display overlay menu', () => {
    showOverlay('type', 'status', 'code', 'title', 'details');
    expect(overlayMenu.classList.contains('show')).toBe(true);
    expect(overlayMenu.classList.contains('hide')).toBe(false);
  });

  test('should display overlay', () => {
    showOverlay('type', 'status', 'code', 'title', 'details');
    expect(overlay.classList.contains('show')).toBe(true);
    expect(overlay.classList.contains('hide')).toBe(false);
  });

  afterEach(() => {
    overlayMenu.classList.remove('show');
    overlayMenu.classList.add('hide');
    overlay.classList.remove('show');
    overlay.classList.add('hide');
  });
});
