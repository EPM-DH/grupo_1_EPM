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

    return Categorias;
}