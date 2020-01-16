module.exports = (sequelize, DataTypes) => {
  const Locations = sequelize.define(
    'Locations',
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
  Locations.associate = function (models) {
    // associations can be defined here
    // models.Locations.hasMany(models.Trails);
    models.Locations.hasMany(models.Trails, {
      foreignKey: 'locationId',
      onDelete: 'cascade',
    });
  };
  return Locations;
};
