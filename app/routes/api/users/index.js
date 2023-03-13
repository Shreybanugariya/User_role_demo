const router = require('express').Router()
const controllers = require('./lib/controllers')
const middleware = require('./lib/middleware')

router.get('/get-user/:id', middleware.checkId, controllers.getUser)
router.get('/get-all', controllers.getAllUsers)
router.post('/sing-in', controllers.singIn)
router.post('/create', middleware.createUser, controllers.createUser)
router.post('/checkAccess', controllers.checkAccess)
router.put('/update/multiple', controllers.updateMultiple)
router.put('/update/bulk', controllers.bulkUpdate)
router.delete('/:id', middleware.checkId, controllers.deleteUser)

module.exports = router