// require mongoose to set up the Schema and model
const { Schema, model } = require('mongoose');

// set up Schema that applies to User model
const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            // use regex to validate email address
            match: [/^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/]
        },
        // thoughts are referenced from the Thought model
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
        // friends are self-referencing the User model
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
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

// use virtual to get user's amount of friends on query
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length
});

// define User model using the established schema
const User = model('User', UserSchema);

// export data for use elsewhere
module.exports = User;
