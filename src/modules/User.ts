export abstract class AbstractUser {
  readonly pid: bigint;
  readonly email: string;
  readonly pw: string;
  readonly name: string;
  readonly grade: number;
  readonly class: number;
  readonly number: number;
  readonly suspended_until: Date;
  readonly created_at: Date;

  constructor(json: string = '') {
    if (json) Object.assign(this, JSON.parse(json));
  }
}

export class User extends AbstractUser {
  constructor(json: string) {
    super(json);
  }
}

export class AnonymousUser extends AbstractUser {
  constructor() {
    super();
  }
}
