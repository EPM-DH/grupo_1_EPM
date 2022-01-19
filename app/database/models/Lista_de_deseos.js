module.exports = (sequelize, dataTypes) => {
    const Lista_de_deseos = sequelize.define('Lista_de_deseos', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        image: {
            type: dataTypes.STRING(100),
        },
        identifier: {
            type: dataTypes.STRING(50),
        },
        name: {
            type: dataTypes.STRING(50),
        },
    }, {timestamps: false});

    Lista_de_deseos.associate = function(modelos) {
        Lista_de_deseos.belongsTo(modelos.Usuarios, {
            as: 'usuario',
            foreignKey: 'usuario_id'
        });

        Lista_de_deseos.belongsTo(modelos.Visibilidades, {
            as: 'visibilidad',
            foreignKey: 'visibility_id'
        });

        Lista_de_deseos.belongsToMany(modelos.Productos, {
            as: 'producto',
            through: 'Productos_Lista_de_deseos',
            foreignKey: 'lista_de_deseo_id',
            otherKey: 'producto_id',
            timestamps: false
        });
    };

    return Lista_de_deseos;
}