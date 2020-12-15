const router = require('express').Router()
const apiRoutes = require('./Api.routes')

// api routes
router.use(process.env.API_URL, apiRoutes);
router.use(process.env.API_URL, (req, res) => res.status(404).json('No API route found'));

module.exports = router