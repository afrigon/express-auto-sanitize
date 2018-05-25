const sanitizer = require('sanitizer')

module.exports = options => {
    options = {
        query: options.query || true,
        body: options.body || true,
        params: options.params || true,
        cookies: options.cookies || true,
        original: options.original || true
    }

    function sanitize (req, source) {
        if (req[source] && req[source].length > 0 && options[source]) {
            if (options.original) req.original[source] = req[source]
            req[source] = req[source].map(sanitizer.sanitize)
        }
    }

    return (req, _, next) => {
        if (!req) return next();
        Object.keys(options).forEach(n => sanitize(req, n))
        return next()
    }
}