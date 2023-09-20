const signIn = require('./main.js');

jest.mock('node-fetch', () => {
  const {Response} = require('node-fetch');
  return {
    __esModule: true, 
    default: jest.fn(),
    Response
  };
});

const fetch = require('node-fetch').default;
const { Response } = require('node-fetch');

describe('signIn function', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('successful sign in', async () => {
    const mockSuccessResponse = { data: { token: 'fakeToken' } };
    const mockSuccessResponse2 = { data: { firstName: 'John' } };

    fetch.mockReturnValueOnce(Promise.resolve(new Response(JSON.stringify(mockSuccessResponse))))
         .mockReturnValueOnce(Promise.resolve(new Response(JSON.stringify(mockSuccessResponse2))));
    
    const e = { preventDefault: jest.fn() };
    document.querySelector = jest.fn();
    document.querySelector.mockReturnValueOnce({ value: 'test@test.com' })
                           .mockReturnValueOnce({ value: 'password' });

    await signIn(e);

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(e.preventDefault).toHaveBeenCalledTimes(1);
    expect(document.querySelector).toHaveBeenNthCalledWith(1, '#inputEmailSI');
    expect(document.querySelector).toHaveBeenNthCalledWith(2, '#inputPasswordSI');
  });

  test('sign in with invalid credentials', async () => {
    const mockFailureResponse = { errors: [{ code: '401', status: 'Unauthorized', title: 'Invalid credentials', detail: 'The provided credentials are invalid.' }] };

    fetch.mockReturnValueOnce(Promise.resolve(new Response(JSON.stringify(mockFailureResponse))));
    
    const e = { preventDefault: jest.fn() };
    document.querySelector = jest.fn();
    document.querySelector.mockReturnValueOnce({ value: 'wrong@test.com' })
                           .mockReturnValueOnce({ value: 'wrongpassword' });

    await signIn(e);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(e.preventDefault).toHaveBeenCalledTimes(1);
    expect(document.querySelector).toHaveBeenNthCalledWith(1, '#inputEmailSI');
    expect(document.querySelector).toHaveBeenNthCalledWith(2, '#inputPasswordSI');
  });
});
