import * as e from 'express';

import { ISessionUser } from '@src/models/user';

// **** Express **** //

export interface IReq<T = void> extends e.Request {
  body: {
    name: string;
    password: string;
    button: string;
  };
}

export interface IRes extends e.Response {
  locals: {
    sessionUser?: ISessionUser;
  };
}
