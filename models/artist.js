const sequelize = require('../database/db-config');
const Sequelize = require('sequelize');

module.exports = sequelize.define('artist', {
    id: {
        field: 'ArtistId',
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        field: 'Name',
        type: Sequelize.STRING,
        primaryKey: true,
        validate: {
            notEmpty: {
                args: true,
                msg: 'Name is required'
            },
            isAlpha: {
                args: true,
                msg: 'Name must only contain letters'
            },
            len: {
                args: [2, 10],
                msg: 'Must be from 2 to 10 chars'
            }
        }
    }
}, {
    timestamps: false
});