module.exports = (sequelize, DataTypes) => {
  const locations = sequelize.define(
    'locations',
    {
      location1: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location2: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location3: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location4: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location5: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
  );
  // eslint-disable-next-line func-names
  locations.associate = function (models) {
    // associations can be defined here
    // models.locations.hasMany(models.Trails);
    models.locations.hasMany(models.trails);
  };
  return locations;
};
