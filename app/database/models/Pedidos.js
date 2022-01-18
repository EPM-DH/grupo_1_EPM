module.exports = (sequelize, dataTypes) => {
    const Pedidos = sequelize.define('Pedidos', {
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
        status_id: {
            type: dataTypes.INT,
        },
        trackId: {
            type: dataTypes.STRING(50),
        },
    }, {timestamps: false});

    return Pedidos;
}