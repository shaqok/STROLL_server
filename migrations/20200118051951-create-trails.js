module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('trails', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    locationId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'locations',
        key: 'id',
      },
    },
    userId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    categoryId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'categories',
        key: 'id',
      },
    },
    imageId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'images',
        key: 'id',
      },
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    review: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    adminDistrict: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('trails'),
};
