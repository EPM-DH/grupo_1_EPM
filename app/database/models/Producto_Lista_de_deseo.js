module.exports = (sequelize, dataTypes) => {
    const Productos_Lista_de_deseos = sequelize.define('Productos_Lista_de_deseos', {
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
        lista_de_deseo_id: {
            type: dataTypes.INTEGER,
            references: {
                model: 'Lista_de_deseos',
                key: 'id'
            },
            allowNull: false
        },
    }, {
        tableName: 'Productos_Lista_de_deseos', 
        timestamps: false
    });

    Productos_Lista_de_deseos.associate = function(modelos) {
        Productos_Lista_de_deseos.belongsTo(modelos.Producto, {
            foreignKey: 'producto_id'
        });
    
        Productos_Lista_de_deseos.belongsTo(modelos.Lista_de_deseo, {
            foreignKey: 'lista_de_deseo_id'
        });
    };

    return Productos_Lista_de_deseos;
}