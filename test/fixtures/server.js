const app = require('express')()
const server = require('http').createServer(app)
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const sanitize = require('../..')
const port = 8080

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(sanitize())

app.get('/', (req, res) => {
    const result = { query: req.query }
    if (req.query.original) result.original = req.original
    return res.json(result)
})

app.get('/cookies', (req, res) => {
    const result = { cookies: req.cookies }
    if (req.query.original) result.original = req.original
    return res.json(result)
})

app.post('/', (req, res) => {
    const result = { body: req.body }
    if (req.body.original) result.original = req.original
    return res.json(result)
})

app.use(sanitize({
    sanitizerFunction: input => 'abc'
}))

app.get('/custom', (req, res) => {
    const result = { query: req.query }
    if (req.query.original) result.original = req.original
    return res.json(result)
})

module.exports = {
    start: () => server.listen(port),
    close: () => server.close()
}
