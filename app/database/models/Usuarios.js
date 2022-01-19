module.exports = (sequelize, dataTypes) => {
    const Usuarios = sequelize.define('Usuarios', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: dataTypes.STRING(100),
        },
        lastName: {
            type: dataTypes.STRING(100),
        },
        email: {
            type: dataTypes.STRING(100),
        },
        password: {
            type: dataTypes.STRING(100),
        },
        avatar: {
            type: dataTypes.STRING(100),
        },
    }, {timestamps: false});

    //Definir realaciones
    Usuarios.associate = function(modelos) {
        Usuarios.hasMany(modelos.Carritos, {
            as: 'carrito',
            foreignKey: 'usuario_id'
        });

        Usuarios.hasMany(modelos.Lista_de_deseos, {
            as: 'lista_de_deseo',
            foreignKey: 'usuario_id'
        });

        Usuarios.hasMany(modelos.Pedidos, {
            as: 'pedido',
            foreignKey: 'usuario_id'
        });

        Usuarios.belongsTo(modelos.Roles, {
            as: 'rol',
            foreignKey: 'rol_id'
        });
    };

    return Usuarios;
}