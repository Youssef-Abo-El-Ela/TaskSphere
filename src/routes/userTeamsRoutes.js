const express = require('express')
const { createTeam } = require('../controllers/teamController')
const userTeamsRouter = express.Router({ mergeParams: true })

userTeamsRouter.post('/', createTeam)


module.exports = userTeamsRouter