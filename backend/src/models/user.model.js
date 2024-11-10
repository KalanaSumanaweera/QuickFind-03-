// user.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path if needed

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        validate: { isEmail: true }
    },
    phone: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('admin', 'service_provider', 'customer'),
        defaultValue: 'customer'
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive', 'suspended'),
        defaultValue: 'active'
    },
<<<<<<< HEAD
    photoURL: {  // Added field
        type: DataTypes.STRING,
        allowNull: false
    }
=======
    photoURL: {
        type: DataTypes.STRING,
        allowNull: false
    },
>>>>>>> 7eb773628abb53ae7d065993708171f4b87e0f15
}, {
    timestamps: true
});

module.exports = User;

