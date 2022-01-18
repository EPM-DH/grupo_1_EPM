module.exports = (sequelize, dataTypes) => {
    const Visibilidades = sequelize.define('Visibilidades', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: dataTypes.STRING(50),
        },
    }, {timestamps: false});

    return Visibilidades;
}