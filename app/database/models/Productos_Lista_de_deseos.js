module.exports = (sequelize, dataTypes) => {
    const Productos_Lista_de_deseos = sequelize.define('Productos_Lista_de_deseos', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        producto_id: {
            type: dataTypes.INT,
        },
        lista_de_deseos_id: {
            type: dataTypes.INT,
        },
    }, {timestamps: false});

    return Productos_Lista_de_deseos;
}