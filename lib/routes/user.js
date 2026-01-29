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
                    firstName: Joi.string().required().min(3).example('John'),
                    lastName: Joi.string().required().min(3).example('Doe'),
                    username: Joi.string().required().example('jojo'),
                    mail: Joi.string().email().required().example('john@doe.fr'),
                    password: Joi.string().min(8).required().example('password123')
                })
            }
        },
        handler: async (request, h) => {
            const { userService } = request.services();
            return await userService.create(request.payload);
        }
    },

    {
        method: 'get',
        path: '/users',
        options: { tags: ['api'] },
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
                params: Joi.object({ id: Joi.number().integer().required() })
            }
        },
        handler: async (request, h) => {
            const { userService } = request.services();
            await userService.delete(request.params.id);
            return '';
        }
    },

    {
        method: 'patch',
        path: '/user/{id}',
        options: {
            tags: ['api'],
            validate: {
                params: Joi.object({ id: Joi.number().integer().required() }),
                payload: Joi.object({
                    firstName: Joi.string().min(3),
                    lastName: Joi.string().min(3),
                    username: Joi.string(),
                    mail: Joi.string().email(),
                    password: Joi.string().min(8)
                })
            }
        },
        handler: async (request, h) => {
            const { userService } = request.services();
            return await userService.update(request.params.id, request.payload);
        }
    },

    {
        method: 'post',
        path: '/user/login',
        options: {
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    mail: Joi.string().email().required().example('john@doe.fr'),
                    password: Joi.string().required().example('password123')
                })
            }
        },
        handler: async (request, h) => {
            const { userService } = request.services();
            return await userService.login(request.payload.mail, request.payload.password);
        }
    }
];
