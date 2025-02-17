const { Schema, model } = require('mongoose');
const healthSchema = require('./Health');
const { v4: uuidv4 } = require('uuid');

// TO CONSIDER: Change age to birthday then add a virtual to convert to age when needed
// NOTE: picLink may not work yet, need testing

const petSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      default: "Unnamed"
    },
    username: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      default: () => uuidv4()  // Generate a new UUID for each document
    },
    pic: {
      type: String,
      default: ''
    },
    bio: {
      type: String,
      default: ''
    },
    species: {
      type: String,
      required: true,
      trim: true,
      uppercase: true
    },
    breed: {
      type: String,
    },
    age: {
      type: Number,
    },  
    adoptionDate: {
      type: Date,
    },
    likes: {
      type: String,
    },
    dislikes: {
      type: String
    },
    health: healthSchema,
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'Owner'
    },
    events: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Event',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Pet'
      }
    ],
  }
);

const Pet = model('Pet', petSchema);

module.exports = Pet;
