import Cookies from 'js-cookie';
import { fetch } from 'cross-fetch';
import FormData from 'form-data';
import {
  BioFormat,
  ClientLoginResponse,
  GetAncestorsRequest,
  GetDescendantsRequest,
  GetPersonRequest,
  GetRelativesRequest,
  Person,
  PersonField,
  WikiTreeRequest,
} from './wikitree_types';

/** Default API URL if not explicitly specified. */
const WIKITREE_API_URL = 'https://api.wikitree.com/api.php';

/** Default appId sent if not explicitly specified. */
const WIKITREE_JS_APPID = 'wikitree-js';

/**
 * Cookie where the logged in user name is stored. This cookie is shared
 * between apps hosted on apps.wikitree.com. It is not used to authenticate
 * requests but only to allow displaying what user is logged in.
 * Authentication cookies are stored when the user logs in via
 * https://api.wikitree.com/api.php
 */
const USER_NAME_COOKIE = 'wikidb_wtb_UserName';

/** Wraps an error returned from the WikiTree API. */
export class WikiTreeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'WikiTreeError';
  }
}

export interface WikiTreeAuthentication {
  cookies: string;
}

/** Additional API options common to all requests. */
export interface ApiOptions {
  /** Authentication credentials as returned by the login() function. */
  auth?: WikiTreeAuthentication;
  /** Alternative API URL. */
  apiUrl?: string;
  /** Application id used for statistical purposes. */
  appId?: string;
}

/** Sends a request to the WikiTree API. Returns the raw response. */
export async function fetchWikiTree(
  request: WikiTreeRequest,
  options?: ApiOptions
) {
  const requestData = new FormData();
  requestData.append('format', 'json');
  requestData.append('appId', options?.appId ?? WIKITREE_JS_APPID);
  for (const key in request) {
    if (request[key]) {
      requestData.append(key, request[key]);
    }
  }
  const apiUrl = options?.apiUrl || WIKITREE_API_URL;
  const postRequest: RequestInit = {
    method: 'POST',
    redirect: 'manual', // required for NodeJS login
    body: requestData as any,
    credentials: isWikiTreeUrl(apiUrl) ? 'include' : undefined,
  };
  if (options?.auth) {
    postRequest.headers = { Cookie: options.auth.cookies };
  }
  return await fetch(apiUrl, postRequest);
}

/** Sends a request to the WikiTree API. Returns the parsed response JSON. */
export async function wikiTreeGet(
  request: WikiTreeRequest,
  options?: ApiOptions
) {
  const response = await fetchWikiTree(request, options);
  const result = await response.json();
  if (result[0]?.status) {
    throw new WikiTreeError(result[0].status);
  }
  return result;
}

/** Optional arguments for the GetPerson API call. */
export interface GetPersonArgs {
  bioFormat?: BioFormat;
  fields?: Array<PersonField> | '*';
  resolveRedirect?: boolean;
}

/**
 * Retrieves a single person record from WikiTree.
 *
 * See also: https://github.com/wikitree/wikitree-api/blob/main/getPerson.md
 */
export async function getPerson(
  key: string,
  args?: GetPersonArgs,
  options?: ApiOptions
): Promise<Person> {
  const request: GetPersonRequest = {
    action: 'getPerson',
    key,
    bioFormat: args?.bioFormat,
    fields:
      args?.fields instanceof Array ? args.fields.join(',') : args?.fields,
    resolveRedirect: args?.resolveRedirect ? '1' : undefined,
  };
  const response = await wikiTreeGet(request, options);
  return response[0].person as Person;
}

/** Optional arguments for the GetAncestors API call. */
interface GetAncestorsArgs {
  depth?: number;
  bioFormat?: BioFormat;
  fields?: Array<PersonField> | '*';
  resolveRedirect?: boolean;
}

/**
 * Retrieves ancestors from WikiTree for the given person ID.
 *
 * See also: https://github.com/wikitree/wikitree-api/blob/main/getAncestors.md
 */
export async function getAncestors(
  key: string,
  args?: GetAncestorsArgs,
  options?: ApiOptions
): Promise<Person[]> {
  const request: GetAncestorsRequest = {
    action: 'getAncestors',
    key,
    depth: args?.depth,
    bioFormat: args?.bioFormat,
    fields:
      args?.fields instanceof Array ? args.fields.join(',') : args?.fields,
    resolveRedirect: args?.resolveRedirect ? '1' : undefined,
  };
  const response = await wikiTreeGet(request, options);
  return response[0].ancestors as Person[];
}

/** Optional arguments for the GetRelatives API call. */
export interface GetRelativesArgs {
  getParents?: boolean;
  getChildren?: boolean;
  getSpouses?: boolean;
  getSiblings?: boolean;
  bioFormat?: BioFormat;
  fields?: Array<PersonField> | '*';
}

/** Optional arguments for the GetDescendants API call. */
interface GetDescendantsArgs {
  depth?: number;
  bioFormat?: BioFormat;
  fields?: Array<PersonField> | '*';
  resolveRedirect?: boolean;
}

/**
 * Retrieves descendants from WikiTree for the given person ID.
 *
 * See also: https://github.com/wikitree/wikitree-api/blob/main/getDescendants.md
 */
export async function getDescendants(
  key: string,
  args?: GetDescendantsArgs,
  options?: ApiOptions
): Promise<Person[]> {
  const request: GetDescendantsRequest = {
    action: 'getDescendants',
    key,
    depth: args?.depth,
    bioFormat: args?.bioFormat,
    fields:
      args?.fields instanceof Array ? args.fields.join(',') : args?.fields,
    resolveRedirect: args?.resolveRedirect ? '1' : undefined,
  };
  const response = await wikiTreeGet(request, options);
  return response[0].descendants as Person[];
}

