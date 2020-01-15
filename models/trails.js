module.exports = (sequelize, DataTypes) => {
  const Trails = sequelize.define(
    'Trails',
    {
      trail_location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category_tag: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      admin_district: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {},
  );
  // eslint-disable-next-line func-names
  Trails.associate = function (models) {
    // associations can be defined here
    Trails.hasMany(models.Reviews);

    Trails.belongsTo(models.Users, {
      foreignKey: 'user_id',
    });
  };
  return Trails;
};
