module.exports = (sequelize, DataTypes) => {
  const images = sequelize.define(
    'images',
    {
      fileName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      filePath: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
  );
  // eslint-disable-next-line func-names
  images.associate = function (models) {
    // associations can be defined here
    models.images.hasMany(models.trails);
    models.images.hasMany(models.comments);
  };
  return images;
};
