const express = require('express')
const router = express.Router()
const resultMiddlleware = require('../../middlewares/result')

// 创建
router.post('/', async (req, res) => {
  try {
    res.status(201).json({ data: await req.model.create(req.body) })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// 删除
router.delete('/:id', async (req, res) => {
  await req.model.findByIdAndDelete(req.params.id)
  res.json({ data: req.params.id })
})

// 更新
router.put('/:id', async (req, res) => {
  try {
    await req.model.findByIdAndUpdate(req.params.id, req.body)
    res.json({ data: req.params.id })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// 列表
router.get('/', async (req, res) => {
  res.json({ data: await req.model.find() })
})

// 详情
router.get('/:id', resultMiddlleware, (req, res) => {
  res.json({ data: res.result })
})

module.exports = router
