var express = require('express');
var Game = require('../models/game');
var Friendlist = require('../models/friendlist');
var reCAPTCHA = require('recaptcha2');
var secretkey = require('../secretkey.js');

var router = express.Router();

recaptcha = new reCAPTCHA({
    siteKey: '6LdN3hwTAAAAAGV-iygBG_RA1XpSQ0AWsdjE0wEO',
    secretKey: secretkey
});


router.get('/games', function(req, res) {
    Game.find({}, function(err, games) {
        if (err) {
            return res.status(500).json({
                message: err.message
            });
        }
        res.json({
            games: games
        });
    });
});

router.get('/games/:id', function(req, res) {
    if (req.params.id) {
        Game.find({
            id: req.params.id
        }, function(err, docs) {
            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }
            res.json({
                game: docs
            });
        });
    }
});

router.get('/friendlist', function(req, res) {
    Friendlist.find({}, function(err, docs) {
        if (err) {
            return res.status(500).json({
                message: err.message
            });
        }
        res.json(docs);
    });
});

router.get('/friendlist/:id', function(req, res) {
    if (req.params.id) {
        Friendlist.find({
            game_id: req.params.id
        }, function(err, docs) {
            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            } else
                res.json({
                    friendlist: docs
                });
        });
    }
});


router.post('/games', function(req, res) {
    var game = req.body;
    Game.create(game, function(err, game) {
        if (err) {
            return res.status(500).json({
                err: err.message
            });
        }
        res.json({
            id: game.id,
            name: game.name,
            developer: game.developer
        });
    });
});

router.post('/friendlist', function(req, res) {
    var user = req.body;

    function submitForm(req, res) {
        recaptcha.validateRequest(req)
            .then(function() {
                // validated and secure
                Friendlist.create(user, function(err, user) {
                    if (err) {
                        return res.status(500).json({
                            err: err.message
                        });
                    }
                    res.status(200).json({
                        game_id: user.game_id,
                        username: user.username,
                        message: user.message
                    });
                    console.log('successfully added to list');
                });
            }).catch(function(errorCodes) {
                // invalid
                console.log(recaptcha.translateErrors(errorCodes));
                res.status(400).json({
                    formSubmit: false,
                    errors: recaptcha.translateErrors(errorCodes)
                }); // translate error codes to human readable text
            });
    }
    submitForm(req, res);
});




module.exports = router;
