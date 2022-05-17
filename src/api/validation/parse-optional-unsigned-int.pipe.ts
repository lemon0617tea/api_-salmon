import { ArgumentMetadata, Injectable } from '@nestjs/common';
import { ParseOptionalIntPipe } from './parse-optional-int.pipe';

@Injectable()
export class ParseOptionalUnsignedIntPipe extends ParseOptionalIntPipe {
  /**
   * Method that accesses and performs optional transformation on argument for
   * in-flight requests.
   *
   * @param value currently processed route argument
   * @param metadata contains metadata about the currently processed route argument
   */
  async transform(value: string, metadata: ArgumentMetadata): Promise<number> {
    const intValue = await super.transform(value, metadata);
    if (intValue < 0) {
      throw this.exceptionFactory(
        `Validation failed (${metadata.data} is expected unsigned integer)`,
      );
    }
    return intValue;
  }
}
