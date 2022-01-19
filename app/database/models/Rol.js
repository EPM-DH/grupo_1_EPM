module.exports = (sequelize, dataTypes) => {
    const Rol = sequelize.define('Rol', {
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
        tableName: 'Roles', 
        timestamps: false
    });

    Rol.associate = function(modelos) {
        Rol.hasMany(modelos.Usuario, {
            as: 'usuarios',
            foreignKey: 'rol_id'
        });
    };

    return Rol;
}