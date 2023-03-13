const router = require('express').Router()
const controllers = require('./lib/controllers')
const middleware = require('./lib/middleware')
const userMiddleware = require('../users/lib/middleware')

// User CRUD
router.get('/get-all', controllers.getAllRoles)
router.get('/get-role/:id', userMiddleware.checkId, controllers.getRole)
router.post('/create', controllers.createRole)
router.put('/update/:id', controllers.updateAccessModule);
router.delete('/role-delete/:id', userMiddleware.checkId, controllers.deleteRole)

module.exports = router;