module.exports = (sequelize, dataTypes) => {
    const Roles = sequelize.define('Roles', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: dataTypes.STRING(50),
        },
    }, {timestamps: false});

    return Roles;
}