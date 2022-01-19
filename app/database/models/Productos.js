module.exports = (sequelize, dataTypes) => {
    const Productos = sequelize.define('Productos', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: dataTypes.STRING(100),
        },
        price: {
            type: dataTypes.FLOAT,
        },
        shortDescription: {
            type: dataTypes.TEXT,
        },
        longDescription: {
            type: dataTypes.TEXT,
        },
        identifier: {
            type: dataTypes.STRING(50),
        },
        vendidos: {
            type: dataTypes.INTEGER,
        },
        rating: {
            type: dataTypes.INTEGER,
        },
        featured: {
            type: dataTypes.TINYINT,
        },
        image: {
            type: dataTypes.STRING(100),
        },
    }, {timestamps: false});

    Productos.associate = function(modelos) {
        Productos.hasMany(modelos.Pedidos, {
            as: 'pedido',
            foreignKey: 'producto_id'
        });

        Productos.belongsToMany(modelos.Caracteristicas, {
            as: 'caracteristica',
            through: 'Productos_Caracteristicas',
            foreignKey: 'producto_id',
            otherKey: 'caracteristica_id',
            timestamps: false,
        });

        Productos.belongsToMany(modelos.Carousel, {
            as: 'carousel',
            through: 'Productos_Carousel',
            foreignKey: 'producto_id',
            otherKey: 'carousel_id',
            timestamps: false
        });

        Productos.belongsToMany(modelos.Categorias, {
            as: 'categoria',
            through: 'Productos_Categorias',
            foreignKey: 'producto_id',
            otherKey: 'categoria_id',
            timestamps: false
        });

        Productos.belongsToMany(modelos.Lista_de_deseos, {
            as: 'lista_de_deseo',
            through: 'Productos_Lista_de_deseos',
            foreignKey: 'producto_id',
            otherKey: 'lista_de_deseo_id',
            timestamps: false
        });
    };

    return Productos;
}