module.exports = (sequelize, dataTypes) => {
    const Categorias = sequelize.define('Categorias', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: dataTypes.STRING(50),
        },
    }, {timestamps: false});

    Categorias.associate = function(modelos) {
        Categorias.belongsToMany(modelos.Productos, {
            as: 'producto',
            through: 'Productos_Categorias',
            foreignKey: 'categoria_id',
            otherKey: 'producto_id',
            timestamps: false
        });
    };

    return Categorias;
}