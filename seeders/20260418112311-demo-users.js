'use strict';

const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
        */
        await queryInterface.bulkInsert('Users', [
            {
                name: "Dinesh",
                email: "dsp@demo.com",
                password: await bcrypt.hash('password123', 10),
                role: "admin",
                isActive: true,
                login_attempts: 0,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Second",
                email: "second@demo.com",
                password: await bcrypt.hash('password123', 10),
                role: "manager",
                isActive: true,
                login_attempts: 0,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Third",
                email: "third@demo.com",
                password: await bcrypt.hash('password123', 10),
                role: "admin",
                isActive: true,
                login_attempts: 0,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
    },
    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('users', null, {});
    }
};
