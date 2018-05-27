![](https://raw.githubusercontent.com/afrigon/express-auto-sanitize/master/banner.jpg)

![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)
![Download](https://img.shields.io/npm/dt/express-auto-sanitize.svg)

## Installation

```
npm i --save express-auto-sanitize
```

## Usage

Import the module with this declaration at the top of the file:

```javascript
const sanitizer = require('express-auto-sanitize')
```

Mount the middleware

```javascript
const options = {
    query: Boolean,
    body: Boolean,
    cookies: Boolean,
    original: Boolean, // will keep the original version in req.original
    sanitizerFunction: Function // use your personnal sanitizing algorithm
}
app.use(sanitizer(options))
```

**Note:** if you use the body option, make sure you mount the sanitizer between the [body-parser](https://www.npmjs.com/package/body-parser)/[cookie-parser](https://www.npmjs.com/package/cookie-parser) middleware and your routes declaration.

## Output

After the middleware has processed the input, the original version will be stored in ```req.original``` and the safe version will replace the dangerous input.

```javascript
app.get('/', (req, res) => {
    console.log(req.query.exampleParam) // safe and sanitized
    console.log(req.original.query.exampleParam) // potentially dangerous
})
```

## License

express-auto-sanitize is MIT licensed.
