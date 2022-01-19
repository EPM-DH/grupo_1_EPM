module.exports = (sequelize, dataTypes) => {
    const Carousel = sequelize.define('Carousels', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: dataTypes.STRING(100),
        },
    }, {timestamps: false});

    Carousel.associate = function(modelos) {
        Carousel.belongsToMany(modelos.Productos, {
            as: 'producto',
            through: 'Productos_Carousel',
            foreignKey: 'carousel_id',
            otherKey: 'producto_id',
            timestamps: false
        });
    };
    
    return Carousel;
}