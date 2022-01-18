module.exports = (sequelize, dataTypes) => {
    const Caracteristicas = sequelize.define('Caracteristicas', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        description: {
            type: dataTypes.TEXT,
        },
    }, {timestamps: false});

    return Caracteristicas;
}