export class NotFoundError {
  readonly __typename = 'NotFoundError';

  public constructor(
    readonly message: string,
    readonly notFoundTypename: string,
    readonly notFoundId: string
  ) {}
}
