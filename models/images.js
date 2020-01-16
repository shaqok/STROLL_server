module.exports = (sequelize, DataTypes) => {
  const Images = sequelize.define(
    'Images',
    {
      fileName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fileAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
  );
  // eslint-disable-next-line func-names
  Images.associate = function (models) {
    // associations can be defined here
    models.Images.hasMany(models.Trails, {
      foreignKey: 'imageId',
      onDelete: 'cascade',
    });
    models.Images.hasMany(models.Comments, {
      foreignKey: 'imageId',
      onDelete: 'cascade',
    });
  };
  return Images;
};
