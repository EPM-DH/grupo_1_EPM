module.exports = (sequelize, dataTypes) => {
    const Productos_Lista_de_deseos = sequelize.define('Productos_Lista_de_deseos', {
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
        lista_de_deseos_id: {
            type: dataTypes.INTEGER,
            references: {
                model: 'Lista_de_deseos',
                key: 'id'
            }
        },
    }, {timestamps: false});

    Productos_Lista_de_deseos.associate = function(modelos) {
        Productos_Lista_de_deseos.belongsTo(modelos.Productos, {
            foreignKey: 'producto_id'
        });
    
        Productos_Lista_de_deseos.belongsTo(modelos.Lista_de_deseos, {
            foreignKey: 'lista_de_deseo_id'
        });
    };

    return Productos_Lista_de_deseos;
}