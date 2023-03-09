const { User, Thought } = require("../models");

module.exports = {
    // GET route: /api/users
  // get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // GET route: /api/users/:userId
  // get a single user by id, and fully populate thoughts and friends fields
  getUserById(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate(["thoughts", "friends"])
      .then((user) => {
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // POST route: /api/users
  // create a new user with request body input in following format:
  // {
  //     "username": "lernantino",
  //     "email": "lernantino@gmail.com"
  // }
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json({ message: "Success! Created new User:" }, user))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // PUT route: /api/users/:userId
  // update a user by request body params
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body }, //set method will only update or create params specified within req.body
      { runValidators: true, new: true }
    )
      .then((user) => {
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // DELETE route: /api/users/:userId
  // deletes and user and their thoughts by id
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user with that ID" });
        }
        Thought.deleteMany({ _id: { $in: user.thoughts } }) // $in selects id values specified in user.thoughts array
          .then(() =>
            res.json({
              message: `User ${req.params.id} deleted along with their thoughts`,
            })
          )
          .catch((err) => {
            console.log(err);
            res.json(err);
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // POST route: /api/users/:userId/friends/:friendId
  // adds a new friend to user's friend list
  addFriend(req, res) {
    // confirms friend has a profile
    User.findOne({ _id: req.params.friendId })
      .then((user) => {
        if (!user) {
          res
            .status(404)
            .json({ message: "Could not find a friend user with that ID" });
        } else {
          // adds new friend to user's profile
          User.findOneAndUpdate(
            { _id: req.params.userId },
            { $push: { friends: req.params.friendId } },
            { new: true } // returns updated document after update has applied
          )
            .then((user) => {
              !user
                ? res.status(404).json({ message: "No user with that ID" })
                : res.json({ message: "Added new friend", user });
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // DELETE route: /api/users/:userId/friends/:friendId
  // removes a friend from user's friend list
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) => {
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json({ message: "Removed friend", user });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};
