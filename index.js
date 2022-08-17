const Joi = require('joi')
const express = require('express')
const app = express()

require('dotenv').config()
const PORT = process.env.PORT || 3000

const clients = [
  { name: 'Cesar', age: 25, id: 1 },
  { name: 'Laura', age: 30, id: 2 },
  { name: 'Victor', age: 23, id: 3 },
  { name: 'Oscar', age: 27, id: 4 }
]

const requestTime = function (req, res, next) {
  const requestTime = new Date(Date.now()).toString()
  console.log(`Requested at: ${requestTime}`)
  next()
}

app.use(requestTime)
app.use(express.json())

// Get all clients
app.get('/clients', (req, res) => {
  res.send(clients)
})

// Get client by id
app.get('/clients/:id', (req, res) => {
  const client = clients.find(item => item.id === parseInt(req.params.id))
  if (!client) return res.status(404).send('The client with the given id was not found')
  res.send(client)
})

app.post('/clients', (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    age: Joi.number().required()
  })

  const result = schema.validate(req.body)
  console.log(result)

  if (result.error) return res.status(400).send(result.error.details[0].message)

  const client = {
    id: clients.length + 1,
    name: req.body.name,
    age: req.body.age
  }

  clients.push(client)
  console.log('Client was created successfully')
  res.send(
    {
      message: 'client was created successfully',
      client
    }
  )
})

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`)
})
