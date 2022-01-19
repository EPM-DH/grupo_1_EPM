module.exports = (sequelize, dataTypes) => {
    //Primer parámetro es un apodo, no importa el nombre que use. No debe coincidir con el de la tabla de la BD
    //Pero el nombre que defina será el utilizado a lo largo de todo el programa (controladores) -> db.apodo
    const Caracteristica = sequelize.define('Caracteristica', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        description: {
            type: dataTypes.TEXT,
            allowNull: false
        },
    }, {timestamps: false});

    Caracteristica.associate = function(modelos) {
        Caracteristica.belongsToMany(modelos.Producto, {
            as: 'productos',
            through: 'Productos_Caracteristicas',
            foreignKey: 'caracteristica_id',
            otherKey: 'producto_id',
            timestamps: false
        });
    };

    return Caracteristica;
}