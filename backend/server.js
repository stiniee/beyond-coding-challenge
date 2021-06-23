const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { initState } = require('./utils')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const state = initState()

app.get('/listings', (_, res) => res.send(require('./listings.json')))

app.get('/calendar/:id(1|2|3)', (req, res) =>
    res.send(state.listings[req.params.id - 1])
)

app.post('/calendar/:id(1|2|3)', (req, res) => {
    const basePrice = req.body && req.body.basePrice

    if (basePrice && Number.isFinite(basePrice)) {
        state.listings[req.params.id - 1].basePrice = basePrice
        res.send({ status: 'ok' })
    } else {
        res.sendStatus(400)
    }
})

app.listen(1024, () => {
    // eslint-disable-next-line
  console.log('Backend server is listening on http://127.0.0.1:1024');
})
