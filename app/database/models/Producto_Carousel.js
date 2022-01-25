module.exports = (sequelize, dataTypes) => {
    const Productos_Carousel = sequelize.define('Productos_Carousel', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        producto_id: {
            type: dataTypes.INTEGER,
            references: {
                model: 'Productos',
                key: 'id'
            },
            allowNull: false
        },
        carousel_id: {
            type: dataTypes.INTEGER,
            references: {
                model: 'Carousels',
                key: 'id'
            },
            allowNull: false
        },
    }, {
        tableName: 'Productos_Carousel', 
        timestamps: false
    });

    Productos_Carousel.associate = function(modelos) {
        Productos_Carousel.belongsTo(modelos.Producto, {
            foreignKey: 'producto_id'
        });
    
        Productos_Carousel.belongsTo(modelos.Carousel, {
            foreignKey: 'carousel_id'
        });
    };

    return Productos_Carousel;
}