const assert = require('http-assert')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()
const AdminUser = require('../../models/adminUsers')

router.post('/register', async (req, res) => {
  const { username, password } = req.body
  const user = await AdminUser.findOne({ username })
  assert(!user, 422, '用户名已存在')
  res.send({
    data: await AdminUser.create({
      username,
      password
    })
  })
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  // // 1.根据用户名找用户
  const user = await AdminUser.findOne({ username }).select('+password')
  assert(user, 422, '用户不存在')
  // // 2.校验密码
  const isValid = bcrypt.compareSync(password, user.password)
  assert(isValid, 422, '密码错误')
  // // 3.返回token
  const token = jwt.sign({ id: user._id }, req.app.get('secret'), { expiresIn: 3600 })
  res.send({ data: token })
})

module.exports = router
