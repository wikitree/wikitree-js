export interface Profile {
  Id: string;
  Name: string;
  PageId: string;
  IsManager: 0 | 1;
}

/**
 * Person structure returned from WikiTree API.
 *
 * See also: https://github.com/wikitree/wikitree-api/blob/main/getProfile.md#results
 */
export interface Person {
  Id: number;
  PageId: number;
  Name: string;
  IsPerson: 0 | 1;
  FirstName: string;
  MiddleName: string;
  MiddleInitial: string;
  LastNameAtBirth: string;
  LastNameCurrent: string;
  Nicknames: string;
  LastNameOther: string;
  RealName: string;
  Prefix: string;
  Suffix: string;
  ShortName: string;
  BirthNamePrivate: string;
  LongNamePrivate: string;
  LongName: string;
  BirthName: string;
  BirthDate: string;
  DeathDate: string;
  BirthLocation: string;
  DeathLocation: string;
  BirthDateDecade: string;
  DeathDateDecade: string;
  Gender: string;
  Photo: string;
  IsLiving: 0 | 1;
  Touched: string;
  Created: string;
  Privacy: number;
  Manager: number;
  HasChildren: 0 | 1;
  NoChildren: 0 | 1;
  DataStatus?: {
    Spouse: string | null;
    Father: string | null;
    Mother: string | null;
    FirstName: string | null;
    MiddleName: string | null;
    LastNameCurrent: string | null;
    RealName: string | null;
    LastNameOther: string | null;
    Gender: string | null;
    BirthDate: string | null;
    DeathDate: string | null;
    BirthLocation: string | null;
    DeathLocation: string | null;
    Photo: string | null;
    Prefix: string | null;
    Nicknames: string | null;
    Suffix: string | null;
    LastNameAtBirth: string | null;
    ColloquialName: string | null;
  };
  IsRedirect: 0 | 1;
  TrustedList: Profile[];
  Managers: Profile[];
  Connected: 0 | 1;
  Categories: string[];
  Privacy_IsPrivate: boolean;
  Privacy_IsPublic: boolean;
  Privacy_IsOpen: boolean;
  Privacy_IsAtLeastPublic: boolean;
  Privacy_IsSemiPrivate: boolean;
  Privacy_IsSemiPrivateBio: boolean;
  PhotoData?: {
    path: string;
    url: string;
    file: string;
    dir: string;
    width: number;
    height: number;
    orig_width: number;
    orig_height: number;
  };
  Mother: number;
  Father: number;
  marriage_location: string;
  marriage_date: string;
  Parents?: { [key: string]: Person };
  Children?: { [key: string]: Person };
  Spouses?: { [key: string]: Person };
  Siblings?: { [key: string]: Person };
  bio?: string;
  bioHTM?: string;
}

export type PersonField =
  | 'Id'
  | 'PageId'
  | 'Name'
  | 'IsPerson'
  | 'FirstName'
  | 'MiddleName'
  | 'MiddleInitial'
  | 'LastNameAtBirth'
  | 'LastNameCurrent'
  | 'Nicknames'
  | 'LastNameOther'
  | 'RealName'
  | 'Prefix'
  | 'Suffix'
  | 'BirthDate'
  | 'DeathDate'
  | 'BirthLocation'
  | 'DeathLocation'
  | 'BirthDateDecade'
  | 'DeathDateDecade'
  | 'Gender'
  | 'Photo'
  | 'IsLiving'
  | 'Touched'
  | 'Created'
  | 'Privacy'
  | 'Manager'
  | 'HasChildren'
  | 'NoChildren'
  | 'DataStatus'
  | 'IsRedirect'
  | 'TrustedList'
  | 'Managers'
  | 'Connected'
  | 'Categories'
  | 'Bio'
  | 'Father'
  | 'Mother'
  | 'Derived.LongName';

/** Format of the biography field. */
export type BioFormat = 'wiki' | 'html' | 'both';

/**
 * WikiTree API getPerson request.
 *
 * See also: https://github.com/wikitree/wikitree-api/blob/main/getPerson.md
 */
export interface GetPersonRequest {
  appId?: string;
  action: 'getPerson';
  key: string;
  bioFormat?: BioFormat;
  fields?: string;
  resolveRedirect?: '1';
}

/**
 * WikiTree API getAncestors request.
 *
 * See also: https://github.com/wikitree/wikitree-api/blob/main/getAncestors.md
 */
export interface GetAncestorsRequest {
  appId?: string;
  action: 'getAncestors';
  key: string;
  depth?: number;
  bioFormat?: BioFormat;
  fields?: string;
  resolveRedirect?: '1';
}

/**
 * WikiTree API getDescendants request.
 *
 * See also: https://github.com/wikitree/wikitree-api/blob/main/getDescendants.md
 */
export interface GetDescendantsRequest {
  appId?: string;
  action: 'getDescendants';
  key: string;
  depth?: number;
  bioFormat?: BioFormat;
  fields?: string;
  resolveRedirect?: '1';
}

/**
 * WikiTree API getRelatives request.
 *
 * See also: https://github.com/wikitree/wikitree-api/blob/main/getRelatives.md
 */
export interface GetRelativesRequest {
  appId?: string;
  action: 'getRelatives';
  keys: string;
  getParents?: 'true';
  getChildren?: 'true';
  getSpouses?: 'true';
  getSiblings?: 'true';
  bioFormat?: BioFormat;
  fields?: string;
}

/** WikiTree API clientLogin request. */
export interface ClientLoginRequest {
  appId?: string;
  action: 'clientLogin';
  authcode: string;
}

export type WikiTreeRequest =
  | ClientLoginRequest
  | GetPersonRequest
  | GetAncestorsRequest
  | GetDescendantsRequest
  | GetRelativesRequest;

/** WikiTree API clientLogin response. */
export interface ClientLoginResponse {
  result: string;
  username: string;
}
