module.exports = (sequelize, DataTypes) => {
  const Trails = sequelize.define(
    'Trails',
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      location_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      image_id: {
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
      admin_district: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {},
  );
  // eslint-disable-next-line func-names
  Trails.associate = function (models) {
    // associations can be defined here
    Trails.hasMany(models.Comments);

    Trails.belongsTo(models.Users, {
      foreignKey: 'user_id',
    });

    Trails.belongsTo(models.Images, {
      foreignKey: 'image_id',
    });

    Trails.belongsTo(models.Locations, {
      foreignKey: 'location_id',
    });

    Trails.belongsTo(models.Categories, {
      foreignKey: 'category_id',
    });
  };
  return Trails;
};
