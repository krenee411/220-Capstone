const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const accountSchema = new Schema({
    username: {
        type: String,
        maxlength: 25,
        unique: true,
        required: true,
        validate: {
            validator: function(v) {
                return !/^(?=.*[\s\s+<>.()^+='/|$@#!%*?&])/.test(v);
            },
            message: 'Usernames may include letters, numbers, underscores and dashes. Must not be longer than 25 characters.'
        }
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        validate: {
            validator: function(v) {
                return /(?:[\u00A0-\uD7FF\uE000-\uFFFF-a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[\u00A0-\uD7FF\uE000-\uFFFF-a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[\u00A0-\uD7FF\uE000-\uFFFF-a-z0-9](?:[\u00A0-\uD7FF\uE000-\uFFFF-a-z0-9-]*[\u00A0-\uD7FF\uE000-\uFFFF-a-z0-9])?\.)+[\u00A0-\uD7FF\uE000-\uFFFF-a-z0-9](?:[\u00A0-\uD7FF\uE000-\uFFFF-a-z0-9-]*[\u00A0-\uD7FF\uE000-\uFFFF-a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(v);
            },
            message: "Please enter a valid email."
        }
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 16,
        required: true,
        validate: {
            validator: function (v) {
              return /^(?=.*[\u00A0-\uD7FF\uE000-\uFFFF-a-z])(?=.*[\u00A0-\uD7FF\uE000-\uFFFF-A-Z])(?=.*[\u00A0-\uD7FF\uE000-\uFFFF-\d])(?=.*[\u00A0-\uD7FF\uE000-\uFFFF-$@#!%*?&])[\u00A0-\uD7FF\uE000-\uFFFF-a-z\u00A0-\uD7FF\uE000-\uFFFF-A-Z\u00A0-\uD7FF\uE000-\uFFFF-\d\u00A0-\uD7FF\uE000-\uFFFF-$@$!%*?&]/.test(v);
            },
            message: 'Passwords require uppercase, lowercase, number and special character. Must be between 8 and 16 characters long.'
          }
    },
    profimg: {
        type: String,
        default: 'https://p.kindpng.com/picc/s/24-248253_user-profile-default-image-png-clipart-png-download.png'
    },
    joined: {
        type: Date,
        default: Date.now
    }
})

accountSchema.pre('save', function(next) {
    const account = this;
    bcrypt.hash(account.password, 8, (err, hash) => {
        if (err) {
            return next(err);
        }
        account.password = hash;
        next();
    })
})

accountSchema.methods.checkPassword = function(attempt, callback) {
    bcrypt.compare(attempt, this.password, (err, isMatch) => {
        if (err) {
            return callback(err);
        }
        return callback(null, isMatch);
    })
}

accountSchema.methods.withoutPassword = function() {
    const account = this.toObject();
    delete account.password;
    return account;
}

module.exports = mongoose.model('Account', accountSchema);