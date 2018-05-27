const sanitizer = require('sanitizer')

module.exports = options => {
    if (!options) options = {}
    options = {
        targets: {
            query: options.query || true,
            body: options.body || true,
            cookies: options.cookies || true
        },
        original: options.original || true,
        sanitizerFunction: options.sanitizerFunction || (input => sanitizer.escape(sanitizer.sanitize(input.trim())))
    }

    function sanitize (req, source) {
        if (!req[source] || Object.keys(req[source]).length === 0) return
        if (options.original) req.original[source] = {}
        for (let key in req[source]) {
            if (options.original) req.original[source][key] = req[source][key]
            req[source][key] = options.sanitizerFunction(req[source][key].trim())
        }
    }

    return (req, _, next) => {
        if (!req) return next()
        if (options.original) req.original = {}
        Object.keys(options.targets).forEach(n => sanitize(req, n))
        return next()
    }
}
