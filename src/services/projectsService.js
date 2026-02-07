const getAllUserProjectsService = async (userId) => {
    const userProjects = getAllUserProjectsFromDb(userId)

    return userProjects
}



module.exports = {
    getAllUserProjectsService
}