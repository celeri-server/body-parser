
export class BodyParserError extends Error {
	static fromError(code: number, error: Error) : BodyParserError {
		const newError = new BodyParserError(code, error.message);

		newError.stack = error.stack;

		return newError;
	}

	public readonly code: number;

	constructor(code: number, message: string) {
		super(message);

		this.code = code;
	}

	get type() {
		return this.constructor.name;
	}
}
