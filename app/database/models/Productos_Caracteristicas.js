module.exports = (sequelize, dataTypes) => {
    const Productos_Caracteristicas = sequelize.define('Productos_Caracteristicas', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        producto_id: {
            type: dataTypes.INT,
        },
        caracteristica_id: {
            type: dataTypes.INT,
        },
    }, {timestamps: false});

    return Productos_Caracteristicas;
}