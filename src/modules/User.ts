import { UserAttribute } from '../models/User';

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

  protected constructor(json: object = {}) {
    if (json) Object.assign(this, json);
  }

  public authority(): Authority {
    if (this.grade > 0) return Authority.STUDENT;
    else if (this.class === 0) return Authority.PARENT;
    else if (this.class === 1) return Authority.TEACHER;
    else if (this.class === 2) return Authority.DORMITORY;
    else return Authority.ANONYMOUS;
  }

  public isSuspended(): boolean {
    return this.suspended_until >= new Date()
  }
}

export class User extends AbstractUser {
  constructor(json: UserAttribute) {
    super(json.toJSON());
  }
}

export class AnonymousUser extends AbstractUser {
  constructor() {
    super();
  }

  authority(): Authority {
    return Authority.ANONYMOUS;
  }
}

export enum Authority {
  STUDENT,
  PARENT,
  TEACHER,
  DORMITORY,
  ANONYMOUS
}
