module.exports = (sequelize, dataTypes) => {
    const Estatus = sequelize.define('Estatus', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: dataTypes.STRING(100),
        },
        lastName: {
            type: dataTypes.STRING(100),
        },
        email: {
            type: dataTypes.STRING(100),
        },
        password: {
            type: dataTypes.STRING(100),
        },
        avatar: {
            type: dataTypes.STRING(100),
        },
        rol_id: {
            type: dataTypes.INT,
        },
    }, {timestamps: false});

    return Estatus;
}