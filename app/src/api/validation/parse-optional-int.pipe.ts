import {
  ArgumentMetadata,
  HttpStatus,
  Injectable,
  Optional,
  ParseIntPipe,
  PipeTransform,
} from '@nestjs/common';
import {
  ErrorHttpStatusCode,
  HttpErrorByCode,
} from '@nestjs/common/utils/http-error-by-code.util';

export interface ParseOptionalIntPipeOptions {
  errorHttpStatusCode?: ErrorHttpStatusCode;
  exceptionFactory?: (error: string) => any;
  required?: boolean;
  default?: number;
}

/**
 * Defines the built-in ParseInt Pipe
 *
 * @see [Built-in Pipes](https://docs.nestjs.com/pipes#built-in-pipes)
 *
 * @publicApi
 */
@Injectable()
export class ParseOptionalIntPipe implements PipeTransform<string> {
  protected exceptionFactory: (error: string) => any;
  protected required?: boolean;
  protected default?: number;

  constructor(@Optional() options?: ParseOptionalIntPipeOptions) {
    options = options || {};
    const { exceptionFactory, errorHttpStatusCode = HttpStatus.BAD_REQUEST } =
      options;
    this.required = options.required ?? true;
    this.default = options.default;
    this.exceptionFactory =
      exceptionFactory ||
      ((error) => new HttpErrorByCode[errorHttpStatusCode](error));
  }

  /**
   * Method that accesses and performs optional transformation on argument for
   * in-flight requests.
   *
   * @param value currently processed route argument
   * @param metadata contains metadata about the currently processed route argument
   */
  async transform(value: string, metadata: ArgumentMetadata): Promise<number> {
    const isNumeric =
      ['string', 'number'].includes(typeof value) &&
      /^-?\d+$/.test(value) &&
      isFinite(value as any);
    if (!isNumeric) {
      console.log(this.required, this.default, value);
      if (!this.required) {
        return this.default || undefined;
      }
      if (isNaN(Number(value))) {
        throw this.exceptionFactory(
          `Validation failed (${metadata.data} is required)`,
        );
      }
      throw this.exceptionFactory(
        'Validation failed (numeric string is expected)',
      );
    }
    return parseInt(value, 10);
  }
}
