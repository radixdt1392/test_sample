'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Tasks extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Tasks.init({
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        status: {
            type: DataTypes.STRING,
        },
        priority: {
            type: DataTypes.ENUM('low', 'medium', 'high'),
            allowNull: false,
            defaultValue: 'low',
            validate: {
                notEmpty: true
            },
        },
        assignTo: DataTypes.STRING,
        createBy: DataTypes.STRING,
        due_date: DataTypes.DATEONLY,
        attachments: DataTypes.TEXT,
        isDeleted: {
            type:DataTypes.ENUM('no', 'yes'),
            defaultValue:'no'
        },
        version: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Tasks',
    });
    return Tasks;
};