/**
 * Retrieves relatives from WikiTree for the given array of person IDs.
 * If a key does not exist or is inaccessible, it is omitted in the result.
 *
 * See also: https://github.com/wikitree/wikitree-api/blob/main/getRelatives.md
 */
export async function getRelatives(
  keys: string[],
  args?: GetRelativesArgs,
  options?: ApiOptions
): Promise<Person[]> {
  if (args?.bioFormat && !args?.fields?.includes('Bio')) {
    console.warn(
      'Setting bioFormat has no effect if the "Bio" field is not requested' +
        ' explicitly'
    );
  }
  const request: GetRelativesRequest = {
    action: 'getRelatives',
    keys: keys.join(','),
    getParents: args?.getParents ? 'true' : undefined,
    getChildren: args?.getChildren ? 'true' : undefined,
    getSpouses: args?.getSpouses ? 'true' : undefined,
    getSiblings: args?.getSiblings ? 'true' : undefined,
    bioFormat: args?.bioFormat,
    fields:
      args?.fields instanceof Array ? args.fields.join(',') : args?.fields,
  };
  const response = await wikiTreeGet(request, options);
  if (response[0].items === null) {
    return [];
  }
  return response[0].items.map(
    (item: { person: Person }) => item.person
  ) as Person[];
}

/**
 * Returns the logged in user name or undefined if not logged in.
 *
 * In the browser, call this function without arguments.
 * This is not an authoritative answer. The result of this function relies on
 * the cookies set on the apps.wikitree.com domain under which this application
 * is hosted. The authoritative source of login information is in cookies set on
 * the api.wikitree.com domain.
 *
 * In Node.js, call this function with the auth parameter. This is an
 * authoritative answer because the login flow is under control of the
 * wikitree-js library.
 */
export function getLoggedInUserName(
  auth?: WikiTreeAuthentication
): string | undefined {
  if (!auth) {
    // Return user name stored in browser cookies.
    return Cookies.get(USER_NAME_COOKIE);
  }

  // Extract user name from cookies in WikiTreeAuthentication.
  const regex = new RegExp(`${USER_NAME_COOKIE}=(.*?);`);
  const match = auth.cookies.match(regex);
  return match ? match[1] : undefined;
}

// === Browser-specific code ===

/**
 * Navigates to WikiTree login screen at https://api.wikitree.com/api.php with
 * the specified return URL.
 */
export function navigateToLoginPage(returnUrl: string) {
  if (!isWikiTreeUrl(returnUrl)) {
    console.warn(
      'Return URLs outside of the wikitree.com domain will not work with the' +
        " WikiTree login flow because of WikiTree API's CORS settings."
    );
  }
  const form = document.createElement('form');
  form.setAttribute('action', WIKITREE_API_URL);
  form.setAttribute('method', 'POST');
  form.setAttribute('hidden', 'true');

  const actionInput = document.createElement('input');
  actionInput.setAttribute('name', 'action');
  actionInput.setAttribute('type', 'hidden');
  actionInput.setAttribute('value', 'clientLogin');

  const returnUrlInput = document.createElement('input');
  returnUrlInput.setAttribute('name', 'returnURL');
  returnUrlInput.setAttribute('type', 'hidden');
  returnUrlInput.setAttribute('value', returnUrl);

  form.appendChild(actionInput);
  form.appendChild(returnUrlInput);
  document.body.appendChild(form);
  form.submit();
}

export async function clientLogin(
  authcode: string,
  options?: ApiOptions
): Promise<ClientLoginResponse> {
  const response = await wikiTreeGet(
    {
      action: 'clientLogin',
      authcode,
    },
    options
  );
  const result = response.clientLogin;
  if (result.result === 'Success') {
    Cookies.set(USER_NAME_COOKIE, result.username);
  }
  return result;
}

// === Node.js-specific code ===

/**
 * Logs in to WikiTree returning authentication credentials.
 * This function will not work in the browser because it handles cookies directly.
 * Throws an exception if login fails.
 */
export async function login(
  email: string,
  password: string,
  options?: ApiOptions
): Promise<WikiTreeAuthentication> {
  const authcode = await getAuthcode(email, password, options);
  return { cookies: await getAuthCookies(authcode, options) };
}

async function getAuthcode(
  email: string,
  password: string,
  options?: ApiOptions
): Promise<string> {
  const response = await fetchWikiTree(
    {
      action: 'clientLogin',
      doLogin: 1,
      returnURL: 'https://x/',
      wpEmail: email,
      wpPassword: password,
    } as any,
    options
  );
  if (response.status !== 302) {
    throw new WikiTreeError('Invalid login credentials');
  }
  return response.headers.get('location')!.replace('https://x/?authcode=', '');
}

async function getAuthCookies(
  authcode: string,
  options?: ApiOptions
): Promise<string> {
  const response = await fetchWikiTree(
    {
      action: 'clientLogin',
      authcode,
    },
    options
  );
  const result = await response.json();
  if (result.clientLogin?.result !== 'Success') {
    throw new WikiTreeError('Could not authorize authcode');
  }
  return response.headers.get('set-cookie');
}

function isWikiTreeUrl(url: string) {
  return url.match(/^https:\/\/[^/]*wikitree.com\/.*/);
}
