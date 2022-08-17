const express = require('express')
const app = express()
require('dotenv').config()

const PORT = process.env.PORT || 3000

const requestTime = function (req, res, next) {
  req.requestTime = Date.now()
  next()
}

app.use(requestTime)

app.get('/', (req, res) => {
  let responseText = 'Hello World!<br>'
  const dateFormat = new Date(req.requestTime).toString()
  responseText += `<small>Requested at: ${dateFormat}</small>`
  console.log(`Requested at: ${dateFormat}`)
  res.send(responseText)
})

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`)
})
