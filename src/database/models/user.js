export default (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: {
            type:DataTypes.INTEGER,
            allowNull: false,
        }
    });

    return User;
};
