module.exports = (sequelize, dataTypes) => {
    const Productos_Caracteristicas = sequelize.define('Productos_Caracteristicas', {
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
        caracteristica_id: {
            type: dataTypes.INTEGER,
            references: {
                model: 'Caracteristicas',
                key: 'id'
            }
        },
    }, {timestamps: false});

    Productos_Caracteristicas.associate = function(modelos) {
        Productos_Caracteristicas.belongsTo(modelos.Productos, {
            foreignKey: 'producto_id'
        });
    
        Productos_Caracteristicas.belongsTo(modelos.Caracteristicas, {
            foreignKey: 'caracteristica_id'
        });
    };

    return Productos_Caracteristicas;
}