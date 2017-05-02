
export class BodyParserError extends Error {
	get type() {
		return this.constructor.name;
	}

	constructor() {
		super('Failed to parse JSON body');
	}
}
