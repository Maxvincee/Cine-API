'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class User extends Model {

    static get tableName() {
        return 'user';
    }

    static get joiSchema() {
        return Joi.object({
            id: Joi.number().integer().greater(0),

            firstName: Joi.string().min(3).example('John').description('Prénom'),
            lastName: Joi.string().min(3).example('Doe').description('Nom'),

            username: Joi.string().required().example('johndoe'),
            password: Joi.string().min(8).required().example('12345678'), // Min 8 char
            mail: Joi.string().email().required().example('john@doe.fr'),

            createdAt: Joi.date(),
            updatedAt: Joi.date()
        });
    }

    $beforeInsert(queryContext) {
        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
    }

    $beforeUpdate(opt, queryContext) {
        this.updatedAt = new Date();
    }
};
