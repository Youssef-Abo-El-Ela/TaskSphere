const { createTeamService } = require("../services/teamsService")

const createTeam = async (req, res) => {    
    const userId = req.params.userId
    const { name } = req.body
    const createdTeam = await createTeamService(userId , name)

    res.status(201).json({ message: 'Team created successfully', data: createdTeam })
}


module.exports = {
    createTeam
}