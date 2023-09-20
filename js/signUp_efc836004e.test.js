const fetch = require('node-fetch');
const { JSDOM } = require("jsdom");
const { signUp } = require('./main'); 

jest.mock('node-fetch', () => jest.fn());

global.document = new JSDOM('<!doctype html><html><body></body></html>').window.document;
global.window = document.defaultView;

describe('SignUp Function', () => {
    beforeEach(() => {
        document.body.innerHTML =
            `<select id="userType">
                <option value="S">Staff</option>
                <option value="C">Customer</option>
             </select>
             <input id="first_name" value="John">
             <input id="last_name" value="Doe">
             <input id="validEmail" value="john.doe@gmail.com">
             <input id="inputPasswordSU" value="password123">`;
    });

    test('should successfully register a user', async () => {
        const mockSuccessResponse = { status: 200, data: { firstName: 'John' } };
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockSuccessResponse,
        });

        await signUp({ preventDefault: () => {} });

        expect(fetch).toHaveBeenCalledWith(expect.anything(), {
            body: JSON.stringify({
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@gmail.com',
                password: 'password123',
                isStaff: true
            }),
            headers: expect.anything(),
            method: 'POST',
            mode: 'cors',
        });
    });

    test('should handle error when registration fails', async () => {
        const mockErrorResponse = { status: 400, errors: [{ code: '400', status: 'Bad Request', title: 'Error', detail: 'Error in registration' }] };
        fetch.mockResolvedValueOnce({
            ok: false,
            json: async () => mockErrorResponse,
        });

        await signUp({ preventDefault: () => {} });

        expect(fetch).toHaveBeenCalledWith(expect.anything(), {
            body: JSON.stringify({
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@gmail.com',
                password: 'password123',
                isStaff: true
            }),
            headers: expect.anything(),
            method: 'POST',
            mode: 'cors',
        });
    });
});
