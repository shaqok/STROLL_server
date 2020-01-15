module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define(
    'Comments',
    {
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      image_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
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
  Comments.associate = function (models) {
    // associations can be defined here
    Comments.belongsTo(models.Trails, {
      foreignKey: 'trail_id',
    });

    Comments.belongsTo(models.Users);

    Comments.belongsTo(models.Images);
  };
  return Comments;
};
