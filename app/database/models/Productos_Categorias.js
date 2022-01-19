module.exports = (sequelize, dataTypes) => {
    const Productos_Categorias = sequelize.define('Productos_Categorias', {
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
        categoria_id: {
            type: dataTypes.INTEGER,
            references: {
                model: 'Categorias',
                key: 'id'
            }
        },
    }, {timestamps: false});

    Productos_Categorias.associate = function(modelos) {
        Productos_Categorias.belongsTo(modelos.Productos, {
            foreignKey: 'producto_id'
        });
    
        Productos_Categorias.belongsTo(modelos.Categorias, {
            foreignKey: 'categoria_id'
        });
    };

    return Productos_Categorias;
}