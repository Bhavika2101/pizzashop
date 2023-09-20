const switchPage = require('./main');

describe('switchPage', () => {
  
  let e;
  let pageIdx;
  let fakeURL;
  let pages = [{className: "pages hide"}, {className: "pages hide"}];

  beforeAll(() => {
    global.history = { replaceState: jest.fn() };
    global.console = { log: jest.fn() };
  });

  beforeEach(() => {
    e = { target: { getAttribute: jest.fn().mockReturnValue('home') } };
    pageIdx = 0;
    fakeURL = 'about';
    pages = pages.map(page => ({...page}));
    pages.forEach(page => page.classList = { remove: jest.fn() });
    global.pages = pages;
  });

  test('should switch to page from event', () => {
    switchPage(e, pageIdx);
    expect(e.target.getAttribute).toHaveBeenCalledWith('data-name');
    expect(history.replaceState).toHaveBeenCalledWith(null, null, 'home.html');
    expect(console.log).toHaveBeenCalledWith('home.html');
    expect(pages[0].className).toBe('pages hide');
    expect(pages[0].classList.remove).toHaveBeenCalledWith('hide');
  });

  test('should switch to page from fakeURL', () => {
    switchPage(null, pageIdx, fakeURL);
    expect(history.replaceState).toHaveBeenCalledWith(null, null, 'about.html');
    expect(console.log).toHaveBeenCalledWith('about.html');
    expect(pages[0].className).toBe('pages hide');
    expect(pages[0].classList.remove).toHaveBeenCalledWith('hide');
  });
});
