
# Install

```bash
$ npm install --save @celeri/body-parser
```



### Import

#### ES6 Modules

```javascript
import { bodyParser } from '@celeri/body-parser';
```

#### CommonJS Modules

```javascript
const { bodyParser } = require('@celeri/body-parser');
```



### Usage

```javascript
const parseBody = bodyParser();

serverOrEndpoint.use(parseBody);
```
