module.exports = (sequelize, dataTypes) => {
    const Visibilidad = sequelize.define('Visibilidad', {
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
        tableName: 'Visibilidades', 
        timestamps: false
    });

    Visibilidad.associate = function(modelos) {
        Visibilidad.hasMany(modelos.Lista_de_deseo, {
            as: 'listas_de_deseos',
            foreignKey: 'visibility_id'
        });
    };

    return Visibilidad;
}