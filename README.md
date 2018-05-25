[![npm](https://img.shields.io/npm/dm/express-sanitizer.svg?style=flat-square)](https://github.com/markau/express-auto-sanitize) 
[![npm](https://img.shields.io/npm/v/express-sanitizer.svg?style=flat-square)](https://github.com/markau/express-auto-sanitize)
[![npm](https://img.shields.io/npm/l/express.svg?style=flat-square)](https://github.com/markau/express-sanitizer)
[![dependencies](https://david-dm.org/markau/express-sanitizer.svg?style=flat-square)](https://david-dm.org/markau/express-sanitizer)

# express-auto-sanitize

An express middleware to auto sanitize user inputs

## Installation

```
npm install --save express-auto-sanitize
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
    params: Boolean,
    cookies: Boolean
}
app.use(sanitizer(options))
```

**Note:** make sure you mount the sanitizer between the [body-parser](https://www.npmjs.com/package/body-parser) middleware and your routes declaration.

## Output

After the middleware has processed the user's input the original input will be stored in ```req.original``` and the safe input will take place of the dangerous input.

```javascript
app.get('/', (req, res) => {
    console.log(req.query.exampleParam) // safe and sanitized
    console.log(req.original.query.exampleParam) // potentially dangerous
})
```

## License

express-auto-sanitize is MIT licensed.
