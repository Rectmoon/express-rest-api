require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')
const authMiddleware = require('./middlewares/auth')()
const resourceMiddlleware = require('./middlewares/resource')()
const { auth, rest } = require('./routes/admin')

const app = express()
app.set('secret', '1lzxispretty2')

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB连接成功'))
  .catch(err => console.error(err))

app.use(express.json())
app.use('/admin/api/rest/:resource', authMiddleware, resourceMiddlleware, rest)
app.use('/admin/api/auth/', auth)

app.use((err, req, res) => {
  res.status(err.statusCode || 500).json({
    message: err.message
  })
})

app.listen(3000, () => console.log(`App is running at http://localhost:3000`))
