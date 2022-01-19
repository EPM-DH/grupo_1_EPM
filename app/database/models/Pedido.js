module.exports = (sequelize, dataTypes) => {
    const Pedido = sequelize.define('Pedido', {
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
        status_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        trackId: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
    }, {timestamps: false});

    Pedido.associate = function(modelos) {
        Pedido.belongsTo(modelos.Usuario, {
            as: 'usuario',
            foreignKey: 'usuario_id'
        });

        Pedido.belongsTo(modelos.Producto, {
            as: 'producto',
            foreignKey: 'producto_id'
        });

        Pedido.belongsTo(modelos.Estatus, {
            as: 'estatus',
            foreignKey: 'status_id'
        });
    };

    return Pedido;
}