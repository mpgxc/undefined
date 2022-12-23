/* eslint-disable @typescript-eslint/no-unused-vars */

interface IEither<S, F> {
  value: S | F;
  hasError: boolean;
}

type Success<F, S> = IEither<unknown, S> & {
  value: S;
  hasError: false;
};

type Failure<F, S> = IEither<F, unknown> & {
  value: F;
  hasError: true;
};

type Either<F, S> = Failure<F, unknown> | Success<unknown, S>;

const success = <T>(value?: T): Success<unknown, T> => ({
  value: value as T,
  hasError: false,
});

const failure = <T>(value: T): Failure<T, unknown> => ({
  value,
  hasError: true,
});

export { Either, Success, Failure, success, failure };
