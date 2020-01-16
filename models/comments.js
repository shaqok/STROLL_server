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
      imageId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      trailId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
  );
  // eslint-disable-next-line func-names
  Comments.associate = function (models) {
    // associations can be defined here

    Comments.belongsTo(models.Trails, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: true,
      },
    });

    Comments.belongsTo(models.Users, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: true,
      },
    });

    Comments.belongsTo(models.Images, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: true,
      },
    });
  };
  return Comments;
};
