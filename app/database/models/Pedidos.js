module.exports = (sequelize, dataTypes) => {
    const Pedidos = sequelize.define('Pedidos', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        trackId: {
            type: dataTypes.STRING(50),
        },
    }, {timestamps: false});

    Pedidos.associate = function(modelos) {
        Pedidos.belongsTo(modelos.Usuarios, {
            as: 'usuario',
            foreignKey: 'usuario_id'
        });

        Pedidos.belongsTo(modelos.Productos, {
            as: 'producto',
            foreignKey: 'producto_id'
        });

        Pedidos.belongsTo(modelos.Estatus, {
            as: 'estatus',
            foreignKey: 'status_id'
        });
    };

    return Pedidos;
}