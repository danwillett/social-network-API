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
      validate: {
        validator: "validateEmail",
        message: "Email address is invalid",
      },
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
    return this.friends.length;
  })

const User = model('user', userSchema);

module.exports = User;