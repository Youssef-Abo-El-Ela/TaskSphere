const { sequelize } = require("../../config/sequelize")
const { DataTypes } = require("sequelize")

const Task = sequelize.define("Task", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM('To Do', 'In Progress', 'Done'),
        defaultValue: 'To Do'
    },
    deadline: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    assignedTo: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
    },
    createdBy: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    projectId: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

module.exports = Task