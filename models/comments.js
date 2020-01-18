module.exports = (sequelize, DataTypes) => {
  const comments = sequelize.define(
    'comments',
    {
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      imageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      trailId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
  );
  // eslint-disable-next-line func-names
  comments.associate = function (models) {
    // associations can be defined here

    comments.belongsTo(models.trails, {
      foreignKey: 'trailId',
    });

    comments.belongsTo(models.users, {
      foreignKey: 'userId',
    });

    comments.belongsTo(models.images, {
      foreignKey: 'imageId',
    });
  };
  return comments;
};
