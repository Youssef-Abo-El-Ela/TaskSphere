const express = require('express')
const { createTeam, getAllTeams, getTeamById, updateTeam, deleteTeam } = require('../controllers/teamController')
const asyncWrapper = require('../middlewares/asyncWrapper')
const userTeamsRouter = express.Router({ mergeParams: true })

userTeamsRouter.post('/', asyncWrapper(createTeam))
userTeamsRouter.get('/', asyncWrapper(getAllTeams))
userTeamsRouter.get('/:teamId', asyncWrapper(getTeamById))
userTeamsRouter.put('/:teamId', asyncWrapper(updateTeam))
userTeamsRouter.delete('/:teamId', asyncWrapper(deleteTeam))

module.exports = userTeamsRouter