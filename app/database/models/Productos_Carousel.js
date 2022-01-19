module.exports = (sequelize, dataTypes) => {
    const Productos_Carousel = sequelize.define('Productos_Carousel', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        producto_id: {
            type: dataTypes.INTEGER,
            references: {
                model: 'Productos',
                key: 'id'
            }
        },
        carousel_id: {
            type: dataTypes.INTEGER,
            references: {
                model: 'Carousels',
                key: 'id'
            }
        },
    }, {timestamps: false});

    Productos_Carousel.associate = function(modelos) {
        Productos_Carousel.belongsTo(modelos.Productos, {
            foreignKey: 'producto_id'
        });
    
        Productos_Carousel.belongsTo(modelos.Carousels, {
            foreignKey: 'carousel_id'
        });
    };

    return Productos_Carousel;
}