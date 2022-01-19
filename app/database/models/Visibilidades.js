module.exports = (sequelize, dataTypes) => {
    const Visibilidades = sequelize.define('Visibilidades', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: dataTypes.STRING(50),
        },
    }, {timestamps: false});

    Visibilidades.associate = function(modelos) {
        Visibilidades.hasMany(modelos.Lista_de_deseos, {
            as: 'lista_de_deseo',
            foreignKey: 'visibility_id'
        });
    };

    return Visibilidades;
}