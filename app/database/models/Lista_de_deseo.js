module.exports = (sequelize, dataTypes) => {
    const Lista_de_deseo = sequelize.define('Lista_de_deseo', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        usuario_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        identifier: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        visibility_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
    }, {timestamps: false});

    Lista_de_deseo.associate = function(modelos) {
        Lista_de_deseo.belongsTo(modelos.Usuario, {
            as: 'usuario',
            foreignKey: 'usuario_id'
        });

        Lista_de_deseo.belongsTo(modelos.Visibilidad, {
            as: 'visibilidad',
            foreignKey: 'visibility_id'
        });

        Lista_de_deseo.belongsToMany(modelos.Producto, {
            as: 'productos',
            through: 'Productos_Lista_de_deseos',
            foreignKey: 'lista_de_deseo_id',
            otherKey: 'producto_id',
            timestamps: false
        });
    };

    return Lista_de_deseo;
}