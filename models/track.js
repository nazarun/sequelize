const sequelize = require('./../database/db-config');
const Sequelize = require('sequelize');

module.exports = sequelize.define('track', {
    id: {
        field: 'TrackId',
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        field: 'Name',
        type: Sequelize.STRING,
        primaryKey: true
    }
}, {
    timestamps: false
});