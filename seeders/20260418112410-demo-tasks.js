'use strict';

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

        await queryInterface.bulkInsert('Tasks', [
            {
                title: 'Landing Page Design',
                description: 'Create initial UI for homepage with responsive layout',
                status: 'pending',
                priority: 'high',
                assignTo: 'Rahul',
                createBy: 'Admin',
                due_date: '2026-04-25',
                attachments: 'design-mockup.fig',
                isDeleted: 'no',
                version: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'API Integration',
                description: 'Integrate product API with frontend listing page',
                status: 'in-progress',
                priority: 'medium',
                assignTo: 'Priya',
                createBy: 'Admin',
                due_date: '2026-04-28',
                attachments: 'api-docs.pdf',
                isDeleted: 'no',
                version: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Bug Fix - Login Issue',
                description: 'Resolve login failure on invalid token handling',
                status: 'completed',
                priority: 'high',
                assignTo: 'Amit',
                createBy: 'Tester',
                due_date: '2026-04-20',
                attachments: '',
                isDeleted: 'no',
                version: 3,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Database Optimization',
                description: 'Improve query performance for order reports',
                status: 'pending',
                priority: 'low',
                assignTo: 'Sneha',
                createBy: 'Admin',
                due_date: '2026-05-05',
                attachments: 'query-plan.sql',
                isDeleted: 'no',
                version: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Add Product Feature',
                description: 'Implement add product form with validation',
                status: 'in-progress',
                priority: 'medium',
                assignTo: 'Vikas',
                createBy: 'Admin',
                due_date: '2026-04-30',
                attachments: '',
                isDeleted: 'no',
                version: 2,
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
        await queryInterface.bulkDelete('Tasks', null, {});
    }
};
