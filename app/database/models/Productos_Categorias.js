module.exports = (sequelize, dataTypes) => {
    const Productos_Categorias = sequelize.define('Productos_Categorias', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        producto_id: {
            type: dataTypes.INT,
        },
        categoria_id: {
            type: dataTypes.INT,
        },
    }, {timestamps: false});

    return Productos_Categorias;
}