module.exports = () => {
  return async (req, res, next) => {
    req.model = require(`../models/${req.params.resource}`)
    next()
  }
}
