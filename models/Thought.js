const {Schema, model} = require('mongoose');
const Reaction = require('.Reaction')

const thoughtSchema = new Schema(
    {
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
       type: Date,
       default: Date.now,
       get: function() {
        return this.createdAt.toUTCString()
       },
    },
    username: {
        type: String,
        required: true
    },
    reactions: [Reaction]
})

thoughtSchema
    .virtual('reactionCount').get( () => {
        return length(this.reactions)
    })

const Thought = model('thought', thoughtSchema);

module.exports = Thought;