const sequelize = require('../database/db-config');
const Sequelize = require('sequelize');

module.exports = sequelize.define('album', {
    id: {
        field: 'AlbumId',
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    title: {
        field: 'Title',
        type: Sequelize.STRING,
        primaryKey: true
    },
    // ArtistId: {
    //     field: 'Name',
    //     type: Sequelize.STRING,
    //     primaryKey: true
    // }
}, {
    timestamps: false
});