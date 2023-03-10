const { Schema, Types, model } = require("mongoose");

// reactionSchema formats the "reactions" subdocument in the thoughtSchema a
const reactionSchema = new Schema({
    reactionId: {
      type: Schema.Types.ObjectId,
      default: new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: function () {
        return this.createdAt.toUTCString();
      },
    },
  });

// thoughtSchema is used to format the "Thought" model
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
      get: function () {
        return this.createdAt.toUTCString();
      },
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function() {
  console.log(this.reactions)
  if (!this.reactions == '') {
    return this.reactions.length;
  } else {
    return 0
  }
  
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
