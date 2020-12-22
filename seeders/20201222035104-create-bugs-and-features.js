module.exports = {
  up: async (queryInterface, Sequelize) => {
    const featuresList = [
      {
        name: 'Search Function',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Navbar',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Carousel',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Chat',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    queryInterface.bulkInsert('Features', featuresList);
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('Features', null, {});
  },
};