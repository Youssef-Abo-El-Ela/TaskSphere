const express = require('express')
const { createTeam, getAllTeams, getTeamById, updateTeam, deleteTeam } = require('../controllers/teamController')
const asyncWrapper = require('../middlewares/asyncWrapper')
const { validateUpdateTeam, validateCreateTeam } = require('../middlewares/teamValidation')
const userTeamsRouter = express.Router({ mergeParams: true })

userTeamsRouter.post('/', validateCreateTeam, asyncWrapper(createTeam))
userTeamsRouter.get('/', asyncWrapper(getAllTeams))
userTeamsRouter.get('/:teamId', asyncWrapper(getTeamById))
userTeamsRouter.put('/:teamId', validateUpdateTeam, asyncWrapper(updateTeam))
userTeamsRouter.delete('/:teamId', asyncWrapper(deleteTeam))

module.exports = userTeamsRouter