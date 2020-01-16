const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      hooks: {
        afterValidate: (data) => {
          const key = crypto.pbkdf2Sync(
            data.password,
            data.email,
            100000,
            64,
            'sha512',
          );
          // eslint-disable-next-line no-param-reassign
          data.password = key.toString('hex');
        },
      },
    },
  );
  // eslint-disable-next-line func-names
  Users.associate = function (models) {
    // associations can be defined here
    // Users.hasMany(models.Comments);
    // Users.hasMany(models.Trails);
    models.Users.hasMany(models.Comments, {
      foreignKey: 'userId',
      onDelete: 'cascade',
    });
    models.Users.hasMany(models.Trails, {
      foreignKey: 'userId',
      onDelete: 'cascade',
    });
  };
  return Users;
};
