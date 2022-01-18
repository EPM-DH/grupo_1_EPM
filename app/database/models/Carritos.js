module.exports = (sequelize, dataTypes) => {
    const Carritos = sequelize.define('Carritos', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        usuario_id: {
            type: dataTypes.INT,
        },
        producto_id: {
            type: dataTypes.INT,
        },
        quantity: {
            type: dataTypes.INT,
        },
    }, {timestamps: false});

    return Carritos;
}