module.exports = (sequelize, dataTypes) => {
    const Productos_Carousel = sequelize.define('Productos_Carousel', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        producto_id: {
            type: dataTypes.INT,
        },
        carousel_id: {
            type: dataTypes.INT,
        },
    }, {timestamps: false});

    return Productos_Carousel;
}