module.exports = (sequelize, dataTypes) => {
    const Categoria = sequelize.define('Categoria', {
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
        tableName: 'Categorias', 
        timestamps: false
    });

    Categoria.associate = function(modelos) {
        Categoria.belongsToMany(modelos.Producto, {
            as: 'productosC',
            through: 'Productos_Categorias',
            foreignKey: 'categoria_id',
            otherKey: 'producto_id',
            timestamps: false
        });
    };

    return Categoria;
}