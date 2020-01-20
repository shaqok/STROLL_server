module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('comments', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    userId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    trailId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'trails',
        key: 'id',
      },
    },
    imageId: {
      allowNull: true,
      type: Sequelize.INTEGER,
      references: {
        model: 'images',
        key: 'id',
      },
    },
    comment: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    rating: {
      allowNull: false,
      type: Sequelize.INTEGER,
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
  down: (queryInterface) => queryInterface.dropTable('comments'),
};
