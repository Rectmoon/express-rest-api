module.exports = () => {
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')
  const AdminUser = require('../models/adminUsers')

  return async (req, res, next) => {
    const token = (req.headers.authorization || '').split(' ').pop()
    assert(token, 401, '请先登录')
    const { id } = await jwt.verify(token, req.app.get('secret'))
    assert(id, 401, '请先登录')
    const user = AdminUser.findById(id)
    ssert(user, 401, '请先登录')
    req.user = user
    next()
  }
}
