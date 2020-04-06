class HTTPError extends Error {
  readonly status: number;
  readonly message: string;
}

export class NotFound extends HTTPError {
  readonly status: number = 404;
  readonly message: string = 'Not Found';
}

export class NotLoggedIn extends HTTPError {
  status = 401;
  message = 'In order to access this api, you must be logged in.';
}

export class NeedAuthority extends HTTPError {
  status = 401;
  message = 'You have not enough authority to access this api.';
}
