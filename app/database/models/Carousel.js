module.exports = (sequelize, dataTypes) => {
    const Carousel = sequelize.define('Carousel', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
    }, {
        tableName: 'Carousel', 
        timestamps: false
    });

    Carousel.associate = function(modelos) {
        Carousel.belongsToMany(modelos.Producto, {
            as: 'productos',
            through: 'Productos_Carousel',
            foreignKey: 'carousel_id',
            otherKey: 'producto_id',
            timestamps: false
        });
    };
    
    return Carousel;
}