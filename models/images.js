module.exports = (sequelize, DataTypes) => {
  const Images = sequelize.define(
    'Images',
    {
      file_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      file_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {},
  );
  // eslint-disable-next-line func-names
  Images.associate = function (models) {
    // associations can be defined here
    Images.hasMany(models.Trails);
    Images.hasMany(models.Comments);
  };
  return Images;
};
