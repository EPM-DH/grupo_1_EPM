module.exports = (sequelize, dataTypes) => {
    const Producto = sequelize.define('Producto', {
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
        price: {
            type: dataTypes.FLOAT,
            allowNull: false
        },
        shortDescription: {
            type: dataTypes.TEXT,
            allowNull: false
        },
        longDescription: {
            type: dataTypes.TEXT,
            allowNull: false
        },
        identifier: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        vendidos: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        rating: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        featured: {
            type: dataTypes.TINYINT,
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
    }, {timestamps: false});

    Producto.associate = function(modelos) {
        Producto.hasMany(modelos.Pedido, {
            as: 'pedidos',
            foreignKey: 'producto_id'
        });

        Producto.belongsToMany(modelos.Caracteristica, {
            as: 'caracteristicas',
            through: 'Productos_Caracteristicas',
            foreignKey: 'producto_id',
            otherKey: 'caracteristica_id',
            timestamps: false,
        });

        Producto.belongsToMany(modelos.Carousel, {
            as: 'carouseles',
            through: 'Productos_Carousel',
            foreignKey: 'producto_id',
            otherKey: 'carousel_id',
            timestamps: false
        });

        Producto.belongsToMany(modelos.Categoria, {
            as: 'categorias',
            through: 'Productos_Categorias',
            foreignKey: 'producto_id',
            otherKey: 'categoria_id',
            timestamps: false
        });

        Producto.belongsToMany(modelos.Lista_de_deseo, {
            as: 'listas_de_deseos',
            through: 'Productos_Lista_de_deseos',
            foreignKey: 'producto_id',
            otherKey: 'lista_de_deseo_id',
            timestamps: false
        });
    };

    return Producto;
}