module.exports = (sequelize, dataTypes) => {
    const Productos_Categorias = sequelize.define('Productos_Categorias', {
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
        categoria_id: {
            type: dataTypes.INTEGER,
            references: {
                model: 'Categorias',
                key: 'id'
            },
            allowNull: false
        },
    }, {
        tableName: 'Productos_Categorias', 
        timestamps: false
    });

    Productos_Categorias.associate = function(modelos) {
        Productos_Categorias.belongsTo(modelos.Producto, {
            foreignKey: 'producto_id'
        });
    
        Productos_Categorias.belongsTo(modelos.Categoria, {
            as: 'categoria',
            foreignKey: 'categoria_id'
        });
    };

    return Productos_Categorias;
}