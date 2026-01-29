'use strict';

const { Service } = require('@hapipal/schmervice');
const Boom = require('@hapi/boom');
const Encrypt = require('@maxvincee/iut-encrypt');

module.exports = class UserService extends Service {

    create(user) {
        const { User } = this.server.models();

        user.password = Encrypt.sha1(user.password);

        return User.query().insertAndFetch(user);
    }

    findAll() {
        const { User } = this.server.models();
        return User.query();
    }

    delete(id) {
        const { User } = this.server.models();
        return User.query().deleteById(id);
    }

    update(id, user) {
        const { User } = this.server.models();

        if (user.password) {
            user.password = Encrypt.sha1(user.password);
        }

        return User.query().patchAndFetchById(id, user);
    }

    async login(mail, password) {
        const { User } = this.server.models();

        const user = await User.query().findOne({ mail });

        if (!user) {
            throw Boom.unauthorized('Email ou mot de passe incorrect');
        }

        if (!Encrypt.compareSha1(password, user.password)) {
            throw Boom.unauthorized('Email ou mot de passe incorrect');
        }

        return { login: 'successful' };
    }
};
