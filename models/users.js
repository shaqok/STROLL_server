const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users',
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
  users.associate = function (models) {
    // associations can be defined here
    models.users.hasMany(models.comments);
    models.users.hasMany(models.trails);
  };
  return users;
};
