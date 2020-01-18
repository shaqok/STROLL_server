module.exports = (sequelize, DataTypes) => {
  const trails = sequelize.define(
    'trails',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      locationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      imageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      review: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      adminDistrict: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
  );
  // eslint-disable-next-line func-names
  trails.associate = function (models) {
    // associations can be defined here

    models.trails.hasMany(models.comments);

    trails.belongsTo(models.locations, {
      foreignKey: 'locationId',
    });
    trails.belongsTo(models.users, {
      foreignKey: 'userId',
    });
    trails.belongsTo(models.categories, {
      foreignKey: 'categoryId',
    });
    trails.belongsTo(models.images, {
      foreignKey: 'imageId',
    });
  };
  return trails;
};
