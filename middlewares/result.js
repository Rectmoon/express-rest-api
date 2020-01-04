module.exports = async (req, res, next) => {
  const assert = require('http-assert')
  const { id } = req.params
  const result = await req.model.findById(id)
  assert(result, 404, `Cannot find ${req.model.modelName + ' ' + id}`)
  res.result = result
  next()
}
