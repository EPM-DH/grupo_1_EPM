module.exports = (sequelize, dataTypes) => {
    const Lista_de_deseos = sequelize.define('Lista_de_deseos', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        usuario_id: {
            type: dataTypes.INT,
        },
        image: {
            type: dataTypes.STRING(100),
        },
        identifier: {
            type: dataTypes.STRING(50),
        },
        name: {
            type: dataTypes.STRING(50),
        },
        visibility_id: {
            type: dataTypes.INT,
        },
    }, {timestamps: false});

    return Lista_de_deseos;
}