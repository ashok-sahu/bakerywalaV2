const router = require('express').Router()

//all routes
const authRoute = require('./AuthRoutes/Auth.routes')

//route paths
router.use('/auth',authRoute)

module.exports = router