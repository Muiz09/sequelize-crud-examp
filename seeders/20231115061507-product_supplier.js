'use strict';

/** @type {import('sequelize-cli').Migration} */
const data = require('../data/product_supplier.json')
data.forEach(el => {
  el.createdAt = new Date()
  el.updatedAt = new Date()
})
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Product_Suppliers', data);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Product_Suppliers', null, {});
  }
};
