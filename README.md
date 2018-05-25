![](https://raw.githubusercontent.com/afrigon/express-auto-sanitize/master/banner.jpg)

![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)

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
