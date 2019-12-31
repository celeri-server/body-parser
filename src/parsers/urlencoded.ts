
import { parse } from 'querystring';

export const urlencodedParser = (body: string) => {
	return parse(body, '&', '=', {
		maxKeys: 0
	});
};
