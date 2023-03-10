const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true, //makes sure it's a unique username in the database
      trim: true, //removes excess spaces
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email']
    },
    // when generating a new thought, we insert a User id which allows us to create this link
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
    friends: [
        {
          type: Schema.Types.ObjectId,
          ref: "user",
        },
      ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema
  .virtual('friendCount').get(() => {
    if (!this.friends == '')
    return this.friends.length;
    else 
    return 0
  })

const User = model('user', userSchema);

module.exports = User;