module.exports = (sequelize, dataTypes) => {
    const Usuario = sequelize.define('Usuario', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        firstName: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        lastName: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        password: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        avatar: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        rol_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
    }, {timestamps: false});

    //Definir realaciones
    Usuario.associate = function(modelos) {
        Usuario.hasMany(modelos.Carrito, {
            as: 'carritos',
            foreignKey: 'usuario_id'
        });

        Usuario.hasMany(modelos.Lista_de_deseo, {
            as: 'listas_de_deseos',
            foreignKey: 'usuario_id'
        });

        Usuario.hasMany(modelos.Pedido, {
            as: 'pedidos',
            foreignKey: 'usuario_id'
        });

        Usuario.belongsTo(modelos.Rol, {
            as: 'rol',
            foreignKey: 'rol_id'
        });
    };

    return Usuario;
}