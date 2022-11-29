// require mongoose to set up the Schema and model, as well as built-in moment for createdAt
const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

// set up Reaction schema
// must be initialized before ThoughtSchema
const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // getter method (moment) to format timestamp on query
            get: (createdAtVal) => moment(createdAtVal).format('MM DD, YYYY [at] hh:mm')
        }
    }
);

// set up Thought schema
const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            // thought must be between 1 and 280 characters
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // getter method (moment) to format timestamp on query
            get: (createdAtVal) => moment(createdAtVal).format('MM DD, YYYY [at] hh:mm')
        },
        username: {
            type: String,
            required: true
        },
        // ReactionSchema, found further down, used to validate reaction data; reactions do not get their own model
        reactions: [ReactionSchema]
    },
    {
        // allow use of virtuals and getters
        toJSON: {
            virtuals: true,
            getters: true
        },
        // prevent virtuals from creating duplicate id's
        id: false
    }
);

// use virtual to get thought's amount of reactions on query
ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
});

// create Thought model using established ThoughtSchema
const Thought = model('Thought', ThoughtSchema);

// export Thought model for use elsewhere
module.exports = Thought;
