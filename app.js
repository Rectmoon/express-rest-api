require('dotenv').config()
const path = require('path')
const mongoose = require('mongoose')
const express = require('express')
const authMiddleware = require('./middlewares/auth')()
const resourceMiddlleware = require('./middlewares/resource')()
const { auth, rest } = require('./routes/admin')

const app = express()
const SECRET = process.env.SECRET || '123'
const PORT = process.env.PORT || 3000

app.set('secret', SECRET)

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB连接成功'))
  .catch(err => console.error(err))

mongoose.set('useFindAndModify', false)

app.use(express.json())
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use('/admin/api/rest/:resource', authMiddleware, resourceMiddlleware, rest)
app.use('/admin/api/auth/', auth)

app.use((err, req, res, next) => {
  console.error(err.message)
  res.status(err.statusCode || 500).send({
    error: err.message
  })
})

app.listen(PORT, () => console.log(`App is running at http://localhost:${PORT}`))
