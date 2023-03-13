const {Router} = require('express')
const userRoute = require('./users')
const roleRoute = require('./roles')

const router = Router()

router.use('/users', userRoute)
router.use('/roles', roleRoute)

module.exports = router
