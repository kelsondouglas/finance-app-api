export class EmailAlreadyInUseError extends Error {
  constructor(email) {
    super(`Email ${email} is already in use.`);
  }
}

export class UserNotFoundError extends Error {
  constructor(userId) {
    super(`User with id ${userId} not found.`);
    this.name = "UserNotFoundError";
  }
}
