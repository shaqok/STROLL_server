module.exports = (sequelize, DataTypes) => {
  const Reviews = sequelize.define(
    'Reviews',
    {
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      image: DataTypes.BLOB,
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      trail_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {},
  );
  // eslint-disable-next-line func-names
  Reviews.associate = function (models) {
    // associations can be defined here
    Reviews.belongsTo(models.Trails, {
      foreignKey: 'trail_id',
    });

    Reviews.belongsTo(models.Users, {
      foreignKey: 'user_id',
    });
  };
  return Reviews;
};
