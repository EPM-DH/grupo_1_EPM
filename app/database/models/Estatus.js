module.exports = (sequelize, dataTypes) => {
    const Estatus = sequelize.define('Estatus', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: dataTypes.STRING(50),
        },
    }, {timestamps: false});

    Estatus.associate = function(modelos) {
        Estatus.hasMany(modelos.Pedidos, {
            as: 'estatus',
            foreignKey: 'status_id'
        });
    }

    return Estatus;
}