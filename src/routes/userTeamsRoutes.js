const express = require('express')
const { createTeam, getAllTeams, getTeamById, updateTeam, deleteTeam } = require('../controllers/teamController')
const userTeamsRouter = express.Router({ mergeParams: true })

userTeamsRouter.post('/', createTeam)
userTeamsRouter.get('/', getAllTeams)
userTeamsRouter.get('/:teamId', getTeamById)
userTeamsRouter.put('/:teamId', updateTeam)
userTeamsRouter.delete('/:teamId', deleteTeam)

module.exports = userTeamsRouter