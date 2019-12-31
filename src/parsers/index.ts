
export { jsonParser } from './json';
export { plainTextParser } from './plain';
export { urlencodedParser } from './urlencoded';

import { Request } from '@celeri/http-server';

export interface Parser {
	(body: string, req: Request): any | Promise<any>;
}
