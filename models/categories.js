module.exports = (sequelize, DataTypes) => {
  const categories = sequelize.define(
    'categories',
    {
      tag: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
  );
  // eslint-disable-next-line func-names
  categories.associate = function (models) {
    // associations can be defined here
    models.categories.hasMany(models.trails);
  };
  return categories;
};
