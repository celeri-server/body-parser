
export const bodyParser = () => {
	return ({ req, res }) => {
		return new Promise((resolve, reject) => {
			const chunks = [ ];
			
			req.on('data', (chunk) => {
				chunks[chunks.length] = chunk;
			});

			req.on('end', () => {
				const body = chunks.join('').trim();

				if (! body) {
					return resolve({ req, res });
				}

				try {
					req.body = JSON.parse(body);
					resolve({ req, res });
				}
				catch (err) {
					reject(err);
				};
			});
		});
	};
};
