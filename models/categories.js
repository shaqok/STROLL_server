module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define(
    'Categories',
    {
      tag: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {},
  );
  // eslint-disable-next-line func-names
  Categories.associate = function (models) {
    // associations can be defined here
    Categories.hasMany(models.Trails);
  };
  return Categories;
};
