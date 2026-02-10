const Project = require("../models/mongodb/Project.model")
const Team = require("../models/mongodb/Team.model")
const { mongoose } = require("../config/mongoose")

const createProjectInDb = async (userId, title, description, deadline, teamId) => {

    const newProject = new Project({
        title,
        description,
        deadline,
        createdBy: userId,
        teams: [teamId]
    })

    await newProject.save()
    return newProject
}

const getProjectByIdFromDb = async (projectId) => {
    const project = await Project.findById(projectId)
    return project
}

const updateProjectInDb = async (projectId, title, description, deadline, teamsIds) => {
    await Project.findByIdAndUpdate(projectId, {
        title,
        description,
        deadline,
        teams: teamsIds
    })
}

const deleteProjectFromDb = async (projectId) => {
    const session = await mongoose.startSession()
    session.startTransaction()
    
    try {
        const project = await Project.findById(projectId).session(session)
        if(!project) {
            await session.abortTransaction()
            throw new Error('Project not found')
        }
        
        await Project.findByIdAndDelete(projectId).session(session)
        await Team.updateMany(
            { projects: projectId }, 
            { $pull: { projects: projectId } }
        ).session(session)

        // Delete all tasks associated with the project
        
        await session.commitTransaction()
    } catch (error) {
        await session.abortTransaction()
        throw error
    } finally {
        session.endSession()
    }
}

module.exports = {
    createProjectInDb,
    getProjectByIdFromDb,
    updateProjectInDb,
    deleteProjectFromDb
}