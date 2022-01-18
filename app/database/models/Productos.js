module.exports = (sequelize, dataTypes) => {
    const Productos = sequelize.define('Productos', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: dataTypes.STRING(100),
        },
        price: {
            type: dataTypes.FLOAT,
        },
        shortDescription: {
            type: dataTypes.TEXT,
        },
        longDescription: {
            type: dataTypes.TEXT,
        },
        identifier: {
            type: dataTypes.STRING(50),
        },
        vendidos: {
            type: dataTypes.INT,
        },
        rating: {
            type: dataTypes.INT,
        },
        featured: {
            type: dataTypes.TINYINT,
        },
        image: {
            type: dataTypes.STRING(100),
        },
    }, {timestamps: false});

    return Productos;
}