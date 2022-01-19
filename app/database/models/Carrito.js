module.exports = (sequelize, dataTypes) => {
    const Carrito = sequelize.define('Carrito', {
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
        producto_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
    }, {timestamps: false});

    //Definir realaciones
    Carrito.associate = function(modelos) {
        Carrito.belongsTo(modelos.Usuario, {
            as: 'usuario',
            foreignKey: 'usuario_id'
        });
        Carrito.belongsTo(modelos.Producto, {
            as: 'producto',
            foreignKey: 'producto_id'
        });
    };

    return Carrito;
}