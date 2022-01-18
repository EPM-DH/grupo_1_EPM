module.exports = (sequelize, dataTypes) => {
    const Carousel = sequelize.define('Carousels', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: dataTypes.STRING(100),
        },
    }, {timestamps: false});

    return Carousel;
}