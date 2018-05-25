const sanitizer = require('sanitizer')

module.exports = options => {
    options = options || {
        query: true,
        body: true,
        params: true,
        cookies: true
    }

    function sanitize (req, source) {
        if (req[source] && req[source].length > 0 && options[source]) {
            req.original[source] = req[source]
            req[source] = req[source].map(sanitizer.sanitize)
        }
    }

    return (req, _, next) => {
        if (!req) return next();
        Object.keys(options).forEach(n => sanitize(req, n))
        return next()
    }
}