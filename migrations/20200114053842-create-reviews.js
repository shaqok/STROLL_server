
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Reviews', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    text: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    rating: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    image: {
      allowNull: true,
      type: Sequelize.BLOB('long'),
    },
    user_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    trail_id: {
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
  down: (queryInterface) => queryInterface.dropTable('Reviews'),
};
