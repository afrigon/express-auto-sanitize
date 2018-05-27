const server = require('./fixtures/server')
const request = require('request')
const { expect } = require('chai')
const host = 'http://localhost:8080'

before(server.start)

describe('Query input', () => {
    it('removes script tags', (callback) => {
        request(`${host}?xss=<script></script>123`, (err, res, data) => {
            expect(JSON.parse(data)).to.deep.equal({ query: { xss: '123' } })
            return callback()
        })
    })

    it('stores original values', (callback) => {
        request(`${host}?original=true&xss=<script></script>123`, (err, res, data) => {
            expect(JSON.parse(data)).to.deep.equal({
                query: {
                    xss: '123',
                    original: 'true'
                },
                original: {
                    query: {
                        xss: '<script></script>123',
                        original: 'true'
                    }
                }
            })
            return callback()
        })
    })
})

describe('Body input', () => {
    it('removes script tags', (callback) => {
        request.post(`${host}`, {
            form: { xss: '<script></script>123' }
        }, (err, res, data) => {
            expect(JSON.parse(data)).to.deep.equal({ body: { xss: '123' } })
            return callback()
        })
    })

    it('stores original values', (callback) => {
        request.post(`${host}`, {
            form: {
                original: true,
                xss: '<script></script>123'
            }
        }, (err, res, data) => {
            expect(JSON.parse(data)).to.deep.equal({
                body: {
                    xss: '123',
                    original: 'true'
                },
                original: {
                    body: {
                        xss: '<script></script>123',
                        original: 'true'
                    }
                }
            })
            return callback()
        })
    })
})

describe('Cookies input', () => {
    it('removes script tags', (callback) => {
        request(`${host}/cookies`, {
            headers: { 'Cookie': 'xss=<script></script>123' }
        }, (err, res, data) => {
            expect(JSON.parse(data)).to.deep.equal({ cookies: { xss: '123' } })
            return callback()
        })
    })

    it('stores original values', (callback) => {
        request(`${host}/cookies?original=true`, {
            headers: { 'Cookie': 'xss=<script></script>123' }
        }, (err, res, data) => {
            expect(JSON.parse(data)).to.deep.equal({
                cookies: { xss: '123' },
                original: {
                    cookies: { xss: '<script></script>123' },
                    query: { original: 'true' }
                }
            })
            return callback()
        })
    })
})

describe('Custom sanitizer function', () => {
    it('uses the custom function', (callback) => {
        request(`${host}/custom?xss=123`, (err, res, data) => {
            expect(JSON.parse(data)).to.deep.equal({ query: { xss: 'abc' } })
            return callback()
        })
    })
})

after(server.close)
