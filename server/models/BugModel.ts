const mongoose = require('mongoose');


const bugSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  severity: {
    type: String,
    required: true,
  },
  patched: {
    type: Boolean,
    required: true,
  },
  vulnerableTech: {
    type: [String],
    default: [],
  },
  comments: {
    type: [String],
    default: [],
  },
});

// Create the Mongoose model
const BugModel = mongoose.model('Bug', bugSchema);

module.exports = BugModel;