module.exports = (sequelize, dataTypes) => {
    const Caracteristicas = sequelize.define('Caracteristicas', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        description: {
            type: dataTypes.TEXT,
        },
    }, {timestamps: false});

    Caracteristicas.associate = function(modelos) {
        Caracteristicas.belongsToMany(modelos.Productos, {
            as: 'producto',
            through: 'Productos_Caracteristicas',
            foreignKey: 'caracteristica_id',
            otherKey: 'producto_id',
            timestamps: false
        });
    };

    return Caracteristicas;
}