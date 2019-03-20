
const kb = 1024;
const mb = 1024 * kb;
const gb = 1024 * mb;

const sizeRegex = /^([0-9]+)(kb|mb|gb)$/i;

/**
 * Parses a size value into a number of bytes. Accepts a number of bytes, or
 * a number suffixed by "kb", "mb", or "gb". (eg. "10kb" => 10240).
 *
 * @param size The size value to be parsed
 */
export const parseSize = (size: string | number) : number => {
	if (typeof size === 'number') {
		return size;
	}

	const result = sizeRegex.exec(size);

	if (! result) {
		throw new Error(`Invalid value ${size} provided`);
	}

	const unit = result[2];
	const count = parseFloat(result[1]);

	switch (unit) {
		case 'kb': return count * kb;
		case 'mb': return count * mb;
		case 'gb': return count * gb;
	}
};
