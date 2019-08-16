module.exports = {

    up: queryInterface => queryInterface.bulkInsert('Users',
        [
            {
                id: '0',
                fullname: 'charity marani',
                username: 'chacha',
                email: 'charitymarani@gmail.com',
                role: 'Super Administrator',
                password: '$2b$10$O1unmoaOGOW6liqNAJspGOpIWbG5BYzXNehTUTOoQj7Bf570xLTMK',
                createdAt: '2017-10-05T08:36:11.170Z',
                updatedAt: '2017-10-05T08:36:11.170Z',
            }
        ], {}),

    down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};