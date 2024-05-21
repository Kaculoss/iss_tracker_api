require('dotenv').config({ path: __dirname + '/../.env' })

const express = require('express')
const { createServer } = require('http')
const { graphqlHTTP } = require('express-graphql')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')

const schema = require('./schema/internal')
const externalSchema = require('./schema/external')
const Jwt = require('./helpers/jwt')

const app = express()
const server = createServer(app)
const env = process.env.NODE_ENV

// Middlewares
app.use(cors())
app.use(helmet())
app.use(morgan('combined'))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))

// GraphQL middleware
const context = async (req, target = 'internal') => {
  const { authorization } = req.headers
  const token = authorization === undefined ? '' : authorization.split(' ')[1]
  const user = await Jwt.verifyToken(token, target)
  return { user }
}

app.use(
  '/graphql',
  graphqlHTTP(async (req) => ({
    schema,
    context: () => context(req, 'internal')
  }))
)

app.use(
  '/v1',
  graphqlHTTP(async (req) => ({
    schema: externalSchema,
    context: () => context(req, 'external')
  }))
)

// Test route
app.get('/', (_, res) =>
  res.status(200).json({
    message: `🚀 ${env.replace(/^./, env[0].toUpperCase())} server is running`
  })
)

module.exports = server
