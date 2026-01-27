'use strict';

module.exports = {
    method: 'get',
    path: '/user',
    options: {
        tags: ['api']
    },
    // eslint-disable-next-line require-await
    handler: async (request, h) => {

        return { firstName: 'John', lastName: 'Doe' };
    }
};
