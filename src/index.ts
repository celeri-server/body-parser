
import './extend-request';
import { BodyParserError } from './error';
import { MiddlewareFunction } from '@celeri/middleware-pipeline';
import { MiddlewareInput } from '@celeri/http-server';
import { parseSize } from './byte-size';
import { Parser, jsonParser } from './parsers';

export { BodyParserError } from './error';
export { Parser, jsonParser, plainTextParser } from './parsers';

interface Config {
	/** The max size allowed in the body. Defaults to '512kb'. */
	maxSize?: number | string,

	/** The parsers that can be used. Default to built-in JSON parser only */
	parsers?: {
		[contentType: string]: Parser
	}
}

const defaultConfig: Config = {
	maxSize: '512kb',
	parsers: {
		'application/json': jsonParser
	}
};

export const bodyParser = (config?: Config) : MiddlewareFunction<MiddlewareInput> => {
	const finalConfig = Object.assign({ }, defaultConfig, config || { });
	const maxSize = parseSize(finalConfig.maxSize);
	const parsers = finalConfig.parsers || { };

	return ({ req }) => {
		return new Promise((resolve, reject) => {
			const contentType = (req.headers['content-type'] || '').toLowerCase();
			const parser: Parser = parsers[contentType] || parsers['*'];

			if (! parser) {
				throw new BodyParserError(415, 'Unsupported media type');
			}

			let size: number = 0;
			let data: string = '';

			const onData = (chunk: string) : void => {
				const chunkSize = Buffer.byteLength(chunk);

				if (size + chunkSize > maxSize) {
					req.removeListener('data', onData);
					req.removeListener('end', onEnd);
					reject(new BodyParserError(413, 'Payload too large'));

					return;
				}

				data += chunk;
			};

			const onEnd = async () : Promise<void> => {
				if (! data) {
					return resolve();
				}

				try {
					req.body = await parser(data, req);
					resolve();
				}

				catch (error) {
					reject(BodyParserError.fromError(400, error));
				}
			};
			
			req.on('data', onData);
			req.on('end', onEnd);
		});
	};
};
