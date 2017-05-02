
import { BodyParserError } from 'parse-error';

export const bodyParser = () => {
	return ({ req }) => {
		return new Promise((resolve, reject) => {
			const chunks = [ ];
			
			req.on('data', (chunk) => {
				chunks[chunks.length] = chunk;
			});

			req.on('end', () => {
				const body = chunks.join('').trim();

				if (! body) {
					return resolve();
				}

				try {
					req.body = JSON.parse(body);
					resolve();
				}
				catch (err) {
					reject(new BodyParserError());
				}
			});
		});
	};
};
