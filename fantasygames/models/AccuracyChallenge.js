const mongoose = require('mongoose');

const schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
};

const accuracyChallengeSchema = new mongoose.Schema({
  season: Number,
  week: Number,
  openDate: Date,
  closeDate: Date,
  questions: [{ player1: String, player2: String, winner: String }],
  tieBreaker: { question: String, value: Number },
}, schemaOptions);

const AccuracyChallenge = mongoose.model('AccuracyChallenge', accuracyChallengeSchema);

module.exports = AccuracyChallenge;
