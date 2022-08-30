import { fetch } from 'cross-fetch';
import {
  getAncestors,
  getDescendants,
  getPerson,
  getRelatives,
  wikiTreeGet,
} from '../src/wikitree_api';
import FormData from 'form-data';

jest.mock('cross-fetch');
const mockedFetch = <jest.MockedFunction<typeof fetch>>fetch;

function mockFetch(json: any) {
  mockedFetch.mockClear();
  mockedFetch.mockResolvedValue({
    json: () => Promise.resolve(json),
  } as Response);
}

function normalizeFormData(formData: FormData): string {
  return JSON.stringify(formData).replaceAll(formData.getBoundary(), '');
}

function expectFormDataToContainData(
  received: FormData,
  actual: { [key: string]: string | number }
) {
  const formData = new FormData();
  for (const key in actual) {
    if (actual[key]) {
      formData.append(key, actual[key]);
    }
  }
  expect(normalizeFormData(received)).toEqual(normalizeFormData(formData));
}

describe('fetchWikiTree', () => {
  test('send simple request', async () => {
    const response = {};
    mockFetch(response);

    const result = await wikiTreeGet({
      action: 'getPerson',
      key: 'Test-1',
      fields: 'Name,Id',
    });

    expect(result).toBe(response);

    expect(mockedFetch).toHaveBeenCalledTimes(1);
    expect(mockedFetch).toHaveBeenCalledWith(
      'https://api.wikitree.com/api.php',
      expect.objectContaining({
        method: 'POST',
        redirect: 'manual',
        credentials: 'include',
      })
    );

    const requestedData = mockedFetch.mock.calls[0][1].body as any as FormData;
    expectFormDataToContainData(requestedData, {
      format: 'json',
      action: 'getPerson',
      key: 'Test-1',
      fields: 'Name,Id',
    });
  });

  test('send request to different URL', async () => {
    mockFetch({});

    await wikiTreeGet(
      {
        action: 'getPerson',
        key: 'Test-1',
      },
      { apiUrl: 'https://example.org/api' }
    );

    expect(mockedFetch).toHaveBeenCalledTimes(1);
    expect(mockedFetch).toHaveBeenCalledWith(
      'https://example.org/api',
      expect.objectContaining({
        method: 'POST',
        redirect: 'manual',
        credentials: undefined,
      })
    );
  });

  test('send request with auth cookies', async () => {
    mockFetch({});

    await wikiTreeGet(
      {
        action: 'getPerson',
        key: 'Test-1',
      },
      { auth: { cookies: 'auth-cookies' } }
    );

    expect(mockedFetch).toHaveBeenCalledTimes(1);
    expect(mockedFetch).toHaveBeenCalledWith(
      'https://api.wikitree.com/api.php',
      expect.objectContaining({
        method: 'POST',
        redirect: 'manual',
        credentials: 'include',
        headers: { Cookie: 'auth-cookies' },
      })
    );
  });
});

describe('getPerson', () => {
  test('send simple request', async () => {
    const person = { Name: 'Test-1' };
    mockFetch([{ person }]);

    const result = await getPerson('Test-1');

    expect(result).toBe(person);
    const requestedData = mockedFetch.mock.calls[0][1].body as any as FormData;
    expectFormDataToContainData(requestedData, {
      format: 'json',
      action: 'getPerson',
      key: 'Test-1',
    });
  });

  test('send request with arguments', async () => {
    const person = { Name: 'Test-1' };
    mockFetch([{ person }]);

    const result = await getPerson('Test-1', {
      fields: ['Father', 'Mother'],
      bioFormat: 'html',
      resolveRedirect: true,
    });

    expect(result).toBe(person);
    const requestedData = mockedFetch.mock.calls[0][1].body as any as FormData;
    expectFormDataToContainData(requestedData, {
      format: 'json',
      action: 'getPerson',
      key: 'Test-1',
      bioFormat: 'html',
      fields: 'Father,Mother',
      resolveRedirect: '1',
    });
  });
});

