
import { Request } from '@celeri/http-server';

declare module '@celeri/http-server' {
	interface Request {
		body?: any
	}
}
