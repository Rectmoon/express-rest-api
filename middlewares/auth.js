module.exports = () => {
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')
  const AdminUser = require('../models/adminUsers')

  return async (req, res, next) => {
    let token = (req.headers.authorization || '').split(' ').pop()
    assert(token, 401, '请先登录')
    console.log(`token=========================================${token}`)
    try {
      const { id } = await jwt.verify(token, req.app.get('secret'))
      assert(id, 401, '请先登录')
      const user = AdminUser.findById(id)
      assert(user, 401, '请先登录')
      req.user = user
      next()
    } catch (err) {
      switch (err.name) {
        case 'TokenExpiredError':
        case 'NotBeforeError':
          const payload = jwt.decode(token)
          token = jwt.sign({ id: payload._id }, req.app.get('secret'), { expiresIn: 3600 })
          res
            .status(200)
            .header('Content-Type', 'application/json')
            .json({ data: token })
          break
        case 'JsonWebTokenError':
        default:
          res.status(401).json({ error: err.message })
          break
      }
    }
  }
}