describe('getAncestors', () => {
  test('send simple request', async () => {
    const person1 = { Name: 'Test-1' };
    const person2 = { Name: 'Test-2' };
    mockFetch([{ ancestors: [person1, person2] }]);

    const result = await getAncestors('Test-1');

    expect(result).toEqual([person1, person2]);
    const requestedData = mockedFetch.mock.calls[0][1].body as any as FormData;
    expectFormDataToContainData(requestedData, {
      format: 'json',
      action: 'getAncestors',
      key: 'Test-1',
    });
  });

  test('send request with arguments', async () => {
    const person1 = { Name: 'Test-1' };
    const person2 = { Name: 'Test-2' };
    mockFetch([{ ancestors: [person1, person2] }]);

    const result = await getAncestors('Test-1', {
      depth: 2,
      fields: ['Father', 'Mother'],
      bioFormat: 'html',
      resolveRedirect: true,
    });

    expect(result).toEqual([person1, person2]);
    const requestedData = mockedFetch.mock.calls[0][1].body as any as FormData;
    expectFormDataToContainData(requestedData, {
      format: 'json',
      action: 'getAncestors',
      key: 'Test-1',
      depth: '2',
      bioFormat: 'html',
      fields: 'Father,Mother',
      resolveRedirect: '1',
    });
  });
});

describe('getDescendants', () => {
  test('send simple request', async () => {
    const person1 = { Name: 'Test-1' };
    const person2 = { Name: 'Test-2' };
    mockFetch([{ descendants: [person1, person2] }]);

    const result = await getDescendants('Test-1');

    expect(result).toEqual([person1, person2]);
    const requestedData = mockedFetch.mock.calls[0][1].body as any as FormData;
    expectFormDataToContainData(requestedData, {
      format: 'json',
      action: 'getDescendants',
      key: 'Test-1',
    });
  });

  test('send request with arguments', async () => {
    const person1 = { Name: 'Test-1' };
    const person2 = { Name: 'Test-2' };
    mockFetch([{ descendants: [person1, person2] }]);

    const result = await getDescendants('Test-1', {
      depth: 2,
      fields: ['Father', 'Mother'],
      bioFormat: 'html',
      resolveRedirect: true,
    });

    expect(result).toEqual([person1, person2]);
    const requestedData = mockedFetch.mock.calls[0][1].body as any as FormData;
    expectFormDataToContainData(requestedData, {
      format: 'json',
      action: 'getDescendants',
      key: 'Test-1',
      depth: '2',
      bioFormat: 'html',
      fields: 'Father,Mother',
      resolveRedirect: '1',
    });
  });
});

describe('getRelatives', () => {
  test('send simple request', async () => {
    const person1 = { Name: 'Test-1' };
    const person2 = { Name: 'Test-2' };
    mockFetch([{ items: [{ person: person1 }, { person: person2 }] }]);

    const result = await getRelatives(['Test-1']);

    expect(result).toEqual([person1, person2]);
    const requestedData = mockedFetch.mock.calls[0][1].body as any as FormData;
    expectFormDataToContainData(requestedData, {
      format: 'json',
      action: 'getRelatives',
      keys: 'Test-1',
    });
  });

  test('send request with arguments', async () => {
    const person1 = { Name: 'Test-1' };
    const person2 = { Name: 'Test-2' };
    mockFetch([{ items: [{ person: person1 }, { person: person2 }] }]);

    const result = await getRelatives(['Test-1'], {
      fields: ['Father', 'Mother'],
      bioFormat: 'html',
      getChildren: true,
      getParents: true,
      getSiblings: true,
      getSpouses: true,
    });

    expect(result).toEqual([person1, person2]);
    const requestedData = mockedFetch.mock.calls[0][1].body as any as FormData;
    expectFormDataToContainData(requestedData, {
      format: 'json',
      action: 'getRelatives',
      keys: 'Test-1',
      getParents: 'true',
      getChildren: 'true',
      getSpouses: 'true',
      getSiblings: 'true',
      bioFormat: 'html',
      fields: 'Father,Mother',
    });
  });
});
