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

        // eslint-disable-next-line @hapi/hapi/scope-start
        handler: async (request, h) => {
            const { userService } = request.services();
            return await userService.create(request.payload);
        }
    },

    {
        method: 'get',
        path: '/users',
        options: {
            tags: ['api']
        },
        // eslint-disable-next-line @hapi/hapi/scope-start
        handler: async (request, h) => {
            const { userService } = request.services();
            return await userService.findAll();
        }
    },

    {
        method: 'delete',
        path: '/user/{id}',
        options: {
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required().description('ID de l\'utilisateur à supprimer')
                })
            }
        },
        // eslint-disable-next-line @hapi/hapi/scope-start
        handler: async (request, h) => {
            const { userService } = request.services();

            await userService.delete(request.params.id);

            return '';
        }
    }
];
