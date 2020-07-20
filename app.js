const express = require('express');
const bodyParser = require('body-parser');
const Playlist  = require('./models/playlist');
const Artist  = require('./models/artist');
const Album  = require('./models/album');
const Track  = require('./models/track');
const Sequelize = require('sequelize');
const { Op } = Sequelize;

const app = express();
app.use(bodyParser.json());

Artist.hasMany(Album, {
    foreignKey: 'ArtistId'
});

Album.belongsTo(Artist, {
    foreignKey: 'ArtistId'
});

Playlist.belongsToMany(Track, {
    through: 'playlist_track',
    foreignKey: 'PlaylistId',
    timestamps: false
})

Track.belongsToMany(Playlist, {
    through: 'playlist_track',
    foreignKey: 'TrackId',
    timestamps: false
})


app.delete('/api/playlists/:id', function(req, res) {
    let { id } = req.params;

    Playlist
        .findByPk(id)
        .then(playlist => {
            if (playlist) {
                return playlist.setTracks([]).then(() => {
                    return playlist.destroy();
                })
            } else {
                return Promise.reject();
            }
        })
        .then(() => {
            res.status(204).send();
        }, () => {
            res.status(404).send();
        })
});

app.post('/api/artists', function(req, res) {
    Artist.create({
        name: req.body.name
    }).then(artist => {
        res.json(artist);
    }, errs => {
        res.status(422).json({
            errs: errs.errors.map(err => {
                return {
                    attribute: err.path,
                    msg: err.message
                }
            })
        });
    })
});

app.get('/api/playlists', function(req, res) {
    let filter = {};
    let { q } = req.query;

    if (q) {
        filter = {
            where: {
                name: {
                    [Op.like] : `${q}%`
                }
            }
        }
    }

    Playlist.findAll(filter).then(playlists => {
        res.json(playlists);
    });
});

app.get('/api/playlists/:id', function(req, res) {
    let { id } = req.params;
    console.log('id', id);
    
    Playlist.findByPk(id, {
        include: [Track]
    }).then(playlist => {
        if (playlist) {
            res.json(playlist);
        } else {
            res.status(404).send();
        }
    });
});

app.get('/api/artists/:id', function(req, res) {
    let { id } = req.params;
    console.log('id', id);
    
    Artist.findByPk(id, {
        include: [Album]
    }).then(artist => {
        if (artist) {
            res.json(artist);
        } else {
            res.status(404).send();
        }
    });
});

app.get('/api/albums/:id', function(req, res) {
    let { id } = req.params;
    console.log('id', id);
    
    Album.findByPk(id, {
        include: [Artist]
    }).then(album => {
        if (album) {
            res.json(album);
        } else {
            res.status(404).send();
        }
    });
});

app.get('/api/tracks/:id', function(req, res) {
    let { id } = req.params;
    console.log('id', id);
    
    Track.findByPk(id, {
        include: [Playlist]
    }).then(track => {
        if (track) {
            res.json(track);
        } else {
            res.status(404).send();
        }
    });
});




app.listen(8000);
