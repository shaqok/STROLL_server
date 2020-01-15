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
    models.Trails.hasMany(models.Comments, {
      foreignKey: 'trail_id',
    });

    Trails.belongsTo(models.Users);

    Trails.belongsTo(models.Images);

    Trails.belongsTo(models.Locations);

    Trails.belongsTo(models.Categories);
  };
  return Trails;
};
