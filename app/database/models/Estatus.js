module.exports = (sequelize, dataTypes) => {
    const Estatus = sequelize.define('Estatus', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
    }, {
        tableName: 'Estatus', 
        timestamps: false
    });

    Estatus.associate = function(modelos) {
        Estatus.hasMany(modelos.Pedido, {
            as: 'estatus',
            foreignKey: 'status_id'
        });
    }

    return Estatus;
}