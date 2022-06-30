const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    //define the model
    sequelize.define("type", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        timestamps: false,
    })
}