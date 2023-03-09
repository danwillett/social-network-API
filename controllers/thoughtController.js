const {Thought, User} = require('../models')

module.exports = {
    // GET route: /api/thoughts
    // get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    },
    // GET route: /api/thoughts/:_id
    // get a single thought
    getThoughtById(req, res) {
        Thought.findOne({_id: req.params.id})
            .then((thought) => {
                !thought
                    ? res.status(404).json({message: 'No thought with this id'})
                    : res.status.json(thought);
            })
            .catch((err) => {
                console.log(err)
                res.json(err)
            })
    },
    // POST route: /api/thoughts
    // {
    //     "thoughtText": "Here's a cool thought...",
    //     "username": "lernantino",
    //     "userId": "5edff358a0fcb779aa7b118b"
    //   }
    // user creates a new thought
    createThought(req, res) {
        Thought.create({thoughtText: req.body.thoughtText, username: req.body.username})
            .then((thought) => {
                User.findOneAndUpdate(
                    {_id: thought.userId},
                    {$push: {thoughts: thought._id}},
                    {new: true}
                    )
            })
            .then((user) => {
                !user
                    ? res.status(404).json({message: "created new thought, but could not be added to user profile"})
                    : res.json({message: "created new thought"})
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    },
    // POST route: /api/thoughts/:thoughtId/reactions
    // create a reaction stored in a single thought's reaction array field
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$push: {reactions: req.body}},
            {new: true}
        )
        .then((thought) => {
            !thought
                ? res.status(404).json({message: "No thought with this id"})
                : res.json(thought)
        })
        .catch((err) => {
            console.log(err)
            res.json(err)
        })
    },
    // DELETE route: /api/thoughts/:thoughtId/reactions/:reactionId
    // removes a reaction from a thought
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$pull: {reactions: reactionId}},
            {new: true}
        )
        .then((thought) => {
            !thought
                ? res.status(404).json({message: "no thought with this id"})
                : res.json(thought)
        })
        .catch((err) => {
            console.log(err)
            res.json(err)
        })
    }

}