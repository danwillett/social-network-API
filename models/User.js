const {Schema, model} = require('mongoose')


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
                validator: 'validateEmail',
                message: 'Email address is invalid'
            }
        },
        // thoughts: {
        //     type: 
        // },
        // friends: {

        // }
    }
)
