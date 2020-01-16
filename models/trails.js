module.exports = (sequelize, DataTypes) => {
  const Trails = sequelize.define(
    'Trails',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      locationId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      imageId: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
  Trails.associate = function (models) {
    // associations can be defined here

    models.Trails.hasMany(models.Comments, {
      foreignKey: 'trailId',
      onDelete: 'cascade',
    });

    Trails.belongsTo(models.Locations, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: true,
      },
    });
    Trails.belongsTo(models.Users, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: true,
      },
    });
    Trails.belongsTo(models.Categories, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: true,
      },
    });
    Trails.belongsTo(models.Images, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: true,
      },
    });
  };
  return Trails;
};
