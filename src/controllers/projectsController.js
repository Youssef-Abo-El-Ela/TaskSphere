const { getAllUserProjectsService } = require("../services/projectsService")

const getAllUserProjects = async (req, res) => {
    const userId = req.params.userId

    const userProjects = await getAllUserProjectsService(userId)

    res.status(200).json(userProjects)

}





module.exports = {
    getAllUserProjects,

}