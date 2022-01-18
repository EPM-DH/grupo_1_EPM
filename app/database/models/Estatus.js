module.exports = (sequelize, dataTypes) => {
    const Estatus = sequelize.define('Estatus', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: dataTypes.STRING(50),
        },
    }, {timestamps: false});

    return Estatus;
}