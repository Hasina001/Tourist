const {Schema, model} = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {

        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}) 

//hash password before saving to database
userSchema.pre('save', async function (next) {
    const user = this;
    
    if (!user.isModified('password')) return next();

    try {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

//compare password when user tries to login
userSchema.methods.comparePassword = function (givenPassword) {
    return bcrypt.compare(givenPassword, this.password)
}

const User = model('User', userSchema)
module.exports = User;

