const jsSHA = require('jssha');

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
    await queryInterface.bulkInsert('Features', featuresList);

    // Insert a user

    const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
    shaObj.update('password');
    const hashedPassword = shaObj.getHash('HEX');

    const usersList = [
      {
        email: 'user@email.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert('Users', usersList);
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('Features', null, {});
  },
};
