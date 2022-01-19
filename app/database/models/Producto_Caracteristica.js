module.exports = (sequelize, dataTypes) => {
    const Productos_Caracteristicas = sequelize.define('Productos_Caracteristicas', {
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
        caracteristica_id: {
            type: dataTypes.INTEGER,
            references: {
                model: 'Caracteristicas',
                key: 'id'
            },
            allowNull: false
        },
    }, {
        tableName: 'Productos_Caracteristicas', 
        timestamps: false
    });

    Productos_Caracteristicas.associate = function(modelos) {
        Productos_Caracteristicas.belongsTo(modelos.Producto, {
            foreignKey: 'producto_id'
        });
    
        Productos_Caracteristicas.belongsTo(modelos.Caracteristica, {
            foreignKey: 'caracteristica_id'
        });
    };

    return Productos_Caracteristicas;
}