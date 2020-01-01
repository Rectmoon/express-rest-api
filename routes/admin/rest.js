const express = require('express')
const router = express.Router()
const resultMiddlleware = require('../../middlewares/result')

router.get('/', async (req, res) => {
  res.json(await req.model.find())
})

router.get('/:id', resultMiddlleware, (req, res) => {
  res.json(res.result)
})

module.exports = router
