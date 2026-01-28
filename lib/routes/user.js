'use strict';

const Joi = require('joi');

module.exports = [
    {
        method: 'post',
        path: '/user',
        options: {
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    firstName: Joi.string().required().min(3).example('John').description('Prénom'),
                    lastName: Joi.string().required().min(3).example('Doe').description('Nom')
                })
            }
        },
        handler: async (request, h) => {
            const { User } = request.models();
            const user = await User.query().insertAndFetch(request.payload);
            return user;
        }
    },

    {
        method: 'get',
        path: '/users',
        options: {
            tags: ['api']
        },
        handler: async (request, h) => {
            const { User } = request.models();

            // On demande TOUT à la base de données
            const users = await User.query();

            return users;
        }
    }
];
