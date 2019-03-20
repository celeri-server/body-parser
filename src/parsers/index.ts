
export { jsonParser } from './json';
export { plainTextParser } from './plain';

import { Request } from '@celeri/http-server';

export interface Parser {
	(body: string, req: Request): any | Promise<any>;
}
