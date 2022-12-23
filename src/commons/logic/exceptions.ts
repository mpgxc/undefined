type ApplicationErrorProps = {
  type: string;
  message: string;
};

abstract class AppError extends Error {
  constructor(
    public readonly message: string,
    public readonly name: string,
    public readonly type: string,
  ) {
    super(message);
  }
}

class ApplicationError extends AppError {
  private constructor({ message, type }: ApplicationErrorProps) {
    super(message, 'ApplicationError', type);
  }

  get formatedMessage() {
    return `${this.name} - <${this.type}> - ${this.message}`;
  }

  static build({ message, type }: ApplicationErrorProps) {
    return new this({
      message,
      type,
    });
  }
}

export { AppError, ApplicationError };
