module.exports = (sequelize, dataTypes) => {
    const Carritos = sequelize.define('Carritos', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        quantity: {
            type: dataTypes.INTEGER,
        },
    }, {timestamps: false});

    //Definir realaciones
    Carritos.associate = function(modelos) {
        Carritos.belongsTo(modelos.Usuarios, {
            as: 'usuario',
            foreignKey: 'usuario_id'
        });
        Carritos.belongsTo(modelos.Productos, {
            as: 'producto',
            foreignKey: 'producto_id'
        });
    };

    return Carritos;
}