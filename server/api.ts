const express = require('express')
const bodyParser = require('body-parser')

// routes
const authRouter = require('./routes/auth')

const app = express()

app.use(bodyParser.json())

app.use((req: any, res: any, next: any) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  )
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

app.use('/api/auth/', authRouter)

app.use((error: any, req: any, res: any, next: any) => {
  console.log(error)
  const status = error.statusCode || 500
  const message = error.message
  const data = error.data
  res.status(status).json({ message: message, data: data })
})
