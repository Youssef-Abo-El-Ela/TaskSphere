const { getUserByIdFromDb } = require("../repositories/users")

const isValidUser = async (req, res, next) => {
    const userId = req.params.userId
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' })
    }
    const user = await getUserByIdFromDb(userId)
    if (!user) {
        return res.status(404).json({ message: 'User not found' })
    }
    if (user.isActive === false) {
        return res.status(403).json({ message: 'User is deactivated' })
    }
    next()
}

module.exports = {
    isValidUser
}