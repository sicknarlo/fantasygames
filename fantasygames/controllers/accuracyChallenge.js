const AccuracyChallenge = require('../models/AccuracyChallenge');

/**
  * GET /accuracyChallenge
  */
exports.accuracyChallengeIndex = (req, res) => {
  console.log('meh');
  AccuracyChallenge.findById(req.id, (err, ac) => {
    if (err) return res.status(500).send({ msg: err });
    return res.status(200).send('accuracyChallenge', {
      title: 'Accuracy Challenge',
      result: ac,
    });
  });
};
/**
  * GET /accuracyChallenge/:id
  */
exports.accuracyChallengeGet = (req, res) => {
  console.log(req.params.id);
  if (!req.params.id) {
    return res.status(400).send({ msg: 'ID required'});
  }
  AccuracyChallenge.findById(req.params.id, (err, ac) => {
    if (err) return res.status(500).send({ msg: err });
    return res.status(200).json(ac);
  });
};

/**
 * POST /accuracyChallenge
 */
exports.accuracyChallengePost = (req, res) => {
  console.log(req.body);
  req.assert('season', 'Must have a season').notEmpty();
  req.assert('week', 'Must have a week').notEmpty();
  req.assert('openDate', 'Must have a openDate').notEmpty();
  req.assert('closeDate', 'Must have a closeDate').notEmpty();
  req.assert('questions', 'Must have questions').notEmpty();
  req.assert('tieBreaker', 'Must have a tieBreaker').notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }

  AccuracyChallenge.findOne({ season: req.body.season, week: req.body.week }, (err, ac) => {
    if (ac) {
      return res.status(400).send({ msg: 'There is already a challenge for that week.' });
    }
    ac = new AccuracyChallenge({
      season: req.body.season,
      week: req.body.week,
      openDate: req.body.openDate,
      closeDate: req.body.closeDate,
      questions: req.body.questions,
      tieBreaker: req.body.tieBreaker,
    });
    return ac.save((error) => {
      if (error) return res.status(500).send({ msg: error });
      return res.json(ac);
    });
  });
};

/**
 * PUT /accuracyChallenge
 * Update Accuracy Challenge.
 */
exports.accuracyChallengePut = (req, res) => {
  AccuracyChallenge.findById(req.accuracyChallenge.id, (err, ac) => {
    ac.season = req.body.season;
    ac.week = req.body.week;
    ac.openDate = req.body.openDate;
    ac.closeDate = req.body.closeDate;
    ac.questions = req.body.questions;
    ac.tieBreaker = req.body.tieBreaker;
    return ac.save(() => {
      res.send({ accuracyChallenge: ac, msg: 'Accuracy Challenge has been updated.' });
    });
  });
};

/**
 * DELETE /accuracyChallenge
 */
exports.accuracyChallengeDelete = (req, res) => {
  AccuracyChallenge.remove({ _id: req.ac.id }, () => {
    res.send({ msg: 'This accuracyChallenge has been permanently deleted.' });
  });
};
