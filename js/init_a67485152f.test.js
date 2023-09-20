const fs = require('fs');
const path = require('path');
const jsdom = require('jsdom');
let dom;
let container;

beforeEach(() => {
  dom = new jsdom.JSDOM(fs.readFileSync(path.resolve(__dirname, './main.js'), 'utf8'), { runScripts: 'dangerously', url: 'http://localhost' });
  container = dom.window.document;
});

describe('init function', () => {
  test('Initial page is set correctly', () => {
    dom.window.init();
    expect(dom.window.historyInitiated).toBeTruthy();
    expect(dom.window.location.href).toBe('http://localhost');
  });

  test('Event listeners are added correctly', () => {
    dom.window.init();
    const signinlnk = container.querySelector("#signinlnk");
    const signoutlnk = container.querySelector("#signoutlnk");
    const signuplnk = container.querySelector("#signuplnk");
    const closebtn = container.querySelector("#closebtn");
    const modal = container.querySelector(".modal");
    const mnCtt = container.querySelector("#mn-ctt");
    const mnHome = container.querySelector("#mn-home");
    const mnAbout = container.querySelector("#mn-about");
    const dropdownMenuLink = container.querySelector("#navbarDropdownMenuLink");
    const submitSUP = container.querySelector("#submitSUP");
    const submitSIN = container.querySelector("#submitSIN");
    
    expect(signinlnk.onclick).toBeDefined();
    expect(signoutlnk.onclick).toBeDefined();
    expect(signuplnk.onclick).toBeDefined();
    expect(closebtn.onclick).toBeDefined();
    expect(modal.ontransitionend).toBeDefined();
    expect(mnCtt.onclick).toBeDefined();
    expect(mnHome.onclick).toBeDefined();
    expect(mnAbout.onclick).toBeDefined();
    expect(dropdownMenuLink.onclick).toBeDefined();
    expect(submitSUP.onclick).toBeDefined();
    expect(submitSIN.onclick).toBeDefined();
  });
});
