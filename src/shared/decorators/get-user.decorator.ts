import { createParamDecorator } from '@nestjs/common';

// Decorators are PascalCase by nestjs convention
/* tslint:disable-next-line variable-name */
export const GetUser = createParamDecorator((_data: any, req) => req.user);
