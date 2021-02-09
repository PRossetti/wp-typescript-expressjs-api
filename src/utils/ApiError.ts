import { ValidationErrorItem } from 'joi';

export default class ApiError extends Error {
  public code: number;
  public tags: string[];
  public details: ValidationErrorItem[];

  constructor({
    message,
    code,
    stack,
    tags,
    details,
  }: {
    message?: string;
    code?: number;
    stack?: string;
    tags?: string[];
    details?: ValidationErrorItem[];
  }) {
    super(message);

    if (stack) {
      super.stack = stack;
    }

    this.code = code;
    this.tags = tags;
    this.details = details;
  }
}